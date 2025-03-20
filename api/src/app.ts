// @ts-ignore
const express = require("express");
const path = require("path");
const cors = require("cors");
// const productsRoutes = require("./routes/products");
const materialsRoutes = require("./routes/materials");
// const sizesRoutes = require("./routes/sizes");
// const projectsRoutes = require("./routes/projects");
const resendRouter = require("./routes/resend");
// @ts-ignore
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("src/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use(
//   cors({
//     origin: [
//       "https://mrc-two.vercel.app",
//       "http://localhost:3000",
//       "https://mrc-staging.vercel.app",
//     ],
//     methods: ["GET", "POST", "OPTIONS"],
//     allowedHeaders: ["Content-Type"],
//     credentials: true,
//   })
// );
const corsOptions = {
  origin: [
    "https://mrc-staging.vercel.app", // Allow this domain
    "http://localhost:3000", // Local dev environment
    "https://mrc-two.vercel.app", // Your API domain
    "https://stonesuppliers.net",
  ],
  methods: ["GET", "POST", "OPTIONS"], // Allowed methods
  allowedHeaders: ["Content-Type"], // Allowed headers
  credentials: true, // Allow credentials
};

// Use CORS middleware
app.use(cors(corsOptions));

// Preflight (OPTIONS) request handling
app.options("*", cors(corsOptions));

// @ts-ignore
const allowCors = (fn) => async (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://mrc-staging.vercel.app"
  ); // Specific origin
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, OPTIONS, PATCH, DELETE, POST, PUT"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end(); // Handle preflight OPTIONS requests
    return;
  }

  return await fn(req, res); // Proceed to the actual API handler
};
app.use("/api/resend", resendRouter);
// app.use("/api/products", productsRoutes);
app.use("/api/materials", allowCors(materialsRoutes));
// app.use("/api/sizes", sizesRoutes);
// app.use("/api/projects", projectsRoutes);

// @ts-ignore
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://mrc-staging.vercel.app");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use((req: any, res: any, next: any) => {
  console.log(`Received request: ${req.method} ${req.url}`);
  next();
});
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err);
  res.status(err.status || 500).send(err.message || "Internal Server Error");
});

app.get("/api/health", (req: any, res: any) => {
  res.status(200).send("OK");
});

module.exports = app;
