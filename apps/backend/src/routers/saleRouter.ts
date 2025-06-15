import express from "express";
import { getSaleData } from "../controllers/saleController";

const saleRouter = express.Router();

saleRouter.get("/sale", getSaleData);

export default saleRouter;
