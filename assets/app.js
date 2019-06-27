var gifs = ["The Matrix", "The Notebook", "Mr. Nobody", "The Lion King"];


function displayPics() {

    var movie = $(this).attr("data-name");
    var queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";

    // Creates AJAX call for the specific movie button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response) 
      
      

      var newMovie = $("<div>")
      var title = $("<h1>").text(response.Title)
      var rated = "Rated: " + response.Rated + "<br>"
      var released = "Released: " + response.Released + "<br>"
      var plot = "Plot: " + response.Plot + "<br>"
      var posterURL = response.Poster
      var poster = $("<img>").attr("src", posterURL)

      for (var i = 0; i < response.Ratings.length; i++) {
        console.log("Ratings 2: " + response.Ratings[i].Source + ": " + response.Ratings[i].Value)

      var p = $("<p>")
      var ratings = response.Ratings[i].Source + ": " + response.Ratings[i].Value + "<br>"
      p.prepend(ratings)
      console.log("Ratings var: " + ratings)
      $("#movies-view").prepend(newMovie)
      newMovie.append(ratings)
      console.log("After ratings: " + ratings + ", Released: " + response.Released)
      
      }

      $("#movies-view").prepend(newMovie)
      newMovie.prepend(title,rated,released,plot,poster)
    });

  };
        
  

  // Function for displaying movie data
  function renderButtons() {

    // Deletes the movies prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();
    // Loops through the array of movies
    for (var i = 0; i < gifs.length; i++) {

      // Then dynamicaly generates buttons for each movie in the array
      // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
      var a = $("<button>");
      // Adds a class of movie to our button
      a.addClass("movie");
      // Added a data-attribute
      a.attr("data-name", gifs[i]);
      // Provided the initial button text
      a.text(gifs[i]);
      // Added the button to the buttons-view div
      $("#buttons-view").append(a);
    }
  }

  // This function handles events where the add movie button is clicked
  $("#add-movie").on("click", function(event) {
    event.preventDefault();
    // This line of code will grab the input from the textbox
    var image = $("#movie-input").val().trim();

    // The movie from the textbox is then added to our array
    movies.push(movie);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
  });

  // Adding click event listeners to all elements with a class of "movie"
  $(document).on("click", ".movie", displayMovieInfo);

  // Calling the renderButtons function to display the intial buttons
  renderButtons();