import { projectsIndex, postHeaders } from "../../../config/api";
import { ExportArgs } from "../../../types/commons";
import { ExportProject } from "../../../types/project";
import csvify from "../../utils/csvify";
import { FIELDS } from "../_utils/constants";

const EXPORT_SOURCE = [
  "id",
  "label",
  "type",
  "startDate",
  "endDate",
  "budgetTotal",
  "budgetFinanced",
  "url",
  "participantCount",
  "call",
  "action",
  "duration",
];

const CSVFormatter = (data: ExportProject[], ctx: string) => {
  const cols = [
    "Identifiant",
    "Label",
    "Type",
    "Date de début",
    "Date de fin",
    "Budget total",
    "Budget financé",
    "URL",
    "URL du project",
    "Nombre de participant",
    "Nom de l'appel à projet",
    "Label de l'action",
    "Durée",
    "Lien vers fiche scanR",
    "Date d'export",
    "Contexte de recherche",
  ];
  const rows = data.map((item) => [
    item.id,
    item.label && (item.label.default || item.label.fr || item.label.en),
    item.type,
    item.startDate && new Date(item.startDate).toISOString(),
    item.endDate && new Date(item.endDate).toISOString(),
    item.budgetTotal,
    item.budgetFinanced,
    item.url,
    null,
    item.participantCount,
    item.call?.label,
    item.action?.label.default,
    item.duration,
    `https://scanr.enseignementsup-recherche.gouv.fr/project/${item.id}`,
    new Date().toISOString(),
    ctx,
  ]);
  return new Blob([csvify(rows, cols)], { type: "text/csv" });
};
const JSONFormatter = (data: ExportProject[]) => {
  return new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
};

const exporter = (format) => (format === "csv" ? CSVFormatter : JSONFormatter);

export async function exportProjects({
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
  const res = await fetch(`${projectsIndex}/_search`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: postHeaders,
  });
  if (res.status !== 200) {
    throw new Error(`Elasticsearch error: ${res.status}`);
  }
  const json = await res.json();
  const data: ExportProject[] =
    json?.hits?.hits.map((hit) => hit._source) || [];
  const blob = exporter(format)(data, ctx);
  return blob;
}
