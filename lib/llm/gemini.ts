import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function streamGemini(messages: { role: string; content: string }[]) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" })

  const prompt = messages
    .map(m => `${m.role}: ${m.content}`)
    .join("\n")

  const result = await model.generateContentStream(prompt)

  return new ReadableStream({
    async start(controller) {
      for await (const chunk of result.stream) {
        const text = chunk.text()
        if (text) controller.enqueue(text)
      }
      controller.close()
    },
  })
}
