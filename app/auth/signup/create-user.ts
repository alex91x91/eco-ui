"use server";

import { API_URL } from "@/app/constants/api";
import { getErrorMessage } from "@/app/util/errors";
import { redirect } from "next/navigation";

export default async function createUser(
  _prevState: { error: string },
  formData: FormData
) {
  const res = await fetch(`${API_URL}/users`, {
    method: "POST",
    body: formData,
  });
  const parsedRes = await res.json();
  if (!res.ok) {
    console.log(parsedRes);
    return { error: getErrorMessage(parsedRes) };
  }
  redirect("/");
}
