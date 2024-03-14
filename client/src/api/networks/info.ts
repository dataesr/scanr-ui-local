import { NetworkInfo } from "../../types/network"

export default function infoCreate(query: string, model: string): NetworkInfo {
  const title = `Co-${model} network `
  const description =
    query === "*"
      ? `This is a visualization of a ${model} network from all scientific publications.`
      : `This is a visualization of a ${model} network from scientific publications related to "${query}".`

  return { title: title, description: description }
}
