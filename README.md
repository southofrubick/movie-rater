# Movie-Rater
An application written in .Net and react that allows you to search for, index, and review movies.

## Tech
### Requirements:
- Dotnet 8
- Node 24.7.0 (earlier versions *might* work just fine)

### To start backend server
- Navigate to the backend folder in your terminal
- Run `dotnet run`

### To start frontend server
- Navigate to the frontend folder in your terminal
- Run `npm run dev`

### External dependencies:
- Axios (frontned)
used for api calls from the frontend.

## Thoughts
I did not have time to write any tests of any kind. But this is how (in broad strokes) I would go about it:
- Unit tests for any logic, such as mapping and rendering in the frontend, and calculations and Dictionary operations in the backend.
- E2E tests using playwright to test entire flows (searching for a movie, adding a comment, editing a comment).
- Integration tests for the backend APIs that rely on a third party site.

It's been a while since I've written something in dotnet, and OOP in general, but I'm happy with the result of what I've managed to do in this limited amount of time I've actually worked on this.

In a production environment, the frontend/backend folders would also have been two separate repositories,
as that would enable better CI/CD operations since react builds are usually way faster than any serious compilation required by most backends, and would enable scalability where necessary.

Currently, when reviewing *popular movies*, the total score does not auto update, but requires a refresh of the page.

I've set up the beginnings of pagination, but did not have time to fully implement it, so we currently only fetch the latest 10 comments, but changing it is as simple as updating the size default value in getLatestComments in the MovieService in the backend.
