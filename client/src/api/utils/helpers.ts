import { fillWithMissingYears } from "./years";

export function toAggregationModel(data, isYears = false) {
  const result = data.map((element) => ({
    value: element.key,
    label: element.key,
    count: element.doc_count,
  })) || [];
  if (isYears) {
    return result.sort((a, b) => a.label - b.label).reduce(fillWithMissingYears, []);
  }
  return result;
}