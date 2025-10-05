import './StarsRating.css'

type StarsRatingProps = {
    averageRating: number
}

export default function StarsRating(props: StarsRatingProps) {
    const { averageRating } = props

    return <input readOnly type="range" min="0.5" step="0.5" value={averageRating} max="5" id="stars" title={averageRating + "/5"} />
}
