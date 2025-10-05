using System.Text.Json;

class MovieServices
{
    HttpClient client;

    Dictionary<string, Movie> movies;
    Dictionary<string, Movie> popularMovies;

    List<Review> reviews;

    string[] popularMovieIDs = [
        "tt30144839",
        "tt5950044",
        "tt6800268",
        "tt26581740",
        "tt10676052"
    ];

    public MovieServices()
    {
        client = new HttpClient();
        movies = new Dictionary<string, Movie>();
        popularMovies = new Dictionary<string, Movie>();
        reviews = new List<Review>();

        InitializePopularMovies();
    }

    public ReviewAndMovie[] getLatestComments(int size = 10, int page = 0)
    {
        Review[] latestReviews = reviews.TakeLast(size).Reverse().ToArray();
        ReviewAndMovie[] reviewsAndMovies = new ReviewAndMovie[latestReviews.Count()];

        for (int i = 0; i < latestReviews.Length; i++)
        {
            reviewsAndMovies[i] = new ReviewAndMovie(latestReviews[i], movies[latestReviews[i].movieID]);
        }

        return reviewsAndMovies;
    }

    public Movie parseMovie(string movieString)
    {
        Movie? movie = JsonSerializer.Deserialize<Movie>(movieString);

        if (movie == null || movie.imdbID == null)
        {
            throw new ArgumentNullException("parseMovie");
        }

        if (!movies.ContainsKey(movie.imdbID))
        {
            movies[movie.imdbID] = movie;
        }

        return movies[movie.imdbID];
    }

    public async Task<Movie> getMovieByID(string id)
    {
        try
        {
            using HttpResponseMessage response = await client.GetAsync("https://www.omdbapi.com/?apikey=80c09127&i=" + id);
            response.EnsureSuccessStatusCode();
            string result = await response.Content.ReadAsStringAsync();
            return parseMovie(result);
        }
        catch (HttpRequestException e)
        {
            throw e;
        }
    }

    public async Task<Movie> getMovieByTitle(string title)
    {
        try
        {
            using HttpResponseMessage response = await client.GetAsync("https://www.omdbapi.com/?apikey=80c09127&t=" + title);
            response.EnsureSuccessStatusCode();
            string result = await response.Content.ReadAsStringAsync();
            return parseMovie(result);
        }
        catch (HttpRequestException e)
        {
            throw e;
        }
    }

    async void InitializePopularMovies()
    {
        foreach (string id in popularMovieIDs)
        {
            movies[id] = await getMovieByID(id);
        }
    }

    public double addReview(string id, int rating, string comment)
    {
        Review newReview = new Review(reviews.Count(), id, rating, comment);
        reviews.Add(newReview);
        movies[id].AddReview(newReview);

        return 0.0;
    }

    public double updateReview(int index, string movieID, int rating, string comment)
    {
        Review newReview = new Review(index, movieID, rating, comment);
        Review oldReview = reviews[index];

        reviews[index].rating = rating;
        reviews[index].comment = comment;

        movies[movieID].UpdateReview(newReview);

        return movies[movieID].averageRating;
    }

    public Movie[] getPopularMovies()
    {
        Movie[] popularMovies = new Movie[popularMovieIDs.Length];

        for (int i = 0; i < popularMovieIDs.Length; i++)
        {
            popularMovies[i] = movies[popularMovieIDs[i]];
        }

        return popularMovies;
    }
}
