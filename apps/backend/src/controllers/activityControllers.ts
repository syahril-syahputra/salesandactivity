import { Request, Response } from "express";
import { connectMongo } from "../libs/mongo";
import { ActivityLog } from "../models/ActivityLog";

export const getActivityLogs = async (req: Request, res: Response) => {
    try {
        await connectMongo();

        const {
            page = "1",
            paginate = "10",
            sort_by = "createdAt",
            sort_type = "desc",
            userId,
            action,
        } = req.query;

        const pageNum = parseInt(page as string);
        const limit = parseInt(paginate as string);
        const offset = (pageNum - 1) * limit;

        const query: any = {};
        if (userId) query.userId = userId;
        if (action)
            query.action = { $regex: new RegExp(action as string, "i") };
        const sort: any = {};
        if (sort_by) {
            sort[sort_by as string] = sort_type === "asc" ? 1 : -1;
        }

        const total = await ActivityLog.countDocuments(query);
        const logs = await ActivityLog.find(query)
            .sort(sort)
            .skip(offset)
            .limit(limit);

        res.json({
            meta: {
                page: pageNum,
                paginate: limit,
                total_data: total,
                total_page: Math.ceil(total / limit),
            },
            data: logs,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch activity logs" });
    }
};
