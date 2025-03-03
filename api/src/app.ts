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

app.use(
  cors({
    origin: ["https://mrc-two.vercel.app", "http://localhost:3000"],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  })
);
app.use("/api/resend", resendRouter);
// app.use("/api/products", productsRoutes);
app.use("/api/materials", materialsRoutes);
// app.use("/api/sizes", sizesRoutes);
// app.use("/api/projects", projectsRoutes);

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
