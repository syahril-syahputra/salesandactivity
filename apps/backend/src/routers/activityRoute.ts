import express from "express";
import { getActivityLogs } from "../controllers/activityControllers";

const activityROute = express.Router();

activityROute.get("/activity", getActivityLogs);

export default activityROute;
