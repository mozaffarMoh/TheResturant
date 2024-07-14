import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'Hello, Worlsdfsdfd!' });
}

export async function POST(req: any, res: any) {
  try {
    const response = await fetch(
      'https://649eba81245f077f3e9ccfe1.mockapi.io/api/v1/users',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body),
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();
    res.status(200).json(responseData);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
