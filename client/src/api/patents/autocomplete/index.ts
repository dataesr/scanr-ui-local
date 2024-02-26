// import { postHeaders } from "../../../config/api";
// import {
//   SearchArgs,
//   SearchResponse,
//   ElasticResult,
// } from "../../../types/commons";
// import { LightPatent } from "../../../types/patent";

// const SOURCE = [
//   "id",
//   "label",
//   "address.main",
//   "address.city",
//   "publicationsCount",
//   "projectsCount",
// ];

// export async function autocompletePatents({
//   query,
// }: SearchArgs): Promise<Pick<SearchResponse<LightPatent>, "data">> {
//   const body: any = {
//     _source: SOURCE,
//     size: 7,
//     query: {
//       multi_match: {
//         query,
//         type: "bool_prefix",
//         fields: [
//           "autocompleted",
//           "autocompleted._2gram",
//           "autocompleted._3gram",
//         ],
//       },
//     },
//   };
//   const res = await fetch(
//     "https://cluster-production.elasticsearch.dataesr.ovh/scanr-patents-test/_search",
//     { method: "POST", body: JSON.stringify(body), headers: postHeaders }
//   );
//   const data = await res.json();
//   const orgs: ElasticResult<LightPatent>[] = data?.hits?.hits || [];
//   console.log("orgs", orgs);

//   return { data: orgs };
// }
