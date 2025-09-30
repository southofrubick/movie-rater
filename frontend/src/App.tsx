import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { getPopularMovies } from './api'
import { SearchBar } from './components'
import type { PosterType } from './components'
import { Carousel, Navbar } from './containers'

function App() {
    const [popularMovies, setPopularMovies] = useState([] as PosterType[])

    useEffect(() => {
        getPopularMovies().then((movies) => setPopularMovies(movies))
    }, [])

    return (
        <>
            <Navbar />
            <div id="body">
                <h2>Popular Movies</h2>
                <Carousel movies={popularMovies} />
                <div>
                    <SearchBar />
                </div>
            </div>
        </>
    )
}

export default App
