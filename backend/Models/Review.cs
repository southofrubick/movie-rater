class Review
{
    public int id { get; set; }
    public string movieID { get; set; }
    public int rating { get; set; }
    public string comment { get; set; }

    public Review(int Id, string MovieID, int Rating, string Comment)
    {
        id = Id;
        movieID = MovieID;
        rating = Rating;
        comment = Comment;
    }
}
