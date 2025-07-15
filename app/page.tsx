import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="max-w-2xl w-full">
        <h1 className="text-4xl font-bold text-center mb-8">
          🚜 Plant Hire Equipment Assistant
        </h1>
        <p className="text-center text-gray-600 mb-12">
          Equipment #{process.env.DEFAULT_PROPERTY_ID}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/chat"
            className="bg-blue-500 hover:bg-blue-600 text-white p-8 rounded-lg text-center transition-colors"
          >
            <div className="text-3xl mb-2">💬</div>
            <h2 className="text-xl font-semibold">Equipment Chat</h2>
            <p className="mt-2 text-sm opacity-90">
              Ask questions about operation, troubleshooting, and maintenance
            </p>
          </Link>
          
          <a
            href="https://your-jotform-link.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-orange-500 hover:bg-orange-600 text-white p-8 rounded-lg text-center transition-colors"
          >
            <div className="text-3xl mb-2">📋</div>
            <h2 className="text-xl font-semibold">Safety Checklist</h2>
            <p className="mt-2 text-sm opacity-90">
              Complete daily pre-start safety inspection
            </p>
          </a>
        </div>
      </div>
    </main>
  )
}

