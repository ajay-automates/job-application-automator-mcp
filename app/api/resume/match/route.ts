import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_API_URL || 'https://jobboardaggregator-production.up.railway.app';
const BACKEND_TOKEN = process.env.BACKEND_API_TOKEN;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // Forward the request to the Job Board Aggregator backend
    const backendFormData = new FormData();

    const file = formData.get('file') as File;
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    backendFormData.append('file', file);

    // Add optional parameters
    const keywords = formData.get('keywords');
    const location = formData.get('location');
    const startDate = formData.get('start_date');
    const endDate = formData.get('end_date');
    const sortBy = formData.get('sort_by');
    const userExperience = formData.get('user_experience');

    if (keywords) backendFormData.append('keywords', keywords as string);
    if (location) backendFormData.append('location', location as string);
    if (startDate) backendFormData.append('start_date', startDate as string);
    if (endDate) backendFormData.append('end_date', endDate as string);
    if (sortBy) backendFormData.append('sort_by', sortBy as string);
    if (userExperience) backendFormData.append('user_experience', userExperience as string);

    const headers: HeadersInit = {};
    if (BACKEND_TOKEN) {
      headers['Authorization'] = `Bearer ${BACKEND_TOKEN}`;
    }

    const response = await fetch(
      `${BACKEND_URL}/server/match-resume-upload`,
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
    console.error('Resume match error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
