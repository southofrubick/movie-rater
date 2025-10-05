import { useContext, useEffect, useState, type ChangeEvent } from 'react'
import './MovieModal.css'
import { StarsRating } from 'components/starsRating'
import CommentsContext from 'stores/Context'
import type { Movie, SubmitProps } from 'types'
import { RatingRadios } from 'containers'

type MovieModalProps = {
    movie: Movie,
    onSubmit: (submitProps: SubmitProps) => void,
    closeModal: () => void,
    editable?: {
        index: number,
    }
}

export default function MovieModal(props: MovieModalProps) {
    const { movie, onSubmit, closeModal, editable } = props
    const { poster, title, plot, year, averageRating } = movie
    const { updateReviews } = useContext(CommentsContext)

    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    useEffect(() => {
        if (editable) {
            const review = movie.reviews.find((element) => element.id === editable.index)

            setRating(review!.rating)
            setComment(review!.comment)
        }
    }, [editable, movie.reviews])

    const handleChangeRating = (event: ChangeEvent<HTMLInputElement>) => {
        setRating(parseInt(event.target.value))
    }

    const handleComment = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setComment(event.target.value)
    }

    const handleSubmit= () => {
        const submitProps = {
            newRating: rating,
            newComment: comment
        } as SubmitProps

        onSubmit({ ...submitProps })

        updateReviews()
    }

    return (
        <>
            <div id="movie-modal">
                <div>
                    <p className="title">{title} ({year})</p>
                    <img src={poster} alt={title} />
                </div>
                <div className="summary">
                    <span>{plot}</span>
                    <StarsRating averageRating={averageRating} />
                </div>
                <div className="form">
                    <span className="title">Leave Review</span>
                    <div className="rating">
                        <RatingRadios rating={rating} onSelect={handleChangeRating} />
                    </div>
                    <textarea value={comment} placeholder="Write comment here.." onChange={handleComment} />
                    <button id="edit-button" onClick={handleSubmit} disabled={rating === 0 || comment === ''} title="Both rating and comment are needed">Submit Review</button>
                </div>
                <button id="close-button" onClick={closeModal} >X</button>
            </div>
            <div id="background-blur" />
        </>
    )
}
