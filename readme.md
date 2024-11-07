Hey guys here's a brief until Tuesday. It has some non-coding tasks in it to take care of before the real fun starts:

--Have a look at Knex.js, an SQL driver for express.js (Hint: you'll need the pg package to work with postgres)

--Come up with a bunch (3+) of User Stories with their acceptance criteria

--Draw a cheap sketch of the UI with excalidraw.com

--Open up a repository on GitHub and invite me :sunglasses:

--For every user story, add a GitHub issue in that repo

--Have a think about whether you want to go API Backend + React Frontend or just Backend + Templates

--After you've taken care of 1-6, feel free to get started :rocket:

https://excalidraw.com/#room=b55b4616375ceae98565,hXGwlruSL6lxhY47kI4MXw

USER STORIES:

1. As a user i want to be able to create and log into an account. 
2. As a user i want to be able to search for movies by title, director or actors.
3. As a user i want to filter by Year, Country, Genre, tv shows, movies
4. As a user i want to SELECT and add movies to a favourites/watch later list linked to my account.
5. As a user i want to be able to give a film a rating of 1-10
ACCEPTANCE CRITERIA:

1.  - The user should land on home page. In the Header/Nav there should be an profile icon button.
    - When not loged in if icon clicked, it should open a dropdown menu wiht LOGIN + REGISTER buttons.

    - No account = click register. takes them to registration form Modal

    - the login Modal should have 2 inputs. One for UserName / email. One fore Password.
    - login modal should have a Login button. when clicked if credentials match close modal toast logged in.
        if wrong credentials given clear input fileds and alert if it was wrong password or email/username not found.
    
    - the register modal should have 4 inputs. Email. Username. Password. Password Conf.
    - Register Button for form to submit. When Clicked alert acount created and log in + close modal.

    
2.  - The main app page should have a search input and button to search by title or director or actors
    - when the button is clicked it should bring up a container with all the results that match the text from search input.
    - the results should display all the relivent infor from database in a clear easy to read way.

3.  - The main app page should have a filter button to open a dropdown with filter choices.

4.  - Each item on the list should have a button that the users clicks to save into their personal list.
    - to acces the list you can click the profile icon button and choose the list from a dropdown.

5.  - Each item should have a give rating button where you can choose a rating of 1-10. The rating should be combined wiht other users 
      ratings and displayed as an average.  