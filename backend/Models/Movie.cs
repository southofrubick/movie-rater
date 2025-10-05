class Movie
{
    public string imdbID { get; private set; }
    public string Poster { get; private set; }
    public string Title { get; private set; }
    public string Plot { get; private set; }
    public string Year { get; private set; }
    public double averageRating { get; private set; }
    public List<Review> reviews { get; set; }

    public Movie(string ImdbID, string poster, string title, string plot, string year)
    {
        imdbID = ImdbID;
        Poster = poster;
        Title = title;
        Plot = plot;
        Year = year;
        reviews = new List<Review>();
    }

    public void CalculateAverageRating() {
        averageRating = Math.Round(reviews.Average(review => review.rating * 2), MidpointRounding.AwayFromZero) / 2;
    }

    public void AddReview(Review review)
    {
        reviews.Add(review);
        CalculateAverageRating();
    }

    public void UpdateReview(Review review)
    {
        reviews[reviews.FindIndex(element => element.id == review.id)] = review;
        CalculateAverageRating();
    }
}
