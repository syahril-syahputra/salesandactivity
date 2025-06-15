import fetchClient from "@/lib/FetchClient";
import type { IFilterSale, Sale } from "@/types/sales";
import type { ITableMeta, ITableSort } from "@/types/table";

import { useQuery } from "@tanstack/react-query";
import type { PaginationState } from "@tanstack/react-table";

export const useFetchSales = (
    page: PaginationState,
    filter: IFilterSale,
    sort: ITableSort
) => {
    return useQuery({
        queryFn: async () => {
            const baseUrl = `/sale`;
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
                data: Sale[];
                meta: ITableMeta;
            };
        },
        queryKey: ["fetch.sale", page, filter, sort],
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        placeholderData: (previousData: any) => previousData,
    });
};
