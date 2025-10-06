import { Post } from "api/utils"

export default function postRating(imdbID: string, rating: number, comment: string) {
    return Post(`/rating?id=${imdbID}&rating=${rating}`, comment)
}
