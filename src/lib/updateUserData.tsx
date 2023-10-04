export default async function updateUserData(
  sessionToken: any,
  payLoadData: any
) {
  var headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${sessionToken}`);

  const requestOptions = {
    method: "POST",
    headers: headers,
    body: JSON.stringify(payLoadData),
  };

  const res = await fetch(
    `https://${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/update-user`,
    requestOptions
  );

  if (!res.ok) throw new Error("Failed To Update User");

  return res.json();
}
