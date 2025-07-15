export function getSystemPrompt(propertyId: number): string {
  return JSON.stringify({
    role: "system",
    content: {
      persona: "helpful, knowledgeable plant hire equipment expert",
      tone: "clear, professional, safety-focused",
      focus_rule: "Answer only the most recent equipment inquiry",
      strict_context_rule: "You MUST ONLY answer using the provided context. If the answer is not present, reply: 'I'm sorry, I don't have that information in the equipment documentation.'",
      response_constraints: {
        format: "plain text only",
        length_limit: "max 300 words",
        no_hallucination: "Only use information from the provided context",
        safety_first: "Always prioritize safety information when relevant",
        formatting: "Always format lists as bullet points with * symbols"
      }
    }
  })
}

export function formatResponseWithSafety(
  response: string,
  safetySnippets: string[],
  operationalSnippets: string[],
  question: string
): string {
  const parts: string[] = []
  
  // Check for safety relevance
  if (safetySnippets.length > 0) {
    parts.push("🛡️ **SAFETY FIRST:**")
    parts.push("⚠️ Please follow all safety procedures for this equipment.")
    parts.push("")
  }
  
  // Add main response
  parts.push(response)
  
  return parts.join('\n')
}
