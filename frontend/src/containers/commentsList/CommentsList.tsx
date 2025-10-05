import { CommentCard } from "components"
import './CommentsList.css'
import { useContext } from "react"
import CommentsContext from "stores/Context"

export default function CommentsList() {
    const { reviews } = useContext(CommentsContext)

    if (reviews && reviews.length > 0) {
        return (
            <div id="comments-list">
                {reviews.map((commentAndMovie) => {
                    const { movie, review } = commentAndMovie

                    return (<CommentCard key={movie.imdbID + review.id} review={review} movie={movie} />)
                })}
            </div>
        )
    }
}
