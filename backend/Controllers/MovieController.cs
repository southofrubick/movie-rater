using Microsoft.AspNetCore.Mvc;

class MovieController
{
    public WebApplicationBuilder builder { get; }
    public WebApplication app { get; set; }

    MovieServices movieServices = new MovieServices();

    public MovieController()
    {
        builder = WebApplication.CreateBuilder();

        // Add services to the container.
        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

        builder.Services.AddCors(options =>
        {
            options.AddPolicy(name: MyAllowSpecificOrigins,
                              policy =>
                              {
                                  policy.WithOrigins("http://localhost:5173")
                                    .AllowAnyHeader()
                                    .AllowAnyMethod();
                              });
        });

        app = builder.Build();
        app.UseCors(MyAllowSpecificOrigins);

    }

    public void Build()
    {
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseHttpsRedirection();

        app.MapGet("/movies/popular", () =>
        {
            return movieServices.getPopularMovies();
        })
        .WithName("GetPopularMovies")
        .WithOpenApi();

        app.MapGet("/movies", (string title) =>
        {
            return movieServices.getMovieByTitle(title);
        })
        .WithName("searchForMovie")
        .WithOpenApi();

        app.MapPost("/movies/rating", (string id, int rating, [FromBody] string comment) =>
        {
            return movieServices.addReview(id, rating, comment);
        })
        .WithName("rateMovie")
        .WithOpenApi();

        app.MapPut("/movies/rating/edit", (int id, string movieID, int rating, [FromBody] string comment) =>
        {
            return movieServices.updateReview(id, movieID, rating, comment);
        })
        .WithName("editMovieRating")
        .WithOpenApi();

        app.MapGet("/movies/comments", () =>
        {
            return movieServices.getLatestComments();
        })
        .WithName("getLatestComments")
        .WithOpenApi();
    }
}
