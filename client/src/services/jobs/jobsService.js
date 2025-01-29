const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// service names:
// HTTP verb based: getJobs, postJob, deleteJob
// Operation based: fetchJobs, createJob, removeJob (db operations)
// usually go for operation, as this is what you want to do
export const jobService = {
  async addJobToDb(jobData) {
    console.log(jobData);
    try {
      const response = await fetch(`${API_URL}/app/jobs`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        // to inclue cookies in the request
        credentials: "include",
        /*!!!! JSON IS A STRING !!!!! */
        // we set an object in body
        // json.stringify make it a json - you send the data as string, not object
        // express.json() takes the string and parse it to  an object
        // assigns that cmoplete object to req.body
        // meaning: body will be the actual data of the object, we are not setting object inside body
        // we take the data, and put it directly in body
        // the idea is: we take this object, and it is the value of the poperty body
        body: JSON.stringify(jobData),
      });

      const data = await response.json();
      console.log("Server response:", data);

      if (!response.ok) {
        throw new Error(data.error || "משהו השתבש בתהליך הוספת משרה");
      }
      return data;
    } catch (error) {
      // 2 types of error - 1 is server response error, and the !response.ok will handle it
      // 2: is the netowrk is down, server is unreachvble, might not be an error object!
      throw error;
    }
  },

  async fetchAllJobs() {
    try {
      const response = await fetch(`${API_URL}/app/jobs`, {
        method: "GET",
        // headres: the server response with this content type
        //if you type it, you will receive json, and display it as text
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
      });

      const data = await response.json();

      // response.ok not throwing error
      // meaning we won't throw error if we get a "Bad request"
      if (!response.ok) {
        throw new Error(data.error || "משהו השתבש בטעינת כל העבודות");
      }

      return data;
    } catch (error) {
      throw error;
    }
  },

  async deleteJob(jobId) {
    try {
      const response = await fetch(`${API_URL}/app/jobs/${jobId}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "שגיאה במחיקת משרה");
      }
      return data;
      // i need the job id
    } catch (error) {
      throw error;
    }
  },

  async editJob(jobId, fieldsToEdit) {
    try {
      const response = await fetch(`${API_URL}/app/jobs/${jobId}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        // the body will be that object
        // than we extract it
        body: JSON.stringify(fieldsToEdit),
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "שגיאה בעדכון משרה"); // Changed error message
      }
      return data;
    } catch (error) {
      throw error;
    }
  },
};

/*
question to ask to claude:
next project will be very short, about a week, and we will focus on:
project flow:

Desin to dev:
wireframe one simple feature -> look mobin -> design on figma

dev:
- adding auth with oath and the passport.js
- start with front and what you learned in react
- create the server for it
- use the stuff you learned from the odin project articles

*/
// what happen if we type:
// ourappdomain/app/jobs in the url? well, its supposed to make a get request
// to here, meaning it should get all jobs
// but what happen if i go to some url in the web
// it make a get request
// but what if that url is not responsible for delivering html
// but for delivering data from db like in our case
// what is acutally happening?
