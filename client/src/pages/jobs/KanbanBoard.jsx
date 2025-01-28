import React, { useState } from "react";

import KanbanHeader from "../../components/jobs/Header";
import JobCard from "../../components/jobs/JobCard";
import AddJobForm from "../../components/jobs/JobModal";
import { jobService } from "../../services/jobs/jobsService";

// did not found any token
// we need to login first
// than we need to connect it so we acutally send the token
// so make sure you send the token in your reqest some how
// because we didnt send it!
const KanbanBoard = () => {
  const [isAddingJob, setIsAddingJob] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState("");

  const columns = ["הצעה", "ראיונות", "עבודות שנשמרו", "הוגשו"];

  const handleAddJob = async (jobData) => {
    try {
      const response = await jobService.addJobToDb(jobData);
      // If successful, add to jobs state

      setJobs((prevJobs) => [...prevJobs, response.data.job]);
      setIsAddingJob(false);
      setError("");
    } catch (error) {
      setError(error.message || "אירעה שגיאה בהוספת המשרה");
    }
  };

  // Get jobs for a specific column
  const getColumnJobs = (column) => {
    return jobs.filter((job) => job.status === column);
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
                {getColumnJobs(column).map((job) => (
                  <JobCard
                    key={job.id}
                    title={job.position}
                    company={job.company_name}
                    daysAgo={3} // You might want to calculate this from job.created_at
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
    </div>
  );
};

export default KanbanBoard;
