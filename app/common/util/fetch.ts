import { cookies } from "next/headers";
import { getErrorMessage } from "./errors";
import { API_URL } from "../constants/api";

export const getHeaders = () => ({
  Cookie: cookies().toString(),
});

export const post = async (path: string, data: FormData | object) => {
  const body = data instanceof FormData ? Object.fromEntries(data) : data;
  const res = await fetch(`${API_URL}/${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getHeaders(),
    },
    body: JSON.stringify(body),
  });
  const parsedRes = await res.json();
  if (!res.ok) {
    console.log(parsedRes);
    return { error: getErrorMessage(parsedRes) };
  }

  return { error: "", data: parsedRes };
};

export const get = async <T>(path: string, tags?: string[]) => {
  const res = await fetch(`${API_URL}/${path}`, {
    headers: {
      ...getHeaders(),
    },
    next: { tags },
  });

  return res.json() as T;
};
