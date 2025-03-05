import api from "../axios.interceptor";

export const login = async (email: string, password: string) => {
  return await api.post("/login", { email, password });
};
