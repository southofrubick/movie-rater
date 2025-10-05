import { useModal } from 'hooks'
import './Poster.css'
import { postRating } from 'api'
import { MovieModal, StarsRating } from 'components'
import type { Movie } from 'types'

export default function Poster(props: { movie: Movie }) {
    const { movie } = props
    const { poster, title, year, averageRating } = movie
    const { currentModal, openModal, closeModal } = useModal()

    const handleClick = () => {
        openModal('movie-modal')
    }

    const handleSubmit = (submitProps: { newRating: number, newComment: string }) => {
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
