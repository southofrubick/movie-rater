import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { SearchBar } from './components'
import { Carousel, Navbar } from './containers'

const oneBattleAfterAnother = { src:"https://a.ltrbxd.com/resized/film-poster/9/5/1/2/7/7/951277-one-battle-after-another-0-230-0-345-crop.jpg?v=d27c4cc662", title:"One Battle After Another", year:"2025", rating:5}
const superman = { src:"https://a.ltrbxd.com/resized/film-poster/9/5/7/0/5/0/957050-superman-2025-0-230-0-345-crop.jpg?v=54e41a55ff", title:"Superman", year:"2025", rating: 4}
const theLongWalk = { src:"https://a.ltrbxd.com/resized/film-poster/5/3/1/3/1/6/531316-the-long-walk-2025-0-230-0-345-crop.jpg?v=9cf0c245aa", title:"The Long Walk", year:"2025", rating: 3.5}
const weapons = { src:"https://a.ltrbxd.com/resized/film-poster/9/7/2/1/0/9/972109-weapons-2025-0-230-0-345-crop.jpg?v=8100270337", title:"Weapons", year:"2025", rating: 4.5}
const fantasticFour = { src:"https://a.ltrbxd.com/resized/film-poster/5/4/3/9/6/7/543967-the-fantastic-four-first-steps-0-230-0-345-crop.jpg?v=ab7c919b04", title:"Fantastic 4", year:"2025", rating: 3.5}

function App() {
    const movies = [oneBattleAfterAnother, superman, theLongWalk, weapons, fantasticFour]

    return (
        <>
            <Navbar />
            <div id="body">
                <Carousel movies={movies} />
                <div>
                    <SearchBar />
                </div>
            </div>
        </>
    )
}

export default App
