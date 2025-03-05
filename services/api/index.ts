import api from "../axios.interceptor";

export const login = async (email: string, password: string) => {
  try {
    return await api.post("/login", { email, password });
  } catch (error) {
    throw error;
  }
};
