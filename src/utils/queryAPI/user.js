import { api } from "../api";

export const getUserById = async (id, tokenAuth) => {
  if (id !== undefined) {
    const res = await api("GET", `users/${id}`, "", tokenAuth);
    if (res.status === 200) {
      const data = res?.data;
      return data;
    }
  }
};
