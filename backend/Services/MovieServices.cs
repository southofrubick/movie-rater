using System.Text.Json;

class MovieServices
{
    HttpClient client;
    InMemoryDatabase imdb = new InMemoryDatabase();

    public MovieServices()
    {
        client = new HttpClient();

        InitializePopularMovies();
    }

    public ReviewAndMovie[] getLatestComments(int size = 10)
    {
        return imdb.getLatestReviews(size);
    }

    public Movie parseMovie(string movieString)
    {
        Movie? movie = JsonSerializer.Deserialize<Movie>(movieString);

        if (movie == null || movie.imdbID == null)
        {
            throw new ArgumentNullException("parseMovie");
        }

        if (!imdb.MovieExists(movie.imdbID))
        {
            imdb.AddMovie(movie.imdbID, movie);
        }

        return imdb.GetMovie(movie.imdbID);
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
        foreach (string id in imdb.popularMovieIDs)
        {
            imdb.AddMovie(id, await getMovieByID(id));
        }
    }

    public double addReview(string id, int rating, string comment)
    {
        imdb.AddReview(id, rating, comment);

        return 0.0;
    }

    public double updateReview(int index, string movieID, int rating, string comment)
    {
        imdb.UpdateReview(index, movieID, rating, comment);

        return imdb.GetAverageRatingForMovie(movieID);
    }

    public Movie[] getPopularMovies()
    {
        return imdb.GetPopularMovies();
    }
}
