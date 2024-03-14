import { Text } from "@dataesr/dsfr-plus";
import LinkCard from "../../../../../components/link-card";
import { OrganizationAwardsData } from "../../../../../types/organization";

export default function OrganizationAwards({ awards }: { awards: OrganizationAwardsData[] }) {
  return (
    <>
      {awards?.sort((a, b) => b.year - a.year)?.map((award, i) => (
        <LinkCard key={i} type="prize" icon="award-fill">
          <Text bold className="fr-mb-0" size="sm">
            {award.label}
          </Text>
          <Text className="fr-mb-0 fr-text-mention-grey" size="xs">
            {award.domain?.label}
          </Text>
          <Text className="fr-mb-0 fr-text-mention-grey" size="sm">
            <i>
              {award.year}
            </i>
          </Text>
        </LinkCard>
      ))
      }
    </>
  )
}