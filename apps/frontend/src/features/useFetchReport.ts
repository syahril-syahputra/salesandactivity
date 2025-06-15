import fetchClient from "@/lib/FetchClient";
import type { DashboardSummary } from "@/types/data";

import { useQuery } from "@tanstack/react-query";

export const useFetchReport = () => {
    return useQuery({
        queryFn: async () => {
            const url = `/data`;

            const response = await fetchClient({
                url: url,
            });
            return response.data as DashboardSummary;
        },
        queryKey: ["fetch.sale"],
    });
};
