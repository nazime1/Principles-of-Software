export async function post(url: string, body: string) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain",
    },
    body: body,
  });

  const data = await response.text();
  return data;
}
//add more requests as we go
export async function get(url: string) {
  const response = await fetch(url, {
    method: "GET",
  });
  const data = await response.json();
  return data;
}
