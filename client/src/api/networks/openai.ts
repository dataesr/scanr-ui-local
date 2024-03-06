import OpenAI from "openai"

const ENABLED = false
const openai = new OpenAI({ apiKey: "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", dangerouslyAllowBrowser: true })

export async function openAiLabelsFromDomains(query: string, domains: any): Promise<string> {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `You are an assistant tasked with naming clusters derived from a network of research publications linked to the query "${query}". \
        I will provide you with several lists of concepts, with each list corresponding to a single cluster. \
        Your goal is to generate the most suitable name for each cluster based on its concepts list. \
        Each cluster name should be unique, consist only of English words, be devoid of punctuation, and not exceed three words. \
        Your output should be in JSON format.`,
      },
      {
        role: "user",
        content: `Please name the clusters that are defined by the following lists of concepts: ${domains}`,
      },
    ],
    model: "gpt-3.5-turbo",
    response_format: { type: "json_object" },
    seed: 42,
  })

  const answer: string = completion.choices[0].message.content
  return answer
}

export async function openAiLabeledClusters(query: string, clusters: Array<any>) {
  if (!ENABLED) return clusters

  const prefix = "cluster"
  console.log("clusters", clusters)
  const domains = clusters?.reduce((acc, cluster, index) => {
    if (cluster?.domains) {
      const topDomains = Object.entries(cluster.domains)
        .sort((a: [string, number], b: [string, number]) => b[1] - a[1])
        .slice(0, 10)
        .map(([domain]) => `${domain}`)
        .join(", ")

      acc = acc + `${prefix}${index} = [${topDomains}], `
    }
    return acc
  }, "")
  console.log("domains", domains)

  if (!domains) return clusters

  const labels = await openAiLabelsFromDomains(query, domains).then((response) => JSON.parse(response))
  console.log("labels", labels)

  Object.entries(labels).forEach(([cluster, value]) => {
    const index = Number(cluster.slice(prefix.length))
    clusters[index].label = value
  })

  return clusters
}