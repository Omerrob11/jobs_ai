const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const jobService = {
  async addJobToDb(jobData) {
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
};

/*
question to ask to claude:
why do we need to use env variable for the api url? why we need to hide it?

how can we make the jobService without objects? what other oppritunities to design it we have? maybe just exports indivudual functions? what else?


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
