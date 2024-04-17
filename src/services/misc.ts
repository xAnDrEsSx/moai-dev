// Axios
import { api } from "./api";

export async function getCountries() {
    return await api.get("/countries/all");
}
