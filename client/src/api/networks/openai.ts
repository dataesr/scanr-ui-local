import OpenAI from "openai"

const openai = new OpenAI({ apiKey: "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", dangerouslyAllowBrowser: true })

export default async function askOpenAI(message: string): Promise<string> {
  // console.log("OPENAI ask", message)
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant that will responde with the answer of the question only without punctuation.",
      },
      { role: "user", content: message },
    ],
    model: "gpt-3.5-turbo-0125",
  })

  const answer: string = completion.choices[0].message.content
  return answer
}
