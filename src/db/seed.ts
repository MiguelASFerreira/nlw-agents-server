import { reset, seed } from 'drizzle-seed'
import { db, sql } from './connection.ts'
import { schema } from './schema/index.ts'

await reset(db, schema)

await seed(db, schema).refine((f) => {
  return {
    rooms: {
      count: 5,
      columns: {
        name: f.companyName(),
        description: f.loremIpsum(),
        createdAt: f.date({
          minDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30), 
          maxDate: new Date(),
        }),
      },
    },
    questions: {
      count: 20,
    },
  }
})

await sql.end()

// biome-ignore lint/suspicious/noConsole: only used in dev
console.log('Database seeded successfully.')
