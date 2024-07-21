import type { db as DatabaseType } from '@/server/db/index';
import { getRandomNumber } from '@/utils/get-random-number';
import { post } from '../schema/index';
import posts from './data/post.json';

export default async function seed(db: typeof DatabaseType) {
  const users = await db.query.user.findMany();

  await Promise.all(
    users.map(async (user) => {
      const postIndex = getRandomNumber(0, posts);

      await db.insert(post).values({
        userId: user.id,
        name: posts[postIndex]!.name ?? 'no seed data for posts',
      });
    }),
  );
}
