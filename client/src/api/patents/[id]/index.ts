import { postHeaders, patentsIndex } from "../../../config/api";
import { Patent } from "../../../types/patent";

export async function getPatentById(id: string): Promise<Patent> {
  const body: any = {
    // _source: [
    //   "id",
    //   "title",
    //   "summary",
    //   "submissionDate",
    //   "publicationDate",
    //   "grantedDate",
    //   "label.default",
    //   "authors.fullName",
    //   "patent.id",
    //   "patent.links.url",
    // ],
    query: {
      bool: {
        filter: [{ term: { id } }],
      },
    },
  };
  const res = await fetch(`${patentsIndex}/_search`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: postHeaders,
  });

  const data = await res.json();
  const patent = data?.hits?.hits?.[0]?._source;
  if (!patent) throw new Error("404");
  return { ...patent, _id: data?.hits?.hits?.[0]._id };
}
export async function getCpcAggregation(value: string): Promise<Patent> {
  const body: any = {
    size: 0,
    query: {
      bool: {
        must: [
          {
            term: {
              "applicants.ids.id.keyword": value,
            },
          },
        ],
      },
    },
    aggs: {
      byCpc: {
        terms: {
          field: "cpc.ss_classe.code.keyword",
          size: 10000,
        },
      },
    },
  };

  const res = await fetch(`${patentsIndex}/_search`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: postHeaders,
  });

  const data = await res.json();

  const buckets = data?.aggregations?.byCpc?.buckets;
  const hits = data?.hits?.hits;

  const labelsByCode = hits.reduce((acc: any, hit: any) => {
    const cpcGroups = hit._source.cpc?.ss_classe ?? [];
    cpcGroups.forEach((cpc: any) => {
      if (!acc[cpc.code]) {
        acc[cpc.code] = cpc.label;
      }
    });
    return acc;
  }, {});

  const patent = buckets.map((bucket: any) => ({
    code: bucket.key,
    doc_count: bucket.doc_count,
    label: labelsByCode[bucket.key] || "Label non trouvé",
  }));

  if (!patent.length) throw new Error("404");

  return patent;
}
