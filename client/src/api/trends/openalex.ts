import openAlexData from "./openalex_topic_mapping_table.json"

const fieldsMapping = {
  topic: ["subfield", "field", "domain"],
  subfield: ["field", "domain"],
  field: ["domain"],
  domain: [],
}

function openAlexGetTable(indexField: string) {
  const openAlexTable = openAlexData.reduce((acc, row) => {
    acc[row[indexField]] = row
    return acc
  }, {})
  return openAlexTable
}

export default function openAlexGetData(field: string, value: string | number) {
  const openAlexTable = openAlexGetTable(`${field}_name`)
  const allData = openAlexTable[value]
  const fields = fieldsMapping[field]

  if (!allData) return {}

  const data = {
    ...fields.reduce((acc, field: string) => {
      acc[field] = {
        label: allData[`${field}_name`],
        id: allData[`${field}_id`],
      }
      return acc
    }, {}),
  }

  return data
}
