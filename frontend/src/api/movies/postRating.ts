import axios from 'Axios'

export default function postRating(imdbID: string, rating: number, comment: string) {
    const averageRating = axios.post(
        `http://localhost:5223/movies/rating?id=${imdbID}&rating=${rating}`,
        "\"" + comment + "\"",
        {
            headers: {
                "Content-Type": "application/json"
            }
        },
    )
        .then((response) => response.data)
        .catch((error) => {console.log(error)})

    return averageRating
}
