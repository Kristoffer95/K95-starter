import type { db as DatabaseType } from '@/server/db/index';
import { post } from '../schema/index';
import data from './data/post.json';

export default async function seed(db: typeof DatabaseType) {
  await db.insert(post).values(data);
}
