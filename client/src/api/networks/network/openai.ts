import MistralClient, { ResponseFormats } from "@mistralai/mistralai"
import { NetworkCommunities } from "../../../types/network"

const ENABLED = false

async function mistralLabelsFromDomains(domains: string): Promise<string> {
  const { VITE_MISTRAL_API_KEY } = import.meta.env

  if (!VITE_MISTRAL_API_KEY) {
    throw new Error("Mistral error: bad api key")
  }

  const mistral = new MistralClient(VITE_MISTRAL_API_KEY)
  const completion = await mistral.chat({
    messages: [
      {
        role: "user",
        content: `
        You have been tasked with naming distinct fields of study for several communities of research publications.
        Below are lists of topics representing each community.
        Your goal is to provide a unique and descriptive name for each field of study that best encapsulates the essence of the topics within that community.
        Each name should be unique and as short as possible.
        Output as JSON object with the list number and the single generated name.

        ${domains}`,
      },
    ],
    model: "open-mistral-7b",
    temperature: 0.3,
    responseFormat: { type: "json_object" as ResponseFormats },
    randomSeed: 42,
  })

  console.log("mistral_completion", completion)
  const answer: string = completion.choices[0].message.content
  return answer
}

export async function openAiLabeledClusters(clusters: NetworkCommunities): Promise<NetworkCommunities> {
  if (!ENABLED) return clusters

  const prefix = "list"
  const domains = clusters?.reduce((acc, cluster, index) => {
    if (cluster?.domains) {
      const topDomains = Object.entries(cluster.domains)
        .sort((a: [string, number], b: [string, number]) => b[1] - a[1])
        .slice(0, 10)
        .map(([domain]) => `${domain}`)
        .join(", ")

      acc = acc + `${prefix}${index + 1} = [${topDomains}], `
    }
    return acc
  }, "") as string
  console.log("domains", domains)

  if (!domains) return clusters

  const mistral_labels = await mistralLabelsFromDomains(domains).then(
    (response) => JSON.parse(response),
    (err) => console.log(err)
  )
  console.log("mistral_labels", mistral_labels)
  if (!mistral_labels || mistral_labels.constructor != Object) {
    return clusters
  }

  Object.entries(mistral_labels).forEach((entries, index) => {
    const value = entries[1]
    clusters[index].label = Array.isArray(value) ? value[0] : value
  })

  return clusters
}
