// Axios
import { api } from "./api";

export async function login(data: DtoLogin) {
    return await api.post("/auth/login", data);
}
