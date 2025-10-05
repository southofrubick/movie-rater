import { putRating } from "api"
import './CommentCard.css'
import { useModal } from "hooks"
import { MovieModal, StarsRating } from "components"
import type { Movie, Review } from "types"

export default function CommentCard(props: { review: Review, movie: Movie }) {
    const { review, movie } = props
    const { comment, rating } = review
    const { poster, title, year } = movie
    const { openModal, closeModal, currentModal } = useModal()

    const handleEdit = () => {
        openModal('comment-modal')
    }

    const submit = (submitProps: { newRating: number, newComment: string }) => {
        const { newRating, newComment } = submitProps

        putRating(review.id, movie.imdbID, newRating, newComment).then(() => {
            closeModal()
        })
    }

    return (
        <>
            <div className="comment-card">
                <div>
                    <img src={poster} alt={title} />
                </div>
                <div className="summary">
                    <span>{title} ({year})</span>
                    <StarsRating averageRating={rating} />
                    <p className="comment">{comment}</p>
                </div>
                <button onClick={handleEdit} >Edit</button>
            </div>
            {currentModal === 'comment-modal' && (
                <MovieModal movie={movie} onSubmit={submit} closeModal={closeModal} editable={{ index: review.id }} />
            )}
        </>
    )
}

