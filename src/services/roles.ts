// Axios
import { api } from "./api";

export async function getRoles() {
    return await api.get("/roles/all");
}

export async function getOneRole(id: string) {
    return await api.get(`/roles/${id}`);
}
