import { Get } from 'api'
import { AxiosError } from 'axios'
import type { Movie } from 'types'

export default async function searchForMovies(movieTitle: string) {
    return Get(`?title=${movieTitle}`) as Promise<{ error: null | AxiosError, result: Movie }>
}
