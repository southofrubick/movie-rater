import axios from 'Axios'

export default function getPopularMovies() {
    const movies = axios.get('http://localhost:5223/movies/popular/')
        .then((response) => response.data)
        .catch((error) => {console.log(error)})

    return movies
}
