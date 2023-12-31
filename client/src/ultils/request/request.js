import { baseUrl } from "../../constants/constant";

export const getApi = async (endpoint, searchParams) => {
  const queryParams = searchParams
    ? "?" + new URLSearchParams(searchParams)
    : "";
  const fullUrl = baseUrl + "/" + endpoint + queryParams;
  const respond = await fetch(fullUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return respond.json();
};

export const postApi = async (endpoint, data) => {
  const fullUrl = baseUrl + "/" + endpoint;
  const respond = await fetch(fullUrl, {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include", // if don't have this, token can't be set to cookies
  });

  return respond.json();
};
