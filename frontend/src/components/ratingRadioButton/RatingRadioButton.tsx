import type { ChangeEvent } from 'react'

type RatingRadioButtonProps = {
    value: number,
    rating: number,
    onSelect: (event: ChangeEvent<HTMLInputElement>) => void
}

export default function RatingRadioButton(props: RatingRadioButtonProps) {
    const { onSelect, rating, value } = props

    return (
        <>
            <label>
            {value}
                <input
                    type="radio"
                    name="rating"
                    value={value}
                    checked={rating === value}
                    onChange={onSelect}
                />
            </label>
        </>
    )
}

