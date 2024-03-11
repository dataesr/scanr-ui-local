export const websiteURL = (id: string) => {
  switch (id) {
    case "anr":
      return {
        website: "https://anr.fr//",
        wikipedia:
          "https://fr.wikipedia.org/wiki/Agence_nationale_de_la_recherche",
      };
    case "casdar":
      return {
        website: "https://rd-agri.fr/",
        wikipedia:
          "https://fr.wikipedia.org/wiki/Compte_d%E2%80%99affectation_sp%C3%A9ciale_d%C3%A9veloppement_agricole_et_rural",
      };
    case "datainfogreffe":
      return {
        website: "https://www.infogreffe.fr/",
        wikipedia: "https://fr.wikipedia.org/wiki/Infogreffe",
      };
    case "swh":
      return {
        website: "https://www.softwareheritage.org/",
        wikipedia: "https://fr.wikipedia.org/wiki/Software_Heritage",
      };
    case "core":
      return {
        website: "https://www.open.ac.uk/",
        wikipedia: "https://fr.wikipedia.org/wiki/Open_University",
      };
    case "patstat":
      return {
        website: "https://www.epo.org/en",
        wikipedia:
          "https://fr.wikipedia.org/wiki/Office_europ%C3%A9en_des_brevets",
      };
    case "inpi":
      return {
        website: "https://www.inpi.fr/",
        wikipedia:
          "https://fr.wikipedia.org/wiki/Institut_national_de_la_propri%C3%A9t%C3%A9_industrielle",
      };
    case "hceres":
      return {
        website: "https://www.hceres.fr/fr",
        wikipedia:
          "https://fr.wikipedia.org/wiki/Haut_Conseil_de_l%27%C3%A9valuation_de_la_recherche_et_de_l%27enseignement_sup%C3%A9rieur",
      };
    case "europe":
      return {
        website: "https://commission.europa.eu/research-and-innovation_en",
        wikipedia: "https://fr.wikipedia.org/wiki/Commission_europ%C3%A9enne",
      };
    case "opendata":
      return {
        website: "https://www.enseignementsup-recherche.gouv.fr/fr",
        wikipedia:
          "https://fr.wikipedia.org/wiki/Minist%C3%A8re_de_l%27%C3%89ducation_nationale_(France)",
      };
    case "wikipedia":
      return {
        website: "https://www.wikimedia.org/",
        wikipedia: "https://fr.wikipedia.org/wiki/Fondation_Wikim%C3%A9dia",
      };
    case "hal":
      return {
        website: "https://www.ccsd.cnrs.fr/",
        wikipedia:
          "https://fr.wikipedia.org/wiki/Centre_pour_la_communication_scientifique_directe",
      };
    case "bso":
      return {
        website: "https://www.enseignementsup-recherche.gouv.fr/fr",
        wikipedia:
          "https://fr.wikipedia.org/wiki/Minist%C3%A8re_de_l%27%C3%89ducation_nationale_(France)#Direction_g%C3%A9n%C3%A9rale_de_la_Recherche_et_de_l'Innovation",
      };
    case "thesesfr":
      return {
        website: "https://abes.fr/",
        wikipedia:
          "https://fr.wikipedia.org/wiki/Agence_bibliographique_de_l%27enseignement_sup%C3%A9rieur",
      };
    case "sudoc":
      return {
        website: "https://abes.fr/",
        wikipedia:
          "https://fr.wikipedia.org/wiki/Agence_bibliographique_de_l%27enseignement_sup%C3%A9rieur",
      };
    case "cpc":
      return {
        website: "https://www.cooperativepatentclassification.org/home",
        wikipedia:
          "https://en.wikipedia.org/wiki/Cooperative_Patent_Classification",
      };
    case "unpaywall":
      return {
        website: "https://ourresearch.org/",
        wikipedia: "https://en.wikipedia.org/wiki/OurResearch",
      };
    case "phc":
      return {
        website: "https://www.campusfrance.org/fr",
        wikipedia: "https://fr.wikipedia.org/wiki/Campus_France",
      };
    case "doi":
      return {
        website: "https://www.doi.org/",
        wikipedia: "https://fr.wikipedia.org/wiki/Digital_Object_Identifier",
      };
    case "grid":
      return {
        website: "https://www.digital-science.com/",
        wikipedia: "https://fr.wikipedia.org/wiki/Crossref",
      };
    case "idref":
      return {
        website: "https://abes.fr/",
        wikipedia:
          "https://fr.wikipedia.org/wiki/Agence_bibliographique_de_l%27enseignement_sup%C3%A9rieur",
      };
    case "insee":
      return {
        website: "https://www.insee.fr/fr/accueil",
        wikipedia:
          "https://fr.wikipedia.org/wiki/Institut_national_de_la_statistique_et_des_%C3%A9tudes_%C3%A9conomiques",
      };
    case "orcid":
      return {
        website: "https://www.orcid.org/",
        wikipedia: "https://fr.wikipedia.org/wiki/ORCID",
      };
    case "rnsr":
      return {
        website: "https://www.enseignementsup-recherche.gouv.fr/fr",
        wikipedia:
          "https://fr.wikipedia.org/wiki/Minist%C3%A8re_de_l%27Enseignement_sup%C3%A9rieur_et_de_la_Recherche",
      };
    case "wikidata":
      return {
        website: "https://www.wikimedia.org/",
        wikipedia: "https://fr.wikipedia.org/wiki/Fondation_Wikim%C3%A9dia",
      };
    default:
      return {
        website: "",
        wikipedia: "",
      };
  }
};
