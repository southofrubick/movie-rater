class InMemoryDatabase
{
    public Dictionary<string, Movie> movies { get; }

    public List<Review> reviews { get; }

    public string[] popularMovieIDs { get; }

    public InMemoryDatabase()
    {
        movies = new Dictionary<string, Movie>();

        reviews = new List<Review>();

        popularMovieIDs = [
            "tt30144839",
            "tt5950044",
            "tt6800268",
            "tt26581740",
            "tt10676052"
        ];
    }

    public void AddMovie(string id, Movie movie)
    {
        movies[id] = movie;
    }

    public Movie GetMovie(string id)
    {
        return movies[id];
    }

    public Boolean MovieExists(string id)
    {
        return movies.ContainsKey(id);
    }

    public void AddReview(string id, int rating, string comment)
    {
        Review newReview = new Review(reviews.Count(), id, rating, comment);

        reviews.Add(newReview);
        movies[id].AddReview(newReview);
    }

    public ReviewAndMovie[] getLatestReviews(int size = 10)
    {
        Review[] latestReviews = reviews.TakeLast(size).Reverse().ToArray();
        ReviewAndMovie[] reviewsAndMovies = new ReviewAndMovie[latestReviews.Count()];

        for (int i = 0; i < latestReviews.Length; i++)
        {
            reviewsAndMovies[i] = new ReviewAndMovie(latestReviews[i], movies[latestReviews[i].movieID]);
        }

        return reviewsAndMovies;
    }

    public void UpdateReview(int index, string movieID, int rating, string comment)
    {
        Review newReview = new Review(index, movieID, rating, comment);
        Review oldReview = reviews[index];

        reviews[index].rating = rating;
        reviews[index].comment = comment;

        movies[movieID].UpdateReview(newReview);
    }

    public double GetAverageRatingForMovie(string id)
    {
        return movies[id].averageRating;
    }

    public Movie[] GetPopularMovies()
    {
        Movie[] popularMovies = new Movie[popularMovieIDs.Length];

        for (int i = 0; i < popularMovieIDs.Length; i++)
        {
            popularMovies[i] = GetMovie(popularMovieIDs[i]);
        }

        return popularMovies;
    }
}
