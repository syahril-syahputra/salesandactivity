// import { getSession } from "next-auth/react";
// import { AxiosResponse } from "axios";
// import { ISuccess } from "@/types/error";
import { api } from "./axios";

interface fetchClientProps {
    method?: "POST" | "GET" | "DELETE" | "PUT" | "PATCH";
    url: string;
    body?: object;
    token?: string;
    header?: object;
    contentType?: string;
    byPassVerification?: boolean;
}

async function fetchClient({
    method = "GET",
    url,
    body = {},
    contentType,
}: fetchClientProps) {
    const response = api({
        method: method,
        url: url,
        data: body,
        headers: {
            Accept: "application/json",
            "Content-Type": contentType || "application/json",
        },
    });
    return response;
}

export default fetchClient;
