import './StarsRating.css'

export default function StarsRating(props: { averageRating: number }) {
    const { averageRating } = props

    return <input readOnly type="range" min="0.5" step="0.5" value={averageRating} max="5" id="stars" title={averageRating + "/5"} />
}
