import axios, { AxiosRequestConfig, RawAxiosRequestHeaders } from "axios";
import { Dispatch } from "react";
import { Application, CreatedForm } from "./model";

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
  set({ type: "loading" });
  const { app_id } = await params;

  AxiosInstance.get(`${NEXT_DB_URL}/application/${app_id}`, config)
    .then((response) => {
      set({ type: "done", data: response.data });
    })
    .catch((err) => {
      set({ type: "error", error: { ...err, app_id }, data: undefined });
    });
};

export const createApplication = async (
  set: Dispatch<any>,
  body: CreatedForm
) => {
  set({ type: "loading" });
  const { app_name } = body;

  if (app_name.length < 1) {
    set({
      type: "error",
      error: "Your app name must be at least 1 charactrer long!",
    });
  } else {
    AxiosInstance.post(`${NEXT_DB_URL}/create`, body)
      .then((response) => {
        set({ type: "done", data: response.data });
      })
      .catch((err) => {
        set({ type: "error", error: { ...err, app_name }, data: body });
        set({ type: "error", error: err });
      });
  }
};

export const updateApplication = async (
  set: Dispatch<any>,
  body: Application,
  submit?: boolean
) => {
  set({ type: "loading" });
  const { id } = body;

  AxiosInstance.patch(
    submit
      ? `${NEXT_DB_URL}/save/${id}?submit=true`
      : `${NEXT_DB_URL}/save/${id}`,
    body,
    config
  )
    .then((response) => {
      set({ type: "done", data: response.data });
    })
    .catch((err) => {
      set({ type: "error", error: { ...err, app_id: id }, data: body });
    });
};
