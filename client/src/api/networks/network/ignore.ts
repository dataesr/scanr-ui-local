export const ignoreIds = {
  domains: [
    "Q3526257", // Thèse d'exercice
    "Q913404", // Thèse d'exercice de médecine
    "Q669220", // Not available
  ],
}

export const institutionsAcronyms = {
  "180089013": "CNRS",
  "180036048": "INSERM",
  "775685019": "CEA",
  "180006025": "IRD",
  "180070039": "INRAE",
  "180089047": "INRIA",
  "775665912": "CNES",
  "330715368": "IFREMER",
  "193112562": "ENAC",
  "195922846R": "BRGM",
  "775722879": "ONERA",
  "775688229": "CSTB",
  "331596270": "CIRAD",
  "202224326A": "INED",
  "385290309": "ADEME",
}

const institutionsShort = {
  "communauté d'universités et établissements": "COMUE",
  "communauté d'universités et d'établissements": "COMUE",
  "centre hospitalier régional universitaire": "CHRU",
  "centre hospitalier et universitaire": "CHU",
  "centre hospitalier universitaire": "CHU",
  "centre hospitalier régional": "CHR",
  "centre hospitalier": "CH",
  université: "Univ.",
  universite: "Univ.",
  university: "Univ.",
  institute: "Inst.",
  institut: "Inst.",
}

function adjustCase(match: string, replacement: string) {
  if (match === match.toUpperCase()) {
    return replacement.toUpperCase()
  } else if (match === match.toLowerCase()) {
    return replacement.toLowerCase()
  } else {
    return replacement
  }
}

export function institutionsReplaceLabel(label: string) {
  Object.entries(institutionsShort).forEach(([key, value]) => {
    const regex = new RegExp(key, "gi")
    label = label.replace(regex, (match) => adjustCase(match, value))
  })
  return label
}
