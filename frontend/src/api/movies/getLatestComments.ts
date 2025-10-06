import { Get } from 'api/utils'
import { AxiosError } from 'axios'
import type { ReviewAndMovie } from 'types'

export default async function getLatestReviews() {
    return Get('/comments/') as Promise<{ error: null | AxiosError, result: ReviewAndMovie[] }>
}
