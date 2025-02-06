import { cookies } from "next/headers";
import { getErrorMessage } from "./errors";
import { API_URL } from "../constants/api";

const getHeaders = () => ({
  Cookie: cookies().toString(),
});

export const post = async (path: string, formData: FormData) => {
  const res = await fetch(`${API_URL}/${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getHeaders(),
    },
    body: JSON.stringify(Object.fromEntries(formData)),
  });
  const parsedRes = await res.json();
  if (!res.ok) {
    console.log(parsedRes);
    return { error: getErrorMessage(parsedRes) };
  }

  return { error: "" };
};

export const get = async (path: string) => {
  const res = await fetch(`${API_URL}/${path}`, {
    headers: {
      ...getHeaders(),
    },
  });

  return res.json();
};
