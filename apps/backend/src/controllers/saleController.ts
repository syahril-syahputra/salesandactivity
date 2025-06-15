import { Request, Response } from "express";
import { prisma } from "../libs/prisma";

export const getSaleData = async (req: Request, res: Response) => {
    try {
        const {
            page = "1",
            paginate = "10",
            sort_by = "id",
            sort_type = "desc",
            productName,
        } = req.query;

        const pageNum = parseInt(page as string);
        const limit = parseInt(paginate as string);
        const offset = (pageNum - 1) * limit;

        const where: any = {};
        const sort: any = {};
        if (productName)
            where.productName = { contains: productName as string };
        if (sort_by) {
            sort[sort_by as string] = sort_type === "asc" ? "asc" : "desc";
        }

        const sales = await prisma.sale.findMany({
            skip: offset,
            take: limit,
            where: Object.keys(where).length ? where : undefined,
            orderBy: sort,
        });

        const totalData = await prisma.sale.count({ where });

        res.json({
            meta: {
                page: pageNum,
                paginate: limit,
                total_data: totalData,
                total_page: Math.ceil(totalData / limit),
            },
            data: sales,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to fetch sales", message: err });
    }
};
