import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import dataRouter from "./routers/dataRouter";
import saleRouter from "./routers/saleRouter";
import activityROute from "./routers/activityRoute";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.send("Hello from TypeScript + Express!");
});

app.use("/api", dataRouter);
app.use("/api", saleRouter);
app.use("/api", activityROute);
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
