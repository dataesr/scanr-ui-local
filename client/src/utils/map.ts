export type Affiliations = {
  label: {
    fr: string;
    en: string;
    default: string;
  };
  address: {
    address: string;
    postcode: string;
    city: string;
    country: string;
    gps: {
      lat: number;
      lon: number;
    };
  }[];
}

export function getMarkers(affiliations: Affiliations[]) {
  return affiliations.filter((element) => element?.address?.[0]?.gps?.lat).map((element) => {
    const address = element.address[0];
    const { lat, lon } = address.gps;
    const label = element.label.fr || element.label.en || element.label.default;
    return ({
      latLng: [lat, lon],
      address: `${label}
          ${address?.address},
          ${address?.postcode},
          ${address?.city},
          ${address?.country}`,
    });
  });
}