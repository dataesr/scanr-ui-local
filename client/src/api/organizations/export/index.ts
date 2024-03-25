import { organizationsIndex, postHeaders } from '../../../config/api'
import { ExportArgs } from '../../../types/commons'
import { ExportOrganization } from '../../../types/organization';
import csvify from '../../utils/csvify';
import { FIELDS, EXPORT_SOURCE } from '../_utils/constants';
import { getMatchPhrases } from '../_utils/get-match-phrases';


const DEFAULT_FILTERS = [
  { term: { isFrench: true } },
  { term: { status: "active" } },
]

const CSVFormatter = (data: ExportOrganization[], ctx: string) => {
  const cols = [
    'Identifiant',
    'Label',
    'Acronyme',
    'Nature',
    'Code postal',
    'Ville',
    'Site internet',
    'Lien vers fiche scanR',
    "Date d'export",
    'Contexte de recherche',
  ];
  const rows = data.map((item) => {
    const address = item.address ? item.address.filter(a => a.main) : [];
    const link = item.links ? item.links.filter(l => l.type === 'main') : [];
    return [
      item.id,
      item.label && (item.label.default || item.label.fr),
      item.acronym && (item.acronym.default || item.acronym.fr),
      item.nature,
      address.length && address[0].postcode,
      address.length && address[0].city,
      link.length && link[0].url,
      `https://scanr.enseignementsup-recherche.gouv.fr/entite/${item.id}`,
      new Date().toISOString(),
      ctx,
    ];
  });
  return new Blob([csvify(rows, cols)], { type: 'text/csv' });
};
const JSONFormatter = (data: ExportOrganization[]) => {
  return new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
};

const exporter = (format) => format === 'csv' ? CSVFormatter : JSONFormatter;


export async function exportOrganizations({ query, filters, format = 'csv', ctx }: ExportArgs): Promise<Blob> {
  const body: any = {
    _source: EXPORT_SOURCE,
    size: 1000,
    query: {
      bool: {
        must: [
          {
            query_string: {
              query: query || '*',
              fields: FIELDS,
            },
          }
        ]
      }
    },
  }
  if (filters) body.query.bool.filter = [...filters, ...DEFAULT_FILTERS]
  const res = await fetch(
    `${organizationsIndex}/_search`,
    { method: 'POST', body: JSON.stringify(body), headers: postHeaders })
  if (res.status !== 200) {
    throw new Error(`Elasticsearch error: ${res.status}`)
  }
  const json = await res.json()
  const data: ExportOrganization[] = json?.hits?.hits.map(hit => hit._source) || [];
  const blob = exporter(format)(data, ctx);
  return blob
}
export async function exportOrganizationsForHe({ query, filters, format = 'csv', ctx }: ExportArgs): Promise<Blob> {
  const body: any = {
    _source: EXPORT_SOURCE,
    size: 1000,
    query: {
      bool: {
        minimum_should_match: 1,
        should: getMatchPhrases(query?.split('|')),
        filter: [...filters || [], { term: { status: "active" } }]
      }
    },
  }
  if (filters) body.query.bool.filter = [...filters, ...DEFAULT_FILTERS]
  const res = await fetch(
    `${organizationsIndex}/_search`,
    { method: 'POST', body: JSON.stringify(body), headers: postHeaders })
  if (res.status !== 200) {
    throw new Error(`Elasticsearch error: ${res.status}`)
  }
  const json = await res.json()
  const data: ExportOrganization[] = json?.hits?.hits.map(hit => hit._source) || [];
  const blob = exporter(format)(data, ctx);
  return blob
}