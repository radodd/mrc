// @ts-ignore
const express = require("express");
const path = require("path");
const cors = require("cors");
const productsRoutes = require("./routes/products");
const projectsRoutes = require("./routes/projects");
const resendRouter = require("./routes/resend");
// @ts-ignore
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("src/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// const allowedOrigins = process.env.CORS_ALLOWED_ORIGINS
//   ? process.env.CORS_ALLOWED_ORIGINS.split(",")
//   : [
//       "http://localhost:3000",
//       "http://localhost:3001",
//       "https://mrc-two.vercel.app",
//     ];

// const corsOptions = {
//   //@ts-ignore
//   origin: function (origin, callback) {
//     console.log("Received CORS request from:", origin);
//     if (!origin) return callback(null, true);

//     const isOriginAllowed = allowedOrigins.includes(origin);

//     if (isOriginAllowed) {
//       callback(null, true);
//     } else {
//       console.log(`Origin ${origin} is not allowed by CORS.`);
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true, // Allow cookies and credentials in requests
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Include OPTIONS for preflight requests
//   allowedHeaders: ["Content-Type", "Authorization"], // Include allowed headers
//   optionsSuccessStatus: 200, // Some legacy browsers (IE11) choke on 204 status
// };

// app.options("*", cors(corsOptions), (res: any) => {
//   res.sendStatus(200);
// });

// app.use(cors(corsOptions));
app.use(
  cors({
    origin: ["https://mrc-two.vercel.app"], // Allow specific frontend URL
    methods: ["GET", "POST", "OPTIONS"], // Allow required methods
    allowedHeaders: ["Content-Type"], // Allow necessary headers
    credentials: true, // Enable credentials if needed
  })
);
app.use("/api/resend", resendRouter);
app.use("/api/products", productsRoutes);
app.use("/api/projects", projectsRoutes);

app.use((req: any, res: any, next: any) => {
  console.log(`Request received at: ${req.url}`);
  next();
});
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err); // Log the error details
  res.status(err.status || 500).send(err.message || "Internal Server Error");
});

app.get("/api/health", (req: any, res: any) => {
  res.status(200).send("OK");
});

module.exports = app;
