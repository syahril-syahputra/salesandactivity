import express from "express";
import { getData } from "../controllers/dataControllers";

const dataRouter = express.Router();

dataRouter.get("/data", getData);

export default dataRouter;
