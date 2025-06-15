
import { Button } from "@/components/ui/button";
import DataTable from "@/components/ui/data-table";

import { createColumnHelper } from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

import utc from "dayjs/plugin/utc";
import { ListRestart } from "lucide-react";
import { useFetchSales } from "@/features/useFetchSales";
import type { IFilterSale, Sale } from "@/types/sales";
import useTableConfig from "@/lib/useTableConfig";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { formatRupiah } from "@/lib/formatRp";

export default function Sale() {
    dayjs.extend(utc);

    const [titleSearch, settitleSearch] = useState("");

    const {
        filter,
        sort,
        pagination,
        setsort,
        setPagination,
        resetHandler,
        filterValue,
        setfilterValue,
        setfilter,
    } = useTableConfig<IFilterSale>({
        defaultComlumnType: "desc",
        defaultFilter: {
            productName: "",
        },
    });
    useEffect(() => {
        let timeoutId: NodeJS.Timeout;
        const checkTextChange = () => {
            timeoutId = setTimeout(() => {
                setfilter(filterValue);
            }, 500);
        };
        checkTextChange();
        return () => clearTimeout(timeoutId);
    }, [filterValue]);
    const { error, data, isFetching } = useFetchSales(pagination, filter, sort);

    const columnHelper = createColumnHelper<Sale>();
    const columns = [
        columnHelper.display({
            id: "no",
            header: () => <span className="block text-center">No.</span>,
            cell: (props) => (
                <span className="block text-center">
                    {props.row.index +
                        1 +
                        (pagination.pageIndex - 1) * pagination.pageSize}
                </span>
            ),
            enableHiding: false,
        }),

        columnHelper.accessor("date", {
            id: "date",
            header: () => <span>Date</span>,
            cell: (info) => dayjs(info.getValue()).format("DD MMM YYYY HH:mm"),
            enableSorting: true,
        }),
        columnHelper.accessor("productName", {
            id: "productName",
            header: () => <span>Product</span>,
            cell: (info) => info.getValue(),
            enableSorting: true,
        }),
        columnHelper.accessor("amount", {
            id: "amount",
            header: () => <span>Amount</span>,
            cell: (info) => (
                <div className="text-right">
                    {formatRupiah(info.getValue())}
                </div>
            ),
            enableSorting: true,
        }),

        columnHelper.display({
            id: "actions",
            cell: (props) => (
                <div className="text-right">
                    <Link to={"/dashboard/kupon/" + props.row.original.id}>
                        <Button variant={"secondary"}>View</Button>
                    </Link>
                </div>
            ),
            enableHiding: false,
        }),
    ];

    return (
        <div>
            <div className="flex flex-1 items-center bg-secondary mt-8 p-4 rounded-lg">
                <div className="grid flex-1 grid-cols-4 gap-4">
                    <Input
                        className="w-full"
                        placeholder="Insert Product Name"
                        value={titleSearch}
                        onChange={(e) => {
                            const val: string = e.target.value;
                            settitleSearch(val);
                            if (e.target.value.length >= 1) {
                                setfilterValue({
                                    ...filterValue,
                                    productName: e.target.value,
                                });
                            }
                        }}
                    />

                    <div className="w-auto pr-4">
                        <Button
                            variant={"ghost"}
                            onClick={() => resetHandler()}
                        >
                            <ListRestart className="mr-2" />
                            Reset
                        </Button>
                    </div>
                </div>
            </div>

            <div className="my-5 space-y-4">
                <DataTable
                    columns={columns}
                    data={data?.data}
                    meta={data?.meta}
                    sort={sort}
                    loading={isFetching}
                    error={error}
                    setSort={setsort}
                    setPagination={setPagination}
                    className="min-h-60"
                />
            </div>
        </div>
    );
}
