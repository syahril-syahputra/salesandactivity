import fetchClient from "@/lib/FetchClient";
import type { Activity, IFilterActivity } from "@/types/activity";
import type { ITableMeta, ITableSort } from "@/types/table";

import { useQuery } from "@tanstack/react-query";
import type { PaginationState } from "@tanstack/react-table";

export const useFetchActivity = (
    page: PaginationState,
    filter: IFilterActivity,
    sort: ITableSort
) => {
    return useQuery({
        queryFn: async () => {
            const baseUrl = `/activity`;
            const queryParams = new URLSearchParams({
                page: page.pageIndex.toString(),
                paginate: page.pageSize.toString(),
                ...filter,
                ...sort,
            });
            const url = `${baseUrl}?${queryParams.toString()}`;
            const response = await fetchClient({
                url: url,
            });
            return response.data as {
                data: Activity[];
                meta: ITableMeta;
            };
        },
        queryKey: ["fetch.activity", page, filter, sort],
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        placeholderData: (previousData: any) => previousData,
    });
};
