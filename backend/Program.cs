var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var  MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy  =>
                      {
                          policy.WithOrigins("http://localhost:5173")
                            .AllowAnyHeader()
                            .AllowAnyMethod();
                      });
});

var app = builder.Build();
app.UseCors(MyAllowSpecificOrigins);

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

Movie oneBattleAfterAnother = new Movie("tt30144839", "https://a.ltrbxd.com/resized/film-poster/9/5/1/2/7/7/951277-one-battle-after-another-0-230-0-345-crop.jpg?v=d27c4cc662", "One Battle After Another", 5.0, "2025");
Movie superman = new Movie("tt5950044", "https://a.ltrbxd.com/resized/film-poster/9/5/7/0/5/0/957050-superman-2025-0-230-0-345-crop.jpg?v=54e41a55ff", "Superman", 4.0, "2025");
Movie theLongWalk = new Movie("tt6800268", "https://a.ltrbxd.com/resized/film-poster/5/3/1/3/1/6/531316-the-long-walk-2025-0-230-0-345-crop.jpg?v=9cf0c245aa", "The Long Walk", 3.5, "2025");
Movie weapons = new Movie("tt26581740", "https://a.ltrbxd.com/resized/film-poster/9/7/2/1/0/9/972109-weapons-2025-0-230-0-345-crop.jpg?v=8100270337", "Weapons", 4.5, "2025");
Movie fantasticFour = new Movie("tt10676052", "https://a.ltrbxd.com/resized/film-poster/5/4/3/9/6/7/543967-the-fantastic-four-first-steps-0-230-0-345-crop.jpg?v=ab7c919b04", "Fantastic 4", 3.5, "2025");

var popularMovies = new[]
{
    oneBattleAfterAnother, superman, theLongWalk, weapons, fantasticFour
};

app.MapGet("/movies/popular", () =>
{
    return popularMovies;
})
.WithName("GetPopularMovies")
.WithOpenApi();

app.Run();

class Movie
{
    public string ImdbID { get; set; }
    public string Src { get; set; }
    public string Title { get; set; }
    public double Rating { get; set; }
    public string Year { get; set; }

    public Movie(string imdbID, string src, string title, double rating, string year)
    {
        ImdbID = imdbID;
        Src = src;
        Title = title;
        Rating = rating;
        Year = year;
    }
}

record PopularMovies(string src, string title, double rating, string year)
{
}
