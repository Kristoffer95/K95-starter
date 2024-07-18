import { relations, sql } from 'drizzle-orm'
import { pgTable, timestamp, varchar } from 'drizzle-orm/pg-core'
import account from './account'
// import cart from "../cart";
// import storeUsers from "../store-users";

const user = pgTable('user', {
  id: varchar('id', { length: 255 })
    .default(sql`gen_random_uuid()`)
    .notNull()
    .primaryKey()
    .unique(),
  name: varchar('name', { length: 255 }),
  email: varchar('email', { length: 255 }).notNull(),
  emailVerified: timestamp('emailVerified', {
    mode: 'date',
    withTimezone: true,
  }).default(sql`CURRENT_TIMESTAMP`),
  image: varchar('image', { length: 255 }),
})

export const usersRelations = relations(user, ({ many }) => ({
  accounts: many(account),
  // carts: many(cart),
  // storeUsers: many(storeUsers)
}))

export default user
