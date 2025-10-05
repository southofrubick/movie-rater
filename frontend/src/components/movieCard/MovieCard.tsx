import type { Movie } from 'types'
import './MovieCard.css'
import { Spinner, StarsRating } from 'components'

function MovieCardBody(props: { movie: Movie, leaveReview: () => void }) {
    const { movie, leaveReview } = props
    const { poster, title, plot, year, averageRating } = movie

    return (
        <div className="movie-card">
            <div>
                <img src={poster} alt={title} />
            </div>
            <div className="summary">
                <span>{title} ({year})</span>
                <StarsRating averageRating={averageRating} />
                <span>Plot: {plot}</span>
            </div>
            <button onClick={() => leaveReview()}>Leave review</button>
        </div>
    )
}

export default function MovieCard(props: { movie: Movie | null, error: Error | null, leaveReview: () => void }) {
    const { movie, error, leaveReview } = props

    if (movie) {
        return (
            <MovieCardBody movie={movie} leaveReview={leaveReview} />
        )
    }

    if (error) {
        return (<h3 id="error-card">404 - Not Found</h3>)
    }

    return <Spinner />
}
