import { NextResponse } from 'next/server'

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://music-copilot-n76h.onrender.com"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const response = await fetch(`${API_URL}/api/brand-identity`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      throw new Error('Failed to fetch brand identity')
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to process request' },
      { status: 500 }
    )
  }
}