import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { token } = await request.json();

    const verificationResponse = await fetch(
      'https://www.google.com/recaptcha/api/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
      }
    );

    const verificationResult = await verificationResponse.json();
    
    // For v3, check the score (0.0 to 1.0, where 1.0 is very likely a good interaction)
    const isHuman = verificationResult.success && verificationResult.score > 0.5;
    
    return NextResponse.json({
      success: isHuman,
      score: verificationResult.score,
      timestamp: verificationResult.challenge_ts,
      hostname: verificationResult.hostname,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to verify reCAPTCHA', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}