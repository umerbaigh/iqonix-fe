import { BASE_URL, TOKEN } from "./axios-instance";

export async function getServerSideData(url = "", check = false) {
  const res = await fetch(`${BASE_URL}${url}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
    cache: "no-cache",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const repo = await res.json();
  if (check) {
    return repo;
  } else {
    return repo?.data?.attributes;
  }
}
