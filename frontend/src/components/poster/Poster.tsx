import './Poster.css'

export interface PosterType {
    src: string
    title: string
    year: string
    rating: number
}

export default function Poster({src, title, year, rating}: PosterType) {
    return (
        <div className="poster">
            <img src={src} alt={title} />
            <span className="poster-title">{title}</span>
            <span>{year}</span>
            <div>{rating}/5</div>
        </div>
    )
}
