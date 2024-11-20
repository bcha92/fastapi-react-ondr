import axios, { AxiosRequestConfig, RawAxiosRequestHeaders } from "axios";
import { Dispatch } from "react";

const NEXT_DB_URL = "http://127.0.0.1:8000";

const config: AxiosRequestConfig = {
  headers: {
    Accept: "application/vnd.github+json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    "Access-Control-Allow-Credentials": "*",
  } as RawAxiosRequestHeaders,
  responseType: "json",
};

const AxiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

export const getApplications = async (set: Dispatch<any>) => {
  set({ type: "loading" });

  AxiosInstance.get(NEXT_DB_URL, config)
    .then((response) => {
      set({ type: "done", data: response.data });
    })
    .catch((err) => {
      set({ type: "error", error: err, data: [] });
    });
};

export const getOneApplication = async (
  set: Dispatch<any>,
  params: Promise<{ app_id: string }>
) => {
  const { app_id } = await params;

  AxiosInstance.get(`${NEXT_DB_URL}/application/${app_id}`, config)
    .then((response) => {
      set({ type: "done", data: response.data });
    })
    .catch((err) => {
      set({ type: "error", error: { ...err, app_id }, data: undefined });
    });
};
