# DEV
dev:
	npm run dev

# dev-https:
# 	npm run dev:https

prod-start:
	npm run build && npm run start

# DRIZZLE
db-generate:
	npm run db:generate

db-migrate:
	npm run db:migrate

db-push:
	npm run db:push

db-drop:
	npm run db:drop

db-studio:
	npm run db:studio

db-seed:
	npm run db:seed

# # DBDOCS
# dbdocs-build:
# 	npm run dbdocs:build

# UI
shadcn-add:
	npx shadcn-ui@latest add


# Supabase
supabase-generate-types:
	npx supabase gen types --lang=typescript --local > src/types/supabase.ts