"use client";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/ui/data-table";

import { createColumnHelper } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

import utc from "dayjs/plugin/utc";
import { ListRestart } from "lucide-react";
import useTableConfig from "@/lib/useTableConfig";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import type { Activity, IFilterActivity } from "@/types/activity";
import { useFetchActivity } from "@/features/useFetchActivity";

export default function Activity() {
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
    } = useTableConfig<IFilterActivity>({
        defaultComlumnType: "desc",
        defaultFilter: {
            userId: "",
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
    const { error, data, isFetching } = useFetchActivity(
        pagination,
        filter,
        sort
    );

    const columnHelper = createColumnHelper<Activity>();
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

        columnHelper.accessor("userId", {
            id: "userId",
            header: () => <span>User</span>,
            cell: (info) => info.getValue(),
            enableSorting: true,
        }),
        columnHelper.accessor("timestamp", {
            id: "timestamp",
            header: () => <span>Date</span>,
            cell: (info) => dayjs(info.getValue()).format("DD MMM YYYY HH:mm"),
            enableSorting: true,
        }),
        columnHelper.accessor("action", {
            id: "action",
            header: () => <span>Action</span>,
            cell: (info) => info.getValue(),
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
                        placeholder="Insert User ID"
                        value={titleSearch}
                        onChange={(e) => {
                            const val: string = e.target.value;
                            settitleSearch(val);
                            if (e.target.value.length >= 1) {
                                setfilterValue({
                                    ...filterValue,
                                    userId: e.target.value,
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
