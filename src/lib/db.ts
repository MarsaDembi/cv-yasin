import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

export type Comment = {
  name: string;
  email: string;
  message: string;
  rating: number; // ✅ tambahkan ini
  createdAt: string;
};


type Rating = {
  score: number;
  createdAt: string;
};

type Data = {
  comments: Comment[];
  ratings: Rating[];
};

const adapter = new JSONFile<Data>('src/data/comments.json');
export const db = new Low<Data>(adapter, { comments: [], ratings: [] });

// Komentar
export async function writeComment(comment: Comment) {
  await db.read();
  db.data ||= { comments: [], ratings: [] };
  db.data.comments.push(comment);
  await db.write();
}

export async function readComments(): Promise<Comment[]> {
  await db.read();
  db.data ||= { comments: [], ratings: [] };
  return db.data.comments;
}

// Rating
export async function writeRating(score: number) {
  await db.read();
  db.data ||= { comments: [], ratings: [] };
  db.data.ratings.push({
    score,
    createdAt: new Date().toISOString(),
  });
  await db.write();
}

export async function readRatings(): Promise<Rating[]> {
  await db.read();
  db.data ||= { comments: [], ratings: [] };
  return db.data.ratings;
}

console.log('Available exports from db.ts:', {
  writeComment,
  readComments,
  writeRating,
  readRatings,
});
