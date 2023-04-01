import type { AuthBindings } from "@refinedev/core";
import { TOKEN_KEY, API_URL } from '../../constants';
import axios, { AxiosInstance } from "axios";

export const authProvider = (axiosInstance: AxiosInstance): AuthBindings => {
  //    export const authProvider4 : AuthBindings = {
  return {
    login: async ({ username, password }) => {
      if (username && password) {
        try {
          delete axios.defaults.headers.common["Authorization"];
          const form_data = new FormData();
          const grant_type = "password";
          const item: any = { grant_type, username, password };
          for (const key in item) {
            form_data.append(key, item[key]);
          }
          const { data } = await axios.post(`${API_URL}/auth/login`, form_data);
          localStorage.setItem(TOKEN_KEY, data.access_token);
        } catch (error) {
          return {
            success: false,
            error: {
              name: "Login Error",
              message: "Username or password is incorrect",
            },
          };
        }

        return {
          success: true,
          redirectTo: "/",
        };
      }

      return {
        success: false,
        error: {
          name: "LoginError",
          message: "Invalid username or password",
        },
      };
    },
    logout: async () => {
      localStorage.removeItem(TOKEN_KEY);
      return {
        success: true,
        redirectTo: "/login",
      };
    },
    check: async () => {
      const token = localStorage.getItem(TOKEN_KEY);
      if (token) {
        return {
          authenticated: true,
        };
      } else {
        return {
          authenticated: false,
          logout: true,
          redirectTo: "/login",
          error: new Error("User is not authenticated"),
        };
      }
    },
    onError: async ({ error }) => {
      if (error.status === 401 || error.status === 403) {
        return {
          logout: true,
          redirectTo: "/login",
          error,
        };
      }
      return {};
    },
    getIdentity: async () => {
      const token = localStorage.getItem(TOKEN_KEY);
      if (token) {
        const userInfo = await axiosInstance.get(`${API_URL}/auth/user`);
        return userInfo.data;
      }
      return null;
    },
    getPermissions: async () => {
      const token = localStorage.getItem("TOKEN_KEY");
      if (token) {
        const userInfo = await axiosInstance.get(`${API_URL}/auth/user`);
        return userInfo.data;
      }
      return null;
    },
  };
};
