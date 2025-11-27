import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_API_URL || 'https://jobboardaggregator-production.up.railway.app';
const BACKEND_TOKEN = process.env.BACKEND_API_TOKEN;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    const backendFormData = new FormData();
    backendFormData.append('file', file);

    const headers: HeadersInit = {};
    if (BACKEND_TOKEN) {
      headers['Authorization'] = `Bearer ${BACKEND_TOKEN}`;
    }

    const response = await fetch(
      `${BACKEND_URL}/server/parse-resume`,
      {
        method: 'POST',
        headers,
        body: backendFormData,
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
    console.error('Resume parse error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
