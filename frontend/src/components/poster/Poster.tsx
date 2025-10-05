import { useModal } from 'hooks'
import './Poster.css'
import { postRating } from 'api'
import { MovieModal, StarsRating } from 'components'
import type { Movie, SubmitProps } from 'types'

type PosterProps = {
    movie: Movie
}

export default function Poster(props: PosterProps) {
    const { movie } = props
    const { poster, title, year, averageRating } = movie
    const { currentModal, openModal, closeModal } = useModal()

    const handleClick = () => {
        openModal('movie-modal')
    }

    const handleSubmit = (submitProps: SubmitProps) => {
        const { newRating, newComment } = submitProps
        postRating(movie.imdbID, newRating, newComment).then(() => {
            closeModal()
        })
    }

    return (
        <>
            <div className="poster">
                <img src={poster} alt={title} onClick={handleClick} />
                <span className="poster-title">{title}</span>
                <span>{year}</span>
                <StarsRating averageRating={averageRating} />
            </div>
            {movie && currentModal === 'movie-modal' && (
                <MovieModal movie={movie} onSubmit={handleSubmit} closeModal={closeModal} />
            )}
        </>
    )
}
