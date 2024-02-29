const FIELDS = [
  'publications.title.default',
  'publications.keywords.default',
  'projects.label.en',
  'projects.label.default',
  // TODO: Add websites.text.default
]

export const getMatchPhrases = (kwords) => kwords.reduce((acc, keyword) => ([
  ...acc, 
  ...FIELDS.map((field) => ({ match_phrase: { [field]: `"${keyword}"` } }))
]), []);