import { useQuery } from "@tanstack/react-query";
import { createIntl } from "react-intl";
import { Notice, Text, useDSFRConfig } from "@dataesr/dsfr-plus";
import SearchResultListSkeleton from "../skeleton/search-result-list-skeleton";
import PublicationItem from "../../pages/search/components/publications/publication-item";
import { getMoreOrganizationsLikeThis, getMorePublicationsLikeThis } from "./api";
import OrganizationItem from "../../pages/search/components/organizations/organization-item";

const modules = import.meta.glob('./locales/*.json', { eager: true, import: 'default' })
const messages = Object.keys(modules).reduce((acc, key) => {
  const locale = key.match(/\.\/locales\/(.+)\.json$/)?.[1];
  if (locale) {
    return { ...acc, [locale]: modules[key] }
  }
  return acc;
}, {});

const API_MAPPER = {
  organizations: {
    item: OrganizationItem,
    fn: getMoreOrganizationsLikeThis
  },
  publications: {
    item: PublicationItem,
    fn: getMorePublicationsLikeThis
  },

}


export default function MoreLikeThis({ id, api }: { id: string, api: "organizations" | "publications" }) {
  const { locale } = useDSFRConfig();
  const intl = createIntl({ locale, messages: messages[locale] })
  const Component = API_MAPPER[api].item;
  const { data: moreLikeThis, isLoading, isError } = useQuery({
    queryKey: ["moreLike", api, id],
    queryFn: () => API_MAPPER[api].fn(id),
  });

  if (isError) return (
    <Notice closeMode="disallow" type="error">
      {intl.formatMessage({ id: "more-like-this.error" })}
    </Notice>
  );
  if (isLoading) return <SearchResultListSkeleton size={3} />;

  return (
    <>
      {moreLikeThis?.length ? (
        <div className="result-list">
          {moreLikeThis?.map((like) => (
            <Component data={like} key={like.id} />
          ))}
        </div>
      ) : <Text className="fr-card__detail fr-text--md">{intl.formatMessage({ id: "more-like-this.empty" })}</Text>}
    </>
  )
}