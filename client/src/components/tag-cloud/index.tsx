import { BadgeGroup, Badge } from "@dataesr/dsfr-plus";
import { Aggregation } from "../../api/types/commons";
import './styles.scss';

export type Order = 'desc' | 'asc' | 'random';

const weightCalculatorHelpers = (bucket: Aggregation[]): [number, number] => {
  const maxCount = Math.max(...bucket.map((element) => element.count));
  const minCount = Math.min(...bucket.map((element) => element.count));
  const range = maxCount - minCount;
  return [minCount, range];
};

const sortFn = (order) => (array) => {
  const fn = {
    desc: () => array.sort((a, b) => b.weight - a.weight),
    asc: () => array.sort((a, b) => a.weight - b.weight),
    random: () => array.map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)
  }
  return fn[order]();
}

export default function TagCloud({ data, order = 'random' }: { data: Aggregation[], order?: Order }) {
  if (!data || !data.length) return null;

  const [minCount, range] = weightCalculatorHelpers(data);
  const tags = data.map((element) => ({
    ...element,
    weight: Math.round(((element.count - minCount) / range) * 4 + 1) || 1,
  }));
  const sortedTags = sortFn(order)(tags);

  return (
    <BadgeGroup className="cloud">
      {sortedTags.map((element) => (
        <Badge
          as="a"
          data-weight={element.weight}
          className="tag-cloud"
          key={element.value}
          size="sm"
          color="blue-cumulus"
          href={`/search/publications?q=${element.value}`}
        >
          {element.value}
          {/* <span className="fr-tooltip fr-placement" id={`tooltip-${element.value}-${element.weight}`} role="tooltip" aria-hidden="true">
            {element.count > 1 ? 'résultats' : 'résultat'}
          </span> */}
        </Badge>
      ))}
    </BadgeGroup>
  )
}