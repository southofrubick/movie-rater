class ReviewAndMovie
{
    public Review review { get; set; }
    public Movie movie { get; set; }

    public ReviewAndMovie(Review Review, Movie Movie)
    {
        review = Review;
        movie = Movie;
    }
}
