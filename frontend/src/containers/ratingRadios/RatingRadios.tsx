import { RatingRadioButton } from 'components'
import type { ChangeEvent } from 'react'

type RatingRadiosProps = {
    rating: number,
    onSelect: (event: ChangeEvent<HTMLInputElement>) => void
}

export default function RatingRadios(props: RatingRadiosProps) {
    const { rating, onSelect } = props

    return (
        <>
            <RatingRadioButton onSelect={onSelect} rating={rating} value={1} />
            <RatingRadioButton onSelect={onSelect} rating={rating} value={2} />
            <RatingRadioButton onSelect={onSelect} rating={rating} value={3} />
            <RatingRadioButton onSelect={onSelect} rating={rating} value={4} />
            <RatingRadioButton onSelect={onSelect} rating={rating} value={5} />
        </>
    )
}
