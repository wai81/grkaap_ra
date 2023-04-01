import { HttpError } from "@refinedev/core";

// "axios" package should be installed to customize the http client
import axios from "axios";

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      
      const customError: HttpError = {
        ...error,
        message: error.response?.data?.detail,
        statusCode: error.response?.status,
      };
      console.log(error.response?.data)
      return Promise.reject(customError);
    }
);

export { axiosInstance };
