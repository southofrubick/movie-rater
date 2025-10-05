import { useEffect, useState } from 'react'
import { getLatestComments } from 'api'
import type { ReviewAndMovie } from 'types'

export default function useReviewContext() {
    const [shouldUpdateReviews, setShouldUpdateReviews] = useState(true)
    const [latestReviews, setLatestReviews] = useState(null as null | ReviewAndMovie[])

    useEffect(() => {
        setShouldUpdateReviews(false)

        getLatestComments().then((data) => {
            const { error, result } = data

            if (error) {
                setLatestReviews([])
            } else if (result) {
                setLatestReviews(result)
            }
        })
    }, [shouldUpdateReviews])

    const updateReviews = () => {
        setShouldUpdateReviews(true)
    }

    return { latestReviews, updateReviews }
}
