import { Text } from "@dataesr/dsfr-plus";
import LinkCard from "../../../../../components/link-card";

export default function AuthorAwards({ data }) {
  const awards = data?.reduce((acc, award) => {
    const exists = acc.find((a) => a.label === award.label);
    if (!exists) return [...acc, {
      label: award.label,
      years: [new Date(award.date)?.getFullYear()],
    }];
    // Add year to existing price if not already present
    // It deduplicates awards with same label and year
    return acc.map((a) => {
      if (a.label === award.label) {
        const years = [...new Set([...a.years, new Date(award.date).getFullYear()])]
          .sort((a, b) => b - a)
        return { ...a, years }
      }
      return a;
    });
  }, []);

  return (
    <>
      {awards?.sort((a, b) => b.years[0] - a.years[0])?.map((award, i) => (
        <LinkCard key={i} type="prize" icon="award-fill">
          <Text bold className="fr-mb-0" as="span" size="sm">{award.label}</Text>
          <Text className="fr-card__detail" size="sm">
            <i>
              {award.years?.filter(y => y)?.join(' — ')}
            </i>
          </Text>
        </LinkCard>
      ))
      }
    </>
  )
}