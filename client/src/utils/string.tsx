import { Fragment } from "react";

export function encode(value: string): string {
  if (!value) return value;
  return value.replace(/\//g, "%2F");
}

export function highlighter(
  string: string,
  separator?: string
): JSX.Element | string {
  return (
    [
      ...string.matchAll(/(.*?)<strong>(?<highlighted>.*?)<\/strong>(.*?)/g),
    ]?.reduce(
      (acc, match) => (
        <>
          {acc}
          {match?.[1]}
          <span className={"fr-text--bold fr-text--md"}>{match?.[2]}</span>
          {match?.[3]}
          {separator || null}
        </>
      ),
      <Fragment />
    ) || string
  );
}

export function parsePublicationId(id: string): string {
  return id.replace(/^(hal|doi|nnt)/, "");
}

export const publicationTypeMapping = {
  book: "ouvrage",
  "book-chapter": "chapitre d'ouvrage",
  "book-part": "chapitre d'ouvrage",
  "book-section": "chapitre d'ouvrage",
  "book-track": "chapitre d'ouvrage",
  component: "autre",
  dataset: "autre",
  "journal-article": "article de journal",
  "journal-issue": "autre",
  lecture: "autre",
  map: "autre",
  mem: "autre",
  monograph: "ouvrage",
  multimedia: "autre",
  other: "autre",
  patent: "autre",
  "peer-review": "autre",
  "posted-content": "autre",
  poster: "autre",
  presconf: "autre",
  proceedings: "communication",
  "proceedings-article": "comunication",
  "proceedings-series": "comunication",
  "reference-book": "autre",
  "reference-entry": "autre",
  report: "autre",
  "report-series": "autre",
  software: "autre",
  standard: "autre",
  these: "these",
  video: "autre",
};
export function toString(date, time = false, isCompact = false) {
  const dateOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const timeOptions = {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  let options = dateOptions;
  if (time) options = { ...options, ...timeOptions };
  if (isCompact) options.month = "numeric";
  if (date?.length === 4) {
    delete options.month;
    delete options.day;
  } else if (date?.length === 7) {
    delete options.day;
  }
  return new Date(date).toLocaleDateString("fr-FR");
}
