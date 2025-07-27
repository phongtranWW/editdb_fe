import privateAxios from "./privateAxios";

export const getProfile = () => privateAxios.get("/users/me");
