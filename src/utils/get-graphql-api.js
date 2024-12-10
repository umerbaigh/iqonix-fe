import { TOKEN } from "./axios-instance";

export async function getGraphql(query = "", check = false) {
  const res = await fetch(
    "https://iqonix-strapi-1c6eecc5667b.herokuapp.com/graphql",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify({ query }),
    }
  );
  //   const res = await fetch(
  //     `https://iqonix-strapi-1c6eecc5667b.herokuapp.com/graphql${url}`,
  //     {
  //       headers: {
  //         Authorization: `Bearer ${TOKEN}`,
  //       },
  //       cache: "no-cache",
  //     }
  //   );

  if (!res.ok) {
    console.error("Failed to fetch data");
    return null; // Return null to avoid breaking the component
  }

  const repo = await res.json();
  if (check) {
    return repo;
  } else {
    return repo?.data?.attributes;
  }
}
