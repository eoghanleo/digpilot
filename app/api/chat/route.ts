import { NextRequest, NextResponse } from 'next/server'
import { searchSnowflake, embedText } from '@/lib/snowflake'
import { generateResponse } from '@/lib/groq'
import { getSystemPrompt, formatResponseWithSafety } from '@/lib/prompts'

export async function POST(request: NextRequest) {
  try {
    const { message, property_id, history } = await request.json()
    
    // 1. Process question (enrichment)
    const enrichedQuestion = `Equipment inquiry for Plant Hire #${property_id}: ${message}`
    
    // 2. Embed the question
    const embedding = await embedText(enrichedQuestion)
    
    // 3. Retrieve from Snowflake (dual retrieval)
    const safetyResults = await searchSnowflake(embedding, property_id, 'safety')
    const operationalResults = await searchSnowflake(embedding, property_id, 'operational')
    
    // 4. Combine results
    const allResults = [...safetyResults, ...operationalResults]
    
    if (allResults.length === 0) {
      return NextResponse.json({
        response: "I don't have specific information about that equipment. Please contact your equipment supplier or safety officer for assistance."
      })
    }
    
    // 5. Build context
    const context = buildContext(safetyResults, operationalResults)
    
    // 6. Generate response with Groq
    const systemPrompt = getSystemPrompt(property_id)
    const response = await generateResponse(systemPrompt, message, context)
    
    // 7. Format with safety first
    const formattedResponse = formatResponseWithSafety(
      response, 
      safetyResults.map(r => r.snippet),
      operationalResults.map(r => r.snippet),
      message
    )
    
    return NextResponse.json({
      response: formattedResponse,
      chunks_retrieved: allResults.length
    })
    
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Failed to process chat request' },
      { status: 500 }
    )
  }
}

function buildContext(safetyResults: any[], operationalResults: any[]): string {
  let context = "Equipment Information:\n"
  
  if (safetyResults.length > 0) {
    context += "\n[SAFETY INFORMATION]:\n"
    safetyResults.forEach(result => {
      context += `${result.snippet}\n`
    })
  }
  
  if (operationalResults.length > 0) {
    context += "\n[OPERATIONAL INFORMATION]:\n"
    operationalResults.forEach(result => {
      context += `${result.snippet}\n`
    })
  }
  
  return context
}
