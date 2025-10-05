import { useContext, useEffect, useState, type ChangeEvent } from 'react'
import './MovieModal.css'
import { StarsRating } from 'components/starsRating'
import CommentsContext from 'stores/Context'
import type { Movie } from 'types'

function RatingRadio(props: { value: number, rating: number, onSelect: (event: ChangeEvent<HTMLInputElement>) => void }) {
    const { onSelect, rating, value } = props

    return (
        <>
            <label>
            {value}
                <input
                    type="radio"
                    name="rating"
                    value={value}
                    checked={rating === value}
                    onChange={onSelect}
                />
            </label>
        </>
    )
}

function RenderRatingRadios(props: { rating: number, onSelect: (event: ChangeEvent<HTMLInputElement>) => void }) {
    const { rating, onSelect } = props

    return (
        <>
            <RatingRadio onSelect={onSelect} rating={rating} value={1} />
            <RatingRadio onSelect={onSelect} rating={rating} value={2} />
            <RatingRadio onSelect={onSelect} rating={rating} value={3} />
            <RatingRadio onSelect={onSelect} rating={rating} value={4} />
            <RatingRadio onSelect={onSelect} rating={rating} value={5} />
        </>
    )
}

type SubmitProps = {
    id?: string,
    newRating: number,
    newComment: string,
}

export default function MovieModal(props: { movie: Movie, onSubmit: (submitProps: SubmitProps) => void, closeModal: () => void, editable?: { index: number } }) {
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
        if (rating !== 0 && comment !== '') {
            const submitProps = {
                newRating: rating,
                newComment: comment
            } as SubmitProps

            onSubmit({ ...submitProps })
        }

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
                        <RenderRatingRadios rating={rating} onSelect={handleChangeRating} />
                    </div>
                    <textarea value={comment} placeholder="Write comment here.." onChange={handleComment} />
                    <button id="edit-button" onClick={handleSubmit} >Submit Review</button>
                </div>
                <button id="close-button" onClick={closeModal} >X</button>
            </div>
            <div id="background-blur" />
        </>
    )
}
