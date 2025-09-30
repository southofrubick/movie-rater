import './Carousel.css'
import { Poster } from '../../components'
import type { PosterType } from '../../components'

interface CarouselProps {
    movies: PosterType[]
}

export default function Carousel({ movies }: CarouselProps) {
    return (
        <div id="carousel">
            {movies.map((movie) => {
                const { src, title, year, rating } = movie

                return <Poster src={src} title={title} year={year} rating={rating} key={title+year} />
            })}
        </div>
    )
}
