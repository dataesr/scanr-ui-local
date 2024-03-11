import { postHeaders, patentsIndex } from "../../../config/api";
import { ExportArgs } from "../../../types/commons";
import { ExportPatent } from "../../../types/patent";
import csvify from "../../utils/csvify";
import { FIELDS } from "../_utils/constants";

const EXPORT_SOURCE = [
  "id",
  "inpadocFamilyId",
  "patentType",
  "publicationDate",
  "authors",
  "domains",
  "patents",
  "title",
  "summary",
  "submissionDate",
  "grantedDate",
  "fullName",
  "isInternational",
  "affiliations",
];

const CSVFormatter = (data: ExportPatent[], ctx: string) => {
  const cols = [
    "Identifiant",
    "Date de publication",
    "submissionDate",
    "International",
    "Nombre d'auteurs",
    "Nombre de domaines",
    "Nombre de brevets",
    "Titre",
  ];

  const rows = data.map((item) => [
    item.id,
    item.publicationDate,
    item.submissionDate,
    item.isInternational,
    item.authors ? item.authors.length : 0,
    item.domains ? item.domains.length : 0,
    item.patents ? item.patents.length : 0,
    item.title.fr || item.title.default || item.title.en || "",
    ctx,
  ]);
  return new Blob([csvify(rows, cols)], { type: "text/csv" });
};

const JSONFormatter = (data: ExportPatent[]) => {
  return new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
};

const exporter = (format) => (format === "csv" ? CSVFormatter : JSONFormatter);

export async function exportPatents({
  query,
  filters,
  format = "csv",
  ctx,
}: ExportArgs): Promise<Blob> {
  const body: any = {
    _source: EXPORT_SOURCE,
    size: 1000,
    query: {
      bool: {
        must: [
          {
            query_string: {
              query: query || "*",
              fields: FIELDS,
            },
          },
        ],
      },
    },
  };
  if (filters) body.query.bool.filter = filters;
  const res = await fetch(`${patentsIndex}/_search`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: postHeaders,
  });
  if (res.status !== 200) {
    throw new Error(`Elasticsearch error: ${res.status}`);
  }
  const json = await res.json();
  const data: ExportPatent[] = json?.hits?.hits.map((hit) => hit._source) || [];
  const blob = exporter(format)(data, ctx);
  return blob;
}
