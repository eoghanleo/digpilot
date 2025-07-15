interface MessageBubbleProps {
  message: {
    role: 'user' | 'assistant'
    content: string
    timestamp: Date
  }
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user'
  
  // Simple markdown-like formatting
  const formatContent = (content: string) => {
    return content
      .split('\n')
      .map((line, i) => {
        // Bold text
        line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        
        // Bullet points
        if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
          return <li key={i} className="ml-4">{line.substring(2)}</li>
        }
        
        // Headers with emojis
        if (line.includes('🛡️') || line.includes('⚠️')) {
          return <p key={i} className="font-semibold text-red-600 mt-2">{line}</p>
        }
        
        return <p key={i} className="mb-1" dangerouslySetInnerHTML={{ __html: line }} />
      })
  }

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[70%] rounded-lg px-4 py-2 ${
          isUser
            ? 'bg-blue-600 text-white'
            : 'bg-white border border-gray-200'
        }`}
      >
        <div className="whitespace-pre-wrap">{formatContent(message.content)}</div>
        <div className={`text-xs mt-1 ${isUser ? 'text-blue-100' : 'text-gray-500'}`}>
          {message.timestamp.toLocaleTimeString()}
        </div>
      </div>
    </div>
  )
}
