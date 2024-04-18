// Axios
import axios from "axios";

// Configs
import { NEXT_URL_API } from "@configs/env";
import { useSession } from "next-auth/react";

export const api = axios.create({
    baseURL: "http://alb-ecs-moai-desarrollo-882999684.us-east-2.elb.amazonaws.com:8060",
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
