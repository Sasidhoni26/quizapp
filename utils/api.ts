// utils/api.ts
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const API_URL = process.env.API_URL; // Your backend API URL

/**
 * A function to make dynamic API calls (GET, POST, PATCH, DELETE)
 */
const apiCall = async <T>(
  method: "GET" | "POST" | "PATCH" | "DELETE",
  endpoint: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  try {
    console.log("+++++++++++++++++++++++++++");
    console.log(data);
    const response = await axios({
      method,
      url: `${API_URL}${endpoint}`,
      data: data || null,
      headers: {
        "Content-Type": "application/json",
        ...(config?.headers || {}),
      },
      ...config,
    });
    return response;
  } catch (error) {
    // Handle Axios error
    throw error;
  }
};

// GET request function
export const get = <T>(endpoint: string, config?: AxiosRequestConfig) =>
  apiCall<T>("GET", endpoint, undefined, config);

// POST request function
export const post = <T>(
  endpoint: string,
  data: any,
  config?: AxiosRequestConfig
) => apiCall<T>("POST", endpoint, data, config);

// PATCH request function
export const patch = <T>(
  endpoint: string,
  data: any,
  config?: AxiosRequestConfig
) => apiCall<T>("PATCH", endpoint, data, config);

// DELETE request function
export const del = <T>(endpoint: string, config?: AxiosRequestConfig) =>
  apiCall<T>("DELETE", endpoint, undefined, config);
