import { Text } from '@dataesr/dsfr-plus';
import { Address } from '../../../../../api/types/commons';
import Map from '../../../../../components/map';
import './styles.scss';

export default function OrganizationLocalizations({ data: localizations }: { data: Address[] }) {
  if (!localizations?.length) return null;
  const mainAdress = localizations.find((element) => element.main)
  const markers = localizations.map((address) => ({
    latLng: [address?.gps?.lat, address?.gps?.lon],
    address: `${address?.address},
          ${address?.postcode}, ${address?.city},
          ${address?.country}`,
  }))
  return (
    <div className="fr-card fr-card--no-border fr-card--sm fr-mt-1w fix-height">
      <div style={{ padding: "0" }} className="fr-card__body">
        <div className="fr-card__content fr-m-0 fr-p-1w">
          <ul style={{ listStyle: "none" }}>
            <li key="main" >
              <Text bold size="sm" className="fr-card__detail fr-icon-map-pin-2-fill fr-pb-1w fr-pr-1w">
                {mainAdress.address}
                {mainAdress.address && <br />}
                {[mainAdress?.postcode, mainAdress?.city, mainAdress?.country].filter((element) => element).join(', ')}
              </Text>
              <hr className="fr-pb-1w" style={{ marginLeft: "10%", width: "90%" }} />
            </li>
            {localizations?.filter((a) => !a.main)?.map((address, i) => (
              <li key={i}>
                <Text size="sm" className="fr-card__detail fr-icon-map-pin-2-line fr-pb-1w fr-pr-1w">
                  {address.address}
                  {address.address && <br />}
                  {[address?.postcode, address?.city, address?.country].filter((element) => element).join(', ')}
                </Text>
                <hr className="fr-pb-1w" style={{ marginLeft: "10%", width: "90%" }} />
              </li>
            )
            )}
          </ul>
        </div>
      </div>
      <div className="fr-card__header">
        <div className="fr-card__img">
          <Map markers={markers} height="250px" />
        </div>
      </div>
    </div>
  )
}