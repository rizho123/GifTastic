
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gifs + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

var gifs = ["matrix", "car", "simpsons", "storm trooper", "thomas-train", "catdog", "panic", "clown", "van", "chris farley"];
var numGifs = gifs.length

var display = false;

function displayPics() {

    var gif = $(this).attr("data-name")
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=ZHv1n4TO6qsUkOBx4WQu9D5Z1IHLKVDE&limit=10";

    

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response) 
      var imgData = response.data
      for (var i = 0; i < imgData.length; i++){
        var ratings = imgData[i].rating
        console.log(ratings)
        var newDiv = $("<div>")
        newDiv.attr("class", "gifIMG")
        var ratingText = $("<p>").text("Rated: " + ratings)
        ratingText.attr("class", "ratingTXT")
        var imgTag = $("<img>")
        imgTag.attr("class", "gif")
        imgTag.attr("src", imgData[i].images.fixed_height_still.url)
        console.log(imgData[i].images.fixed_height.url)
        newDiv.prepend(imgTag,ratingText)

        $("#gifs-go-here").prepend(newDiv)
        
      }
      

    });

};

$("#gifs-go-here").on("click", ".gif", function() {
    console.log("CLICKED")
    console.log("1This: " + this)
    
    var src = $(this).attr("src");
    if($(this).hasClass("playing")){
        $(this).attr("src", src.replace(/\.gif/i, "_s.gif"))
        $(this).removeClass("playing");
    } else {
        $(this).addClass("playing");
        $(this).attr("src", src.replace(/\_s.gif/i, ".gif"))
    }

    // var imgURL = $(this).attr("src")

    //   if (imgURL.includes("_s.gif")) {
    //       imgURL = imgURL.replace("_s.gif", ".gif")
    //   } else if (imgURL.includes(".gif")) {
    //       imgURL = imgURL.replace(".gif", "_s.gif")
    //   }

    //   $(this).attr("src", imgURL)




    //   console.log("imgURL: " + imgURL)
     
    //   console.log("this: " + this)
  });

  $("#clearbutton").on("click", function(){
      $("#gifs-go-here").empty();
  })

  $("#clearsubmit").on("click", function(){
    $("#search").val("");
  }) // alt way: type=reset
    

  function renderButtons() {


    $("#buttons").empty();

    for (var i = 0; i < gifs.length; i++) {

      var wrap = $("<div>;")
      var a = $("<button>");
      var fav = $("<div>");
      wrap.addClass("wrapper")
      a.addClass("gifButton");
 
      a.attr("data-name", gifs[i]);
 
      a.text(gifs[i]);

      fav.text("+")

      fav.addClass("favorite")

      wrap.prepend(fav,a)

      $("#buttons").append(wrap);

      $(".favorite").hide()
    }
  }

  $("#favtitle").on("click", function(){
    $(".favorite").toggle(display);
    if (display === false) {
      display = true
      $(".favorite").show();
    } else if (display === true) {
      display = false
      $(".favorite").hide();
    }
  })

  // $(window).scroll(function(){
  //   $(".form").toggleClass("scrolling", $(window).scrollTop() > $(".header").offset().top);
  //   $("#buttons").toggleClass("scrolling2", $(window).scrollTop() > $(".header").offset().top);
  // }); // fixed with position: sticky, WAY more simple.


  $("#add-gifs").on("click", function(event) {
    event.preventDefault(); 
    var image = $("#search").val().trim();
    if (gifs.includes(image)) {
      document.getElementById("searchLabel").innerHTML = "Topic already exists!"
      setTimeout(function(){
        document.getElementById("searchLabel").innerHTML = "Add a new topic! &rarr;"
        }, 1000)
      return; 
    } else if (image === "") {
      document.getElementById("searchLabel").innerHTML = "Can't be blank!"
      setTimeout(function(){
        document.getElementById("searchLabel").innerHTML = "Add a new topic! &rarr;"
        }, 1000)
      return;
    } else {  
    console.log(image)
    gifs.push(image);
    renderButtons();
  }
  });

  $(document).on("click", ".gifButton", displayPics);

  renderButtons();