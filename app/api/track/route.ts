import { NextResponse } from "next/server";

/**
 * This mocks a call to a hypothetical back-end API. It is important that the tracking event is:
 * - Persisted
 * - Contains the necessary information to create valuable insights later on for ad purchasers
 */
export async function POST(request: Request) {
  const { advertiser, userId, type } = await request.json();
  try {
    console.log(
      `Tracking advertisement ${JSON.stringify(
        advertiser
      )} for user ${userId} of type ${type}`
    );
    return NextResponse.json(null);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
