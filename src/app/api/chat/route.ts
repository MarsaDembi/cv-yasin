// src/app/api/chat/route.ts

import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Pastikan Anda menambahkan API key OpenAI di environment variables
});

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: 'No message provided' }, { status: 400 });
    }

    // Simulasi respon bot jika terjadi error atau tidak bisa mengakses OpenAI
    const botReplies = [
      "Halo! Ada yang bisa saya bantu?",
      "Bisa dijelaskan lebih detail?",
      "Wah, menarik! 👀",
      "Coba ulangi dengan cara berbeda, ya.",
      "Saya masih belajar, tapi saya akan bantu semaksimal mungkin!"
    ];

    // Menggunakan OpenAI API untuk mendapatkan balasan pintar
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: message }],
      });

      const botReply = response.choices[0].message.content;
      return NextResponse.json({ reply: botReply });

    } catch (error) {
      console.error('OpenAI API Error:', error);
      
      // Jika OpenAI gagal, memberikan balasan acak
      const randomReply = botReplies[Math.floor(Math.random() * botReplies.length)];
      return NextResponse.json({ reply: randomReply });
    }

  } catch (error) {
    console.error('General Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
