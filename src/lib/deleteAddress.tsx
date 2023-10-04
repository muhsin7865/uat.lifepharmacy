export default async function deleteAddress(payLoadData: any, sessionToken: any) {
  var raw = JSON.stringify(payLoadData);
  console.log({ sessionToken, payLoadData });
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${sessionToken}`);
  const res = await fetch(
    `https://${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/user/delete-address`,
    {
      method: "POST",
      headers:
        myHeaders,

      body: raw,
    }
  );
  if (!res.ok) throw new Error("Failed to fetch Data");

  return res.json();
}
