export default async function getAppointmentsDetails(
  appointmentStatus: string,
  sessionToken: string
) {
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${sessionToken}`,
      "Content-Type": "application/json",
    },
  };
  const res = await fetch(
    `https://${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/clinics/v1/appointments?list_type=${appointmentStatus}&lang=ae-en&skip=0&take=5`,
    requestOptions
  );

  if (!res.ok) throw new Error("Failed to fetch Data");

  return res.json();
}
