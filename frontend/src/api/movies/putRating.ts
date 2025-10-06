import { Put } from 'api/utils'

export default function putRating(index: number, imdbID: string, rating: number, comment: string) {
    return Put(`/rating/edit?id=${index}&movieID=${imdbID}&rating=${rating}`, comment)
}

