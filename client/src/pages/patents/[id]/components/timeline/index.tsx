import cn from 'classnames';
import { useDSFRConfig } from "@dataesr/dsfr-plus";
import { PatentsData } from "../../../../../types/patent";
import './styles.scss';
import { useIntl } from "react-intl";

const options: Intl.DateTimeFormatOptions = {
  day: "numeric",
  year: "numeric",
  month: "long",
};

export default function PatentTimeline({ patents }: { patents: PatentsData[] }) {
  const intl = useIntl();
  const { locale } = useDSFRConfig();
  if (!patents?.length) return null;
  const spreaded = patents
    .reduce((acc, cur) => {
      const application = { type: "application", date: cur.applicationDate, office: cur.office, isPriority: cur.isPriority }
      const publication = { type: "publication", date: cur.publicationDate, office: cur.office }
      const grant = { type: "grant", date: cur.grantedDate, office: cur.office }
      return [...acc, application, publication, grant]
    }, [])
    .filter((element) => element.date)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map((element, i, arr) => {
      const hasBullet = i === 0 || arr?.[i - 1]?.date !== element.date;
      return { ...element, hasBullet }
    })
  const range = (new Date(spreaded?.[spreaded.length - 1]?.date).getTime() - new Date(spreaded?.[0]?.date).getTime());
  const _spreaded = spreaded.map((element, i) => {
    const margin = (new Date(spreaded?.[i + 1]?.date).getTime() - new Date(element.date).getTime()) / range * 100
    return { ...element, mb: margin }
  })


  return (
    <div className="timeline">
      {_spreaded.map((element, i) => (
        <div
          className={cn(
            "timeline-item", `timeline-item--${element.type}`, { 'timeline-item__bullet': element.hasBullet })}
          style={{ marginBottom: element.mb }}
          key={i}
        >
          {(element.date !== _spreaded?.[i - 1]?.date) && (<><span className="fr-mb-0 fr-text--sm fr-text-mention--grey fr-text--bold">
            <em>
              {new Date(element.date).toLocaleDateString(locale, options)}
            </em>
          </span>
            <br />
          </>
          )}
          {element.isPriority && <span className="fr-mb-0 fr-text--xs fr-icon-bookmark-fill fr-icon--xs fr-mr-1v" />}
          {element.type === 'grant' && <span className="fr-mb-0 fr-text--xs fr-icon-star-fill fr-icon--xs fr-mr-1v" />}
          <span
            className={cn("fr-mb-0 fr-text--xs")}
          >
            {intl.formatMessage({ id: `patents.section.timeline.${element.type}` })}
            {intl.formatMessage({ id: `${element.office}-article` })}
            {element.isPriority && <span> - {intl.formatMessage({ id: 'patents.section.timeline.priority' })}</span>}
          </span>
        </div>
      ))}
    </div>
  )
}