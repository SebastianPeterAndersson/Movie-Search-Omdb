
$(document).ready(function(){

    var title;

    var moreClicked = false;

    $("#submit").click(function(e){

        if (moreClicked === true) {
            $("#movies").show();
        }

        e.preventDefault();

        title = $("#search").val();
        var url = "http://www.omdbapi.com/?s=" + encodeURI(title);
        var data = {
            format: "json"
        };
        $.getJSON(url, data, success);
    });

    function success(data, jqXHR, status) {
            console.log(data.Search);
        var movieHTML = "";
        var movieFoundCount = 0;
        $.each(data.Search, function(i, movie) {
            movieHTML += "<li><div class='poster-wrap'>";
            if (movie.Poster === "N/A") {
                movieHTML +=  "<i class='material-icons poster-placeholder'>crop_original</i>";
            } else {
                movieHTML += "<a href='http://imdb.com/title/" + movie.imdbID + "'><img src='" + movie.Poster + "'></a>";
            }
            movieHTML += "</div><span class='movie-title'>" + movie.Title;
            movieHTML += "</span><span class='movie-year'>" + movie.Year + "</span><button class='more' name='" + movie.Title + "'>More</button></li>";
            movieFoundCount++;
        });

        console.log(movieFoundCount);
        var noMovieFoundStr = "";
        if (movieFoundCount !== 0) {
            $("#movies").html(movieHTML);
        } else {
            noMovieFoundStr = "<li><i class='material-icons icon-help'>help_outline</i>No movies found that match: " + title + ".</li>";
            $("#movies").html(noMovieFoundStr);
        }


        $(".more").on("click", function(){
            moreClicked = true;
            console.log("Hello");
            $("#movies").hide();
            $("#displayMovie").load("../display.html");

            var clickedTitle = $(this).attr("name");
            var url = "http://www.omdbapi.com/?t=" + encodeURI(clickedTitle) + "&y=&plot=short&r=json";
            var data = {
                format: "json"
            };

            function callback(data) {
                $("#movie-title").text(data.Title);
                $("#movie-year").text("(" + data.Year + ")");

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
