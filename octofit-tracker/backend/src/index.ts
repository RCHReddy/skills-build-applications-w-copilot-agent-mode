import express from "express";
import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI ?? "mongodb://127.0.0.1:27017/octofit";
const PORT = Number(process.env.PORT ?? 8000);

const app = express();
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ status: "OctoFit Tracker backend is running", port: PORT });
});

mongoose.set("strictQuery", true);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log(`Connected to MongoDB at ${MONGO_URI}`);
    app.listen(PORT, () => {
      console.log(`Backend server listening on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  });
