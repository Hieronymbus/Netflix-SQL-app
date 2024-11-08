Hey guys here's a brief until Tuesday. It has some non-coding tasks in it to take care of before the real fun starts:

--Have a look at Knex.js, an SQL driver for express.js (Hint: you'll need the pg package to work with postgres)

--Come up with a bunch (3+) of User Stories with their acceptance criteria

--Draw a cheap sketch of the UI with excalidraw.com

--Open up a repository on GitHub and invite me :sunglasses:

--For every user story, add a GitHub issue in that repo

--Have a think about whether you want to go API Backend + React Frontend or just Backend + Templates

--After you've taken care of 1-6, feel free to get started :rocket:

https://excalidraw.com/#room=b55b4616375ceae98565,hXGwlruSL6lxhY47kI4MXw

## User story: As a user I want to be able to register and log into an account

### Acceptance criteria 
- The user must be able to login / register.
- The login form must contain a link to the registration form if the user is not registered and vice versa if the user is already registered.
- The user must be alerted if there username or password are incorrect.
- The user must provide a valid name, username, email, age and 2 matching passwords (to confirm it is correct) when registering.
- The user must be alerted if the emai or username already exists when registering.
- Once completing the login / register forms the user must be taken to the home page.

## User story: As a user I want to be able to search for movies

### Acceptance criteria
- The page must contain a search bar and submit button for the user search for movies.
- The user must be able to filter there searches
  - There must be a feature (button, hamburger menu etc.) that provides the user with options to filter there searches e.g. search by director, release year, genre or rating and so on.
- The user must be prompted with suggestions as the user is typing.

## User story: As a user I want to be able to store movies to a watchlist and access those watchlists

### Acceptance criteria
- Each displayed movie must contain a feature that when triggered will prompt the user to exit, create a new watchlist or add the movie to a current watchlist.
- In the main drop down which contains the login / register etc. options, There must be an option to access the watchlists.

## User story: As a user I want to be able to view details about the movie
- Each non-selected movie must display It's title, release year, genre, brief description and rating.
- Each selected movie must display all information associated with it, along with an image and actors and directors.
  - Actors and directors names must be links that direct you to information on that person.
