// Axios
import axios from "axios";

// Configs
import { NEXT_URL_API } from "@configs/env";
import { useSession } from "next-auth/react";

export const api = axios.create({
    baseURL: NEXT_URL_API || "http://localhost:8000",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

/* api.interceptors.request.use(async (request) => {
    const session = await useSession();

    if (session) {
        request.headers.common = {
            Authorization: `bearer ${session.data?.user?.access_token}`,
        };
    }

    return request;
}); */
