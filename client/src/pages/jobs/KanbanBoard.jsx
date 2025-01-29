import React, { useState, useEffect } from "react";

import KanbanHeader from "../../components/jobs/Header";
import JobCard from "../../components/jobs/JobCard";
import AddJobForm from "../../components/jobs/JobModal";
import { jobService } from "../../services/jobs/jobsService";
import EditJobForm from "../../components/jobs/EditModal";

// on page load, fetch all jobs from db
const KanbanBoard = () => {
  const [isAddingJob, setIsAddingJob] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState("");
  const [editingJob, setEditingJob] = useState(null);

  const columns = ["הצעה", "ראיונות", "עבודות שנשמרו", "הוגשו", "דחייה"];
  const columnsToEnglish = {
    הצעה: "offer",
    ראיונות: "interviewing",
    "עבודות שנשמרו": "wishlist",
    הוגשו: "applied",
    דחייה: "rejected",
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await jobService.fetchAllJobs();
        console.log("Initial jobs from server:", response.data); // Let's see exactly what we get
        setJobs(response.data.jobs);
      } catch (error) {
        setError(error.message || "Error loading jobs");
      }
    };

    fetchJobs();
  }, []);

  const handleAddJob = async (jobData) => {
    try {
      const response = await jobService.addJobToDb(jobData);
      // If successful, add to jobs state
      console.log("New job response:", response); // Let's see what we get back when adding

      setJobs((prevJobs) => [...prevJobs, response.job]);

      setIsAddingJob(false);
      setError("");
    } catch (error) {
      setIsAddingJob(false);
      setError(error.message || "אירעה שגיאה בהוספת המשרה");
    }
  };

  // Get jobs for a specific column
  const getColumnJobs = (column) => {
    const filteredJobs = jobs.filter(
      (job) => job.status === columnsToEnglish[column]
    );
    return filteredJobs;
    // return jobs.filter((job) => job.status === columnsToEnglish[column]);
  };

  const handleDeleteJob = async (jobId) => {
    if (!jobId) {
      console.log(jobId);
      setError("לא ניתן למחוק משרה זו - אין מזהה משרה");
      return;
    }
    try {
      const response = await jobService.deleteJob(jobId);
      // remove it from the front end as well if we deleted
      setJobs(jobs.filter((job) => job.id !== jobId));

      //deleted job from the db
      console.log(response);
    } catch (error) {
      setError(error.message || "אירעה שגיאה במחיקת המשרה");
    }
  };
  const handleEditJob = async (updatedJobData) => {
    try {
      console.log("Sending update:", updatedJobData);
      const response = await jobService.editJob(editingJob.id, updatedJobData);
      console.log("Received response:", response);

      // Only update if we have valid data
      if (response?.data?.job) {
        setJobs(
          jobs.map((job) =>
            job.id === editingJob.id ? response.data.job : job
          )
        );
        setEditingJob(null);
      } else {
        throw new Error("Invalid response data");
      }
    } catch (error) {
      console.error("Edit job error:", error);
      setError(error.message || "שגיאה בעדכון המשרה");
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <KanbanHeader onAddJob={() => setIsAddingJob(true)} />

      {/* Error Display */}
      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
          role="alert"
          dir="rtl"
        >
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {/* Kanban Board Layout */}
      <div className="flex gap-4 overflow-x-auto pb-4" dir="rtl">
        {columns.map((column) => (
          <div key={column} className="flex-none w-80">
            <div className="p-4 bg-blue-50 rounded-lg shadow">
              <h2 className="font-semibold text-lg text-gray-700 mb-4">
                {column}
              </h2>
              <div className="text-sm text-gray-500 mb-4">
                {getColumnJobs(column).length} משרות
              </div>

              {/* Job Cards */}
              <div className="space-y-3">
                {getColumnJobs(column).map((job, index) => (
                  <JobCard
                    // i think keys should be from db, so its good

                    key={job.id || `temp-${index}`} // Fallback to index if no id
                    id={job.id}
                    title={job.position}
                    company={job.companyName}
                    daysAgo={3} // You might want to calculate this from job.created_at
                    // creating a function that will only execute when called
                    // we just pass a function
                    // onDelete={function() { handleDeleteJob(job.id) }}
                    // we needto pass a function reference, not to execute
                    onDelete={() => handleDeleteJob(job.id)} // Only try to delete if we have an id
                    onEdit={() => setEditingJob(job)}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Job Form Modal */}
      {isAddingJob && (
        <AddJobForm
          onSubmit={handleAddJob}
          onClose={() => {
            setIsAddingJob(false);
            setError(""); // Clear any errors when closing
          }}
        />
      )}

      {/* some bugs here
needs fix */}
      {editingJob && (
        <EditJobForm
          job={editingJob}
          onSubmit={handleEditJob}
          onClose={() => setEditingJob(null)}
        />
      )}
    </div>
  );
};

export default KanbanBoard;
