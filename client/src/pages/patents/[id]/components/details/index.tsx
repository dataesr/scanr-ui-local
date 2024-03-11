import { Patent } from "../../../../../types/patent";

export default function PatentDetail({ data }: { data: Patent }) {
  const numPatents = data.patents.length;
  const numDomains = data.domains.length;
  const numAuthors = data.authors.length;

  const authorRoles = data.authors.map((author) => {
    if (author.rolePatent && author.rolePatent.length > 0) {
      return author.rolePatent[0].role === "dep" ? "Déposant" : "Inventeur";
    }
    return "Auteur";
  });

  const numDepositors = authorRoles.filter(
    (role) => role === "Déposant"
  ).length;
  const numInventors = authorRoles.filter(
    (role) => role === "Inventeur"
  ).length;

  return (
    <div>
      <p>
        {`${numPatents} brevets, ${numDomains} domaines différents, ${numAuthors} auteurs dont `}
        {numDepositors > 0 && (
          <span className="badge">{`${numDepositors} déposant(s)`}</span>
        )}
        {numDepositors > 0 && numInventors > 0 && <span> et </span>}
        {numInventors > 0 && (
          <span className="badge">{`${numInventors} inventeur(s)`}</span>
        )}
      </p>
    </div>
  );
}
