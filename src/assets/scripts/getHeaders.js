import { getCookie } from "cookies-next";

const getHeaders = () => {
  let headers = {
    "Content-Type": "application/json",
    Authorization: `Token ${getCookie("auth-token")}`,
  };

  return headers;
};

export default getHeaders;
