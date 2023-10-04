export default async function getReverseGeoCodingData(lat: string | number, lng: string | number) {
  const res = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyC8F9csLoa6MRF3Cbg53T8Y4_YThxEp9rM`
  );

  if (!res.ok) throw new Error("Failed to fetch Data");

  return res.json();
}
