import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";
import itemRoute from "./routes/itemRoute.js";
import {connectDB} from "./config/db.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: ["http://dish-delight-web.vercel.app", "http://localhost:3000"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/fooditems", itemRoute);

const port = process.env.PORT;

connectDB();

(async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
})();