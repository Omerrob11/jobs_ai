const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// or whatever your backend URL is

export const authService = {
  // userData : email , password, and username
  async signup(userData) {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "משהו השתבש בתהליך ההרשמה");
      }
      return data;
    } catch (error) {
      throw error;
    }
  },

  // server flow:
  // sserver sends raw bytes, response.body is a redable strream
  // response.json() - reads the bytes from the stream, interepet the byts as json text
  // parse json text into js object
  async login(userData) {
    try {
      // geting the response object
      // here, we get a response object, with a response.body which is a redable stream
      // the body is the object we sent from the backend
      // response body is redable stream - raw data, stream of bytes
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // No colon, and typically "Type" is capitalized
        },
        body: JSON.stringify(userData),
        // we need the credentials - each route that sets or require coockis
        // meaning, routes that need checks for cookies (that user loged in, private data)
        // needs it
        credentials: "include", // PLEASE send my id (cookies) with this request
      });

      // reads and parses the response body, which is in json format
      // reading takes time, also parsing files
      // the data object - will be exactly what you send from the controller
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "שגיאה בתהליך ההרשמה");
      }

      return data;
    } catch (error) {
      throw error;
    }
  },
};

// test user:
// omer
// omer123
