interface PosterProps {
    src: string
    alt: string
}

export default function Poster({src, alt}: PosterProps) {
    return <img src={src} alt={alt} />
}
