
$(document).ready(function(){

    // variable holding the value of the users search
    var title;
    // when the more button is clicked, the moreClicked variable is to be set to true.
    var moreClicked = false;
    // When the submit button is clicked:
    $("#submit").click(function(e){
        // If the more button is clicked, or, the movie display is shown, we still want to be able to search for another movie.
        //
        if (moreClicked === true) {
            $("#movies").show();
        }
        // Prevent the button to do it's initial thing.
        e.preventDefault();

        // Assign the value of the users input to the title variable:
        title = $("#search").val();
        // Concatenate the users input value to the query stirng, and encode it.
        var url = "http://www.omdbapi.com/?s=" + encodeURI(title);
        // Return the data as json.
        var data = {
            format: "json"
        };
        // Use the jquery method with the established variables.
        $.getJSON(url, data, success);
    });
    // The success callback for the getJSON method:
    function success(data, jqXHR, status) {
            // print the returned array to the console for development purposes
            console.log(data.Search);
        // Initiate the generated html string:
        var movieHTML = "";
        // Variable for keeping track of how many movies are found:
        var movieFoundCount = 0;
        // Go through the returned array:
        $.each(data.Search, function(i, movie) {
            // Increment string to the movieHTML variable:
            movieHTML += "<li><div class='poster-wrap'>";
            // the the object does not have a poster, use the placeholder image instead.
            if (movie.Poster === "N/A") {
                movieHTML +=  "<i class='material-icons poster-placeholder'>crop_original</i>";
            // if there is a poster url in the object, use that:
            } else {
                movieHTML += "<a href='http://imdb.com/title/" + movie.imdbID + "'><img src='" + movie.Poster + "'></a>";
            }
            // Create the rest of the string:
            movieHTML += "</div><span class='movie-title'>" + movie.Title;
            movieHTML += "</span><span class='movie-year'>" + movie.Year + "</span><button class='more' name='" + movie.Title + "'>More</button></li>";
            movieFoundCount++;
        });
        // Check how many movies was found and print it to the console:
        console.log(movieFoundCount);
        // Initiate the variable that holds the movies
        var noMovieFoundStr = "";
        // If more than zero movies were found, insert the generated string:
        if (movieFoundCount !== 0) {
            $("#movies").html(movieHTML);
            // if no movies were found, add information to the noMovieFound string:
        } else {
            noMovieFoundStr = "<li><i class='material-icons icon-help'>help_outline</i>No movies found that match: " + title + ".</li>";
            $("#movies").html(noMovieFoundStr);
        }

        // When one of the generated more buttons are clicked:
        $(".more").on("click", function(){
            // Let the program know that the more button is clicked (line 12)
            moreClicked = true;
            // hide the movies
            $("#movies").hide();
            // load the external html that I created for the display of the movies:
            $("#displayMovie").load("../display.html");
            // The more button has the name of the movie in it's name attribute.
            var clickedTitle = $(this).attr("name");
            // I use the clicked movie name and concatenate it to the "t" query string:
            var url = "http://www.omdbapi.com/?t=" + encodeURI(clickedTitle) + "&y=&plot=short&r=json";
            // return the data as json:
            var data = {
                format: "json"
            };
            // callback for the second getJSON call:
            function callback(data) {
                // Give the external html file the information that it needs
                // from the returned object to create a corresponding
                $("#movie-title").text(data.Title);
                $("#movie-year").text("(" + data.Year + ")");
                $("#movie-year").css({
                    "margin-left": "10px"
                });

                $("img#movie-img").attr("src", data.Poster);
                $("#synopsis").text(data.Plot);
                $("#IMDbRating").text(data.imdbRating);
                $("#IMDbLink").attr("href", "http://imdb.com/title/" + data.imdbID);

                $("button#search-results").on("click", function(){
                    $("#movies").show();
                    $("#main-container").hide();
                });
            }

            $.getJSON(url, data, callback);




        });




    }







    // I am storing the movie title in the generated button name attribute, then I want to create
    // a new get request to the server, with the generated button's name attribute as a search parameter.



}); //doc.ready end
