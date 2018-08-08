// array of disney movies
var topics = ["aladdin", "mulan", "dumbo", "snow white and the seven dwarfs", "pinocchio", "peter pan", "frozen", "air bud", "sleeping beauty", "tarzan", "toy story", "tangled", "winnie the pooh", "lion king", "moana", "bambi",]

// API key
var APIkey = "K87rLfo0zDxVogyra3WXT1oD9k7jm8ov";

renderButtons();

// function to render buttons
function renderButtons() {
    $("#disneyButtons").empty();
    for (var i = 0; i < topics.length; i++) {
        // dynamicaly generating buttons for each movie
        // $("<button>") --> create the start and end tag. (<button></button>)
        var b = $("<button>");

        // add class
        b.addClass("movie");
        // add data-attribute with a value of the disney movie at index i
        b.attr("data-name", topics[i]);
        b.text(topics[i]);
        // add buttons to html
        $("#disneyButtons").append(b);
    }
}

// click button
$("#add-movie").on("click", function(event) {
    // event.preventDefault() prevents form from trying to submit itself
    event.preventDefault();
    
    var clip = $("#movie-input").val().trim();
    // adding new clip to array of disney movies
    
    var b = $("<button>");

    // add class
    b.addClass("movie");
    // add data-attribute with a value of the disney movie at index i
    b.attr("data-name", clip);
    b.text(clip);
    // add buttons to html
    $("#disneyButtons").append(b);
});

function displayGifs(movie) {
    $("#disney-movies").empty();

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movie + "&api_key=" + APIkey + "&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        var results = response.data;
        for (var i = 0; i < results.length; i++) {
            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                var gifDiv = $("<div class='rating'>");
                var rating = results[i].rating;
                // paragraph with result's gif rating
                var r = $("<p>").text("Rating: " + rating);
                        // img tag
                var clipImage = $("<img>")
                clipImage.attr("class", "gif")
                clipImage.attr("src", results[i].images.fixed_height_still.url);
                clipImage.attr("data-still", results[i].images.fixed_height_still.url);
                clipImage.attr("data-animate", results[i].images.fixed_height.url)
                clipImage.attr("data-state", "still")
                gifDiv.append(r);
                gifDiv.append(clipImage);

                $("#disney-movies").prepend(gifDiv);
            }
        }
    });
}

// Play/pause gifs

$(document).on("click", ".gif", function(e) {
    var target = e.target;
    var state = $(target).attr("data-state");
    if (state === "still") {
        $(target).attr("src", $(target).attr("data-animate"));
        $(target).attr("data-state", "animate");
    } else {
        $(target).attr("src", $(target).attr("data-still"));
        $(target).attr("data-state", "still");
    }
});

$(document).on("click", ".movie", function(e) {
    var movie = e.target.attributes[1].value;
    displayGifs(movie);
});