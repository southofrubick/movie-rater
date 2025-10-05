import { useEffect, useState } from 'react'
import './SearchBar.css'
import { searchForMovie } from 'api'
import { MovieCard, MovieModal } from '../'
import { useModal } from 'hooks'
import { postRating } from 'api'
import type { Movie, SubmitProps } from 'types'

const DEBOUNCE_TIMER = 300

export default function SearchBar() {
    const [searchPhrase, setSearchPhrase] = useState('')
    const [movie, setMovie] = useState(null as null | Movie)
    const [error, setError] = useState(null as null | Error)
    const [showResult, setShowResult] = useState(false)
    const { currentModal, openModal, closeModal } = useModal()

    const handleChange = (value: string) => {
        setSearchPhrase(value)
    }

    const handleLeaveReview = () => {
        openModal('movie-modal')
        setShowResult(false)
    }

    const handleSubmit = (submitProps: SubmitProps) => {
        const { newRating, newComment } = submitProps

        postRating(movie!.imdbID, newRating, newComment).then(() => {
            closeModal()
        })
    }

    useEffect(() => {
        if (searchPhrase.length > 0) {
            const delayDebounce = setTimeout(() => {
                searchForMovie(searchPhrase).then((data) => {
                    const { error, result } = data

                    if (error) {
                        setError(error)
                        setMovie(null)
                    } else if (result) {
                        setMovie(result)
                    }
                })

                setShowResult(true)
            }, DEBOUNCE_TIMER)

            return () => clearTimeout(delayDebounce)
        } else {
            setMovie(null)
            setShowResult(false)
        }
    }, [searchPhrase])


    return (
        <>
            <input type="text" placeholder="Search.." value={searchPhrase} onChange={(event) => handleChange(event.target.value)} onFocus={() => { if (movie) { setShowResult(true) } }} />
            {showResult && (
                <MovieCard movie={movie} error={error} leaveReview={handleLeaveReview} />
            )}
            {movie && currentModal === 'movie-modal' && (
                <MovieModal movie={movie} onSubmit={handleSubmit} closeModal={closeModal} />
            )}
        </>
    )
}
