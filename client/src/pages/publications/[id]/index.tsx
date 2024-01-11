import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { RawIntlProvider, createIntl } from "react-intl";
import { Breadcrumb, Container, Link, useDSFRConfig } from "@dataesr/dsfr-plus";
import { getPublicationById } from "../../../api/publications";
import These from "./components/these";
import Publication from "./components/publication";
import PublicationSkeleton from "./components/skeleton";
import BaseSkeleton from "../../../components/skeleton/base-skeleton";
import Error500 from "../../../components/errors/error-500";

const modules = import.meta.glob('./locales/*.json', { eager: true, import: 'default' })

const messages = Object.keys(modules).reduce((acc, key) => {
  const locale = key.match(/\.\/locales\/(.+)\.json$/)?.[1];
  if (locale) {
    return { ...acc, [locale]: modules[key] }
  }
  return acc;
}, {});



export default function Production() {
  const { locale } = useDSFRConfig();
  const intl = createIntl({ locale, messages: messages[locale] })
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["publication", id],
    queryFn: () => getPublicationById(id),
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });


  if (isError) return <Error500 />;

  return (
    <RawIntlProvider value={intl}>
      <Container>
        <Breadcrumb>
          <Link href="/">{intl.formatMessage({ id: "publications.breadcrumb.home" })}</Link>
          <Link href="/search/publications">
            {intl.formatMessage({ id: "publications.breadcrumb.search" })}
          </Link>
          <Link current>
            {data?.title?.default?.slice(0, 80)}
            {data?.title?.default?.length > 80 ? " ..." : ""}
            {!data?.title?.default && (
              <BaseSkeleton width="180px" height="1rem" />
            )}
          </Link>
        </Breadcrumb>
        {isLoading || !data ? (
          <PublicationSkeleton />
        ) : data?.productionType === "thesis" ? (
          <These data={data} />
        ) : (
          <Publication data={data} />
        )}
      </Container>
    </RawIntlProvider>
  );
}