import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_API_URL || 'https://jobboardaggregator-production.up.railway.app';

export async function GET() {
  try {
    // Check backend health
    const backendResponse = await fetch(`${BACKEND_URL}/health`, {
      method: 'GET',
    }).catch(() => null);

    const backendHealthy = backendResponse?.ok ?? false;

    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      backend: {
        url: BACKEND_URL,
        healthy: backendHealthy,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: 'unhealthy',
        error: 'Health check failed',
      },
      { status: 500 }
    );
  }
}
