# DEV
dev:
	pnpm run dev

# dev-https:
# 	pnpm run dev:https

# prod-start:
# 	pnpm run build && pnpm run start

# DRIZZLE
db-generate:
	pnpm run db:generate

db-migrate:
	pnpm run db:migrate

db-push:
	pnpm run db:push

db-drop:
	pnpm run db:drop

db-studio:
	pnpm run db:studio

# db-seed:
# 	pnpm run db:seed

# # DBDOCS
# dbdocs-build:
# 	pnpm run dbdocs:build

# # UI
# shadcn-add:
# 	npx shadcn-ui@latest add


# Supabase
supabase-generate-types:
	npx supabase gen types --lang=typescript --local > src/types/supabase.ts