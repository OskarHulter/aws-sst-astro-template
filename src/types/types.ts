import type { TypedDocument, Orama, Results, SearchParams } from '@orama/orama'
import { create, insert, search } from '@orama/orama'

type MovieDocument = TypedDocument<Orama<typeof movieSchema>>

const movieSchema = {
  title: 'string',
  year: 'number',
  actors: 'string[]',
  isFavorite: 'boolean',
  stars: 'enum'
} as const // <-- this is important

const movieDB: Orama<typeof movieSchema> = await create({
  schema: movieSchema,
})

const idP: string = await insert(movieDB, {
  title: 'The Godfather',
  year: 1972,
  actors: ['Marlon Brando', 'Al Pacino'],
  isFavorite: true,
})

const searchParams: SearchParams<Orama<typeof movieSchema>> = {
  term: 'godfather',
}
const result: Results<MovieDocument> = await search(movieDB, searchParams)
const title = result.hits[0].document.title // well typed!
console.log(title) // The Godfather
console.log("ID:")
console.log(idP)
