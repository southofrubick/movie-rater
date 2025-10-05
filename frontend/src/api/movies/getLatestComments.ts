import axios, { AxiosError } from 'Axios'
import type { ReviewAndMovie } from 'types'

export default async function getLatestReviews() {
    let error: AxiosError | null = null

    const result = await axios.get('http://localhost:5223/movies/comments/')
        .then((response) => response.data as ReviewAndMovie[])
        .catch((e) => {
            error = e
        })

    return { error, result }
}

