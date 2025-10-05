import { useEffect, useState } from 'react'
import './App.css'
import { getPopularMovies } from 'api'
import { SearchBar } from 'components'
import { Carousel, CommentsList, Navbar } from './containers'
import CommentsContext from 'stores/Context'
import { useReviewContext } from 'hooks'
import type { Movie } from 'types'

/*
    TODO:
    Update comments list on postReview

    Refactor frontend
    Refactor backend

    Add tests for frontend
    Add tests for backend
*/

function App() {
    const [popularMovies, setPopularMovies] = useState(null as null | Movie[])
    const { latestReviews, updateReviews } = useReviewContext()

    useEffect(() => {
        getPopularMovies().then((data) => {
            const { error, result } = data

            if (error) {
                setPopularMovies(null)
            } else if (result) {
                setPopularMovies(result)
            }
        })
    }, [])

    return (
        <CommentsContext.Provider value={{ reviews: latestReviews, updateReviews }}>
            <Navbar />
            <div id="body">
                <h2>Popular Movies</h2>
                <Carousel movies={popularMovies} />
                <div>
                    <SearchBar />
                </div>
            </div>
            {popularMovies && (
                <CommentsList />
            )}
        </CommentsContext.Provider>
    )
}

export default App
