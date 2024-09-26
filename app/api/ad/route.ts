import { NextResponse } from "next/server";
import { determineCategory } from "./category";
import { getAdvertiserInfo as getAdvertiser } from "./ad";

export async function POST(request: Request) {
  const { question } = await request.json();

  try {
    const categoryId = determineCategory(question);
    const advertiser = getAdvertiser(categoryId);
    if (!advertiser)
      return NextResponse.json(
        { error: "Unable to find advertiser" },
        { status: 404 }
      );
    return NextResponse.json(advertiser);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
