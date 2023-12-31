export const baseUrl =
  process.env.REACT_APP_ENV === "development"
    ? process.env.REACT_APP_DEV_API
    : process.env.REACT_APP_PROD_API;
