import axios, { AxiosError } from 'Axios'
import type { Movie } from 'types'

export default async function getPopularMovies() {
    let error: AxiosError | null = null

    const result = await axios.get('http://localhost:5223/movies/popular/')
        .then((response) => response.data as Movie[])
        .catch((e) => {
            error = e
        })


    return { error, result }
}
