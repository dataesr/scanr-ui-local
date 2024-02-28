// import OpenAI from "openai"

// const openai = new OpenAI({ apiKey: "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", dangerouslyAllowBrowser: true })

// export async function openAiLabelsFromDomains(query: string, domains: any): Promise<string> {
//   const completion = await openai.chat.completions.create({
//     messages: [
//       {
//         role: "system",
//         content: "You are a helpful assistant that will help me name clusters from a network of research publications.",
//       },
//       {
//         role: "system",
//         content: "I will give you several list of concepts. Each list correspond to a single cluster.",
//       },
//       {
//         role: "system",
//         content: "Your objective is to choose the best name for each cluster according to its concepts list.",
//       },
//       {
//         role: "system",
//         content:
//           "Each cluster name should be unique, without punctuation, not equal to the network topic and should not exceed three words.",
//       },
//       {
//         role: "system",
//         content: "You will output JSON.",
//       },
//       {
//         role: "user",
//         content: `My network topic is "${query}". Please name the clusters that are defined by the following lists of concepts: ${domains}`,
//       },
//     ],
//     model: "gpt-3.5-turbo-0125",
//     response_format: { type: "json_object" },
//     seed: 42,
//   })

//   const answer: string = completion.choices[0].message.content
//   return answer
// }

// export async function openAiLabeledClusters(query:string, clusters: Array<any>) {

//     const prefix = "cluster"
//     const domains = clusters?.reduce((acc, cluster, index) => {
//       return cluster?.aggs?.domains ? acc + `${prefix}${index} = [${cluster.aggs.domains}], ` : acc
//     }, "")
    
//     if (!domains) return clusters

//     const labels = await openAiLabelsFromDomains(query, domains).then((response) => JSON.parse(response))
//     console.log("labels", labels)

//     Object.entries(labels).forEach(([cluster, value]) => {
//       const index = Number(cluster.slice(prefix.length))
//       clusters[index].label = value
//     })

//     return clusters
// }

// export async function openAiAsk(message: string): Promise<string> {
//   // console.log("OPENAI ask", message)
//   const completion = await openai.chat.completions.create({
//     messages: [
//       {
//         role: "system",
//         content: "You are a helpful assistant that will responde with the answer of the question only without punctuation.",
//       },
//       { role: "user", content: message },
//     ],
//     model: "gpt-3.5-turbo-0125",
//   })

//   const answer: string = completion.choices[0].message.content
//   return answer
// }
