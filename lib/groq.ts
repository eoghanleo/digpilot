import Groq from 'groq-sdk'

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
})

export async function generateResponse(
  systemPrompt: string,
  userMessage: string,
  context: string
): Promise<string> {
  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a helpful, knowledgeable plant hire equipment expert. Answer only using the provided context. Keep responses clear, professional, and safety-focused. Maximum 300 words. Always format lists with * symbols and use proper line breaks."
        },
        {
          role: "user",
          content: `Equipment Operator: ${userMessage}\n\n${context}\n\nBased on the equipment information above, please answer the operator's question.`
        }
      ],
      model: "llama3-70b-8192",
      temperature: 0.3,
      max_tokens: 500,
      top_p: 0.9
    })
    
    return completion.choices[0]?.message?.content || "I couldn't generate a response."
  } catch (error) {
    console.error('Groq API error:', error)
    throw error
  }
}
