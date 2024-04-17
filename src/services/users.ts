// Axios
import { api } from "./api";

export async function getUsers(
    limit: number = 10,
    page: number = 1,
    search: string = "",
    status: string = "",
    role: string = ""
) {
    return await api.get(
        `/users/all?limit=${limit}&page=${page}&search=${search}&status=${status}&role=${role}`
    );
}

export async function getOneUser(id: string) {
    return await api.get(`/users/${id}`);
}

export async function updateStatus({
    id,
    status,
}: {
    id: string;
    status: number;
}) {
    return await api.put(`/users/update-status/${id}/${status}`);
}

export async function createUserSeller(data: DtoCreateUserSeller) {
    return await api.post("/users/create/seller", data);
}

export async function updateUserSeller(data: DtoUpdateUserSeller) {
    return await api.put("/users/update/seller", data);
}

export async function createUserAdmin(data: DtoCreateUserAdmin) {
    return await api.post("/users/create/admin", data);
}

export async function updateUserAdmin(data: DtoUpdateUserAdmin) {
    return await api.put("/users/update/admin", data);
}
