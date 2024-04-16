// Axios
import { api } from "./api";

export async function getStatus() {
    return await api.get("/status/all");
}
