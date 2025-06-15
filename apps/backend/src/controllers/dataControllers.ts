import { prisma } from "../libs/prisma";
import { connectMongo } from "../libs/mongo";
import { ActivityLog } from "../models/ActivityLog";
import { Request, Response } from "express";

export const getData = async (_: Request, res: Response) => {
    try {
        await connectMongo();

        const totalSales = await prisma.sale.aggregate({
            _sum: { amount: true },
        });

        const totalLogs = await ActivityLog.countDocuments();

        const mostActiveUser = await ActivityLog.aggregate([
            { $group: { _id: "$userId", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 1 },
        ]);

        res.json({
            totalSales: totalSales._sum.amount || 0,
            totalActivityLogs: totalLogs,
            mostActiveUser: mostActiveUser[0]?._id || null,
            activityCount: mostActiveUser[0]?.count || 0,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch data" });
    }
};
