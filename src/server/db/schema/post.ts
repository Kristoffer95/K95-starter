// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations, sql } from 'drizzle-orm';
import {
  index,
  pgTable,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import user from './next-auth/user';

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */

const post = pgTable(
  'post',
  {
    id: varchar('id', { length: 255 })
      .default(sql`gen_random_uuid()`)
      .notNull()
      .primaryKey()
      .unique(),
    userId: varchar('user_id').references(() => user.id),
    name: varchar('name', { length: 256 }),
    createdAt: timestamp('created_at', { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (example) => ({
    nameIndex: index('name_idx').on(example.name),
  }),
);

export const postRelations = relations(post, ({ one }) => ({
  user: one(user, {
    fields: [post.id],
    references: [user.id],
  }),
}));

export default post;
