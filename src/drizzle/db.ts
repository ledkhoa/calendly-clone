import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/better-sqlite3';

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql);
