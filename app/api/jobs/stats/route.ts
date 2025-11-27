import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_API_URL || 'https://jobboardaggregator-production.up.railway.app';
const BACKEND_TOKEN = process.env.BACKEND_API_TOKEN;

export async function GET() {
  try {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (BACKEND_TOKEN) {
      headers['Authorization'] = `Bearer ${BACKEND_TOKEN}`;
    }

    const response = await fetch(
      `${BACKEND_URL}/server/stats`,
      {
        method: 'GET',
        headers,
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      return NextResponse.json(
        { error: errorData.error || 'Backend request failed' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error('Stats fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
