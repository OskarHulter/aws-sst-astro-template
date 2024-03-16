import { ApiHandler } from "sst/node/api"
import { db } from "astro:db"

export const handler = ApiHandler(async (_event) => {
  await db.migrate("migrations")
  return {
    body: "Migrations completed",
  }
})
