import { Text } from "@dataesr/dsfr-plus";
import LinkCard from "../../../../../components/link-card";
import { OrganizationAgreementsData } from "../../../../../types/organization";

export default function OrganizationAgreements({ agreements }: { agreements: OrganizationAgreementsData[] }) {
  return (
    <>
      {agreements?.sort((a, b) => b.years[0] - a.years[0])?.map((agreement, i) => (
        <LinkCard key={i} type="prize" icon="bookmark-fill">
          <Text bold className="fr-mb-0" size="sm">
            {agreement.type}
            {' – '}
            <Text className="fr-mb-0 fr-text-mention-grey" as="span" size="xs">
              {agreement.label}
            </Text>

          </Text>
          <Text className="fr-mb-0 fr-text-mention-grey" size="sm">
            <i>
              {agreement.years?.filter(y => y)?.join(' – ')}
            </i>
          </Text>
        </LinkCard>
      ))
      }
    </>
  )
}