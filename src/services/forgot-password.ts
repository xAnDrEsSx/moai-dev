// Axios
import { api } from "./api";

export async function sendEmail(data: { userEmail: string }) {
    return await api.put("/auth/resset-password/mail", data);
}

export async function restorePassword(data: {
    userEmail: string;
    password: string;
}) {
    return await api.put("/auth/resset-password/confirm", data);
}

export async function changePassword(id: string, data: { password: string }) {
    return await api.put(`/auth/change-password/${id}`, data);
}
