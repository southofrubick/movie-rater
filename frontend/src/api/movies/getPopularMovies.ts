import { Get } from 'api'
import { AxiosError } from 'axios'
import type { Movie } from 'types'

export default async function getPopularMovies() {
    return Get('/popular') as Promise<{ error: null | AxiosError, result: Movie[] }>
}
