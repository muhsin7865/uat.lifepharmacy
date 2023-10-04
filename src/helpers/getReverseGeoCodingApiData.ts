import getReverseGeoCodingData from "@/lib/getReverseGeoCodingData";

export async function getReverseGeoCodingApiData(
  lat: string | number,
  lng: string | number
) {
  const extractedData: any = {};
  const res = await getReverseGeoCodingData(lat, lng);
  
  const addressComponents = res.results[0].address_components;

  for (const component of addressComponents) {
    for (const type of component.types) {
      if (type === "locality") {
        extractedData.city = component.long_name;
      } else if (type === "administrative_area_level_1") {
        extractedData.state = component.long_name;
      } else if (type === "country") {
        extractedData.country = component.long_name;
      }
    }
  }

  extractedData.google_address = res.results[0].formatted_address;

  return extractedData;
}
