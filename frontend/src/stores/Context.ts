import { createContext } from "react"
import type { ReviewAndMovie } from "types"

const CommentsContext = createContext({ reviews: null as null | ReviewAndMovie[], updateReviews: () => {} })

export default CommentsContext
