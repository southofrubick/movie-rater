import axios from 'Axios'

export default function putRating(index: number, imdbID: string, rating: number, comment: string) {
    const averageRating = axios.put(
        `http://localhost:5223/movies/rating/edit?id=${index}&movieID=${imdbID}&rating=${rating}`,
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

