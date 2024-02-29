import { authorsIndex, postHeaders } from '../../../config/api'
import { ExportArgs } from '../../../types/commons'
import { ExportAuthor } from '../../../types/author';
import csvify from '../../utils/csvify';
import { FIELDS } from '../_utils/constants';

const EXPORT_SOURCE = [
  "id",
  "firstName",
  "lastName",
  "orcid",
  "idref",
  "fullName",
  "topDomains",
]

const CSVFormatter = (data: ExportAuthor[], ctx: string) => {
  const cols = [
    'Identifiant',
    'idref',
    'ORCID',
    'Prénom',
    'Nom',
    'Nom complet',
    'Domaine label',
    'Lien vers fiche scanR',
    "Date d'export",
    'Contexte de recherche',
  ];
  const rows = data.map(item => [
    item.id,
    item.idref,
    item.orcid,
    item.firstName || null,
    item.lastName || null,
    item.fullName,
    item.topDomains.map(element => element?.label?.default).join(';'),
    `https://scanr.enseignementsup-recherche.gouv.fr/person/${item.id}`,
    new Date().toISOString(),
    ctx,
  ]);
  return new Blob([csvify(rows, cols)], { type: 'text/csv' });
};
const JSONFormatter = (data: ExportAuthor[]) => {
  return new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
};

const exporter = (format) => format === 'csv' ? CSVFormatter : JSONFormatter;


export async function exportAuthors({ query, filters, format = 'csv', ctx }: ExportArgs): Promise<Blob> {
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
  if (filters) body.query.bool.filter = filters;
  const res = await fetch(
    `${authorsIndex}/_search`,
    { method: 'POST', body: JSON.stringify(body), headers: postHeaders })
  if (res.status !== 200) {
    throw new Error(`Elasticsearch error: ${res.status}`)
  }
  const json = await res.json()
  const data: ExportAuthor[] = json?.hits?.hits.map(hit => hit._source) || [];
  const blob = exporter(format)(data, ctx);
  return blob
}