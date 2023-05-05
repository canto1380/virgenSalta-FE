import Cookies from "js-cookie";

export const setDataToken = (data) => {
  return localStorage.setItem("data-security-page-ssma", JSON.stringify(data));
};
export const getDataToken = () => {
  if(typeof window !== 'undefined') {
    return JSON.parse(localStorage.getItem("data-security-page-ssma"));
  }
};
export const setToken = (token) => {
  return localStorage.setItem("jwt-security-page-ssma", JSON.stringify(token));
};
export const getToken = () => {
  if(typeof window !== 'undefined') {
    let aa = localStorage.getItem("jwt-security-page-ssma")
    if(aa !== null ) {
      aa = aa.replace(/['"]+/g, '')
      // return localStorage.getItem("jwt-security-page-ssma");
      return aa
    }
  }
};
export const deleteToken = () => {
  localStorage.removeItem("data-security-page-ssma");
  return localStorage.removeItem("jwt-security-page-ssma");
};

export const deleteCookies = () => {
  Cookies.remove('token')
  Cookies.remove('idUser')
}
