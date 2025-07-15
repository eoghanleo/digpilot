'use client'

import { useState } from 'react'
import ChatInterface from '@/components/ChatInterface'

export default function ChatPage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4">
      <div className="w-full max-w-4xl">
        <ChatInterface />
      </div>
    </main>
  )
}
