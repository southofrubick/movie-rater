export interface Movie {
    imdbID: string,
    poster: string,
    title: string,
    plot: string,
    averageRating: number,
    year: string,
    reviews: Review[]
}

export interface Review {
    id: number,
    movieID: string,
    rating: number,
    comment: string
}

export interface ReviewAndMovie {
    review: Review,
    movie: Movie
}
