import axios, { AxiosError } from 'Axios'
import type { Movie } from 'types'

export default async function searchForMovie(movieTitle: string) {
    let error: AxiosError | null = null

    const result = await axios.get(`http://localhost:5223/movies?title=${movieTitle}`)
        .then((response) => response.data as Movie)
        .catch((e) => {
            error = e
        })

    return { error, result }
}
