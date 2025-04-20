// src/app/api/comments/route.ts
import { NextResponse } from 'next/server';
import { writeComment, readComments } from '@/lib/comments';


export async function POST(req: Request) {
  try {
    const { name, email, message, rating } = await req.json();

    const newComment = {
      name,
      email,
      message,
      rating,
      createdAt: new Date().toISOString(),
    };

    await writeComment(newComment);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('POST error:', err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export async function GET() {
  try {
    const comments = await readComments();
    const averageRating =
      comments.reduce((acc, c) => acc + (c.rating || 0), 0) / comments.length || 0;

    return NextResponse.json({ comments, averageRating });
  } catch (err) {
    console.error('GET error:', err);
    return NextResponse.json({ comments: [], averageRating: 0 }, { status: 500 });
  }
}
