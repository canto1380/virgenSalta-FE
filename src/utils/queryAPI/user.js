import { api } from "../api";

export const getUserById = async (id, tokenAuth) => {
  if (id !== undefined) {
    const res = await api("GET", `users/${id}`, "", tokenAuth);
    if (res.status === 200) {
      const data = res?.data;
      return data;
    }
    if(res.response.status === 401) {
      return false
    }
  }
};

export const getUserByEmail = async (email) => {
  if (email !== undefined) {
    const res = await api("GET", `users/email/${email}`, "", undefined);
    if (res.status === 200) {
      const data = res?.data;
      return data;
    }
    if(res.response.status === 401) {
      return false
    }
  }
};
