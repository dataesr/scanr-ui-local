import { WikiPreviewResult, WikidataResult } from "./types";

export async function getWikidataPreviews(wikis, locale = "en") {
  const temp = [...wikis]
  const ids = wikis.map((wiki) => wiki.code);
  const data: WikidataResult = await fetch(
    `https://www.wikidata.org/w/api.php?action=wbgetentities&ids=${ids.join('|')}&format=json&origin=*&props=sitelinks/urls&languages=${locale}`
  ).then((r) => r.json()).catch((err) => { console.error("ERRORWIKIDATA", err); });
  
  temp.forEach((el) => {
    const entity = data?.entities?.[el.code];
    el.title = entity?.sitelinks[`${locale}wiki`]?.url?.split("/").pop();
    el.url = entity?.sitelinks[`${locale}wiki`]?.url;
  })
  
  const titles = temp.map((el) => el.title).join('|');
  const _url = `https://${locale}.wikipedia.org/w/api.php?titles=${titles}&action=query&format=json&prop=extracts|pageimages|pageprops&ppprop=wikibase_item&piprop=original&exintro&explaintext&origin=*`
  const previews: WikiPreviewResult = await fetch(_url).then((res) => res.json());
  
  temp.forEach((el) => {
    const page = Object.values(previews?.query?.pages || {}).find((page) => page?.pageprops?.wikibase_item === el.code);
    el.title = page?.title;
    el.extract = page?.extract;
    el.image = page?.original?.source;
  })
  
  return temp;
}