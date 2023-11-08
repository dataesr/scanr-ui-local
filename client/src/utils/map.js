export function getMarkers(affiliations) {
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