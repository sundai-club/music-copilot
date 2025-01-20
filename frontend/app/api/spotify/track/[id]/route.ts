import { NextResponse } from "next/server"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const trackId = params.id
    if (!trackId) {
      return NextResponse.json(
        { error: "Track ID is required" },
        { status: 400 }
      )
    }

    const response = await fetch(`${API_URL}/api/spotify/track/${trackId}`)
    if (!response.ok) {
      throw new Error("Failed to fetch track details")
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching track details:", error)
    return NextResponse.json(
      { error: "Failed to fetch track details" },
      { status: 500 }
    )
  }
} 