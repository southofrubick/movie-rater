import type { Movie } from 'types'
import './Carousel.css'
import { Poster } from 'components'

type CarouselProps = {
    movies: Movie[] | null
}

export default function Carousel({ movies }: CarouselProps) {
    if (!movies || movies.length < 1) {
        return <div />
    }

    return (
        <div id="carousel">
            {movies.map((movie) => {
                const { title, year } = movie

                return <Poster movie={movie} key={title+year} />
            })}
        </div>
    )
}
