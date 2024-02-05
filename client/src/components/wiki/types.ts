export type WikipediaResult = {
  code: string;
  label: { default: string; };
  title: string;
  extract: string;
  image: string;
  url: string;
}
export type WikidataResult = {
  entities: {
    [key: string]: {
      id: string;
      sitelinks: {
        [key: string]: {
          url: string;
        }
      }
    }
  }
}

export type WikiPreviewResult = {
  query: {
    pages: {
      [key: string]: {
        title: string;
        extract: string;
        original: {
          source: string;
        }
        pageprops: {
          wikibase_item: string;
        }
      }
    }
  }
}