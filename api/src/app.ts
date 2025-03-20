// @ts-ignore
const express = require("express");
const path = require("path");
const cors = require("cors");
const materialsRoutes = require("./routes/materials");
const resendRouter = require("./routes/resend");
// @ts-ignore
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("src/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const allowedOrigins = [
  "https://mrc-staging.vercel.app",
  "http://localhost:3000",
  "https://mrc-two.vercel.app",
  "https://www.stonesuppliers.net",
];
const corsOptions = {
  //@ts-ignore
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
  credentials: true,
};

app.use(cors(corsOptions));

app.use("/api/resend", resendRouter);
app.use("/api/materials", materialsRoutes);

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
