# QUIZZ App

## What the statement says

Create a movie quizz static web application using the tmdb api

Choose a movie to start with on tmdb. the app will always start from this movie, user cannot change it.

On top of the page display a div containing movie info : title , image and release date of the movie

Below the movie info div, display a div containing a form

In this form Ask the user to give the director or one of the actors of the movie in an input text field with a submit button.

the user must enter full name, the search will be case insensitive

If the answer is wrong display a message in red near the submit button

If the answer is good, add a new div below the form div with the actor or director info : name, photo

Below this div display a div containing a form

In this form, Ask the user to give the name of a movie where this person was actor or director.

the user must enter full name, the search will be case insensitive

If the answer is wrong display a message in red near the submit button

If the answer is good, add a new div below the form div with the movie info : title, image and release date of the movie

And so on.

Users must never enter the same movie name twice. if they do , don't accept the answer and display an adapted error message.
