// backend enviorment variables
// .env is where you store your secrets/values
// config.js is where you PROCESS those values and provide a clean interface to use them

// this code: when you want to allow origins next in your project
// you should use something like this
const allowedOrigins = [
  "http://localhost:5173",
  "https://your-production-site.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// or something like this:
// config.js or similar
const FRONTEND_URL =
  process.env.NODE_ENV === "production"
    ? "https://your-production-site.com"
    : "http://localhost:5173";

// app.js
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);
