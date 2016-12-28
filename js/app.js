//
// $(document).ready(function(){
//
//     var title = "lord of the flies";
//
//     var url = "http://www.omdbapi.com/?s=" + encodeURI(title);
//     var data = {
//         format: "json"
//     };
//     function success(data) {
//         var movieHTML = "<ul>";
//         $.each(data.Search, function(i, movie){
//             movieHTML += "<li>" + movie.Title + "</li>";
//         });
//
//         $("body").html(movieHTML);
//     }
//
//     $.getJSON(url, data, success);
//
// });


$(document).ready(function(){

    var title;

    $("#submit").click(function(e){

        e.preventDefault();

        title = $("#search").val();
        var url = "http://www.omdbapi.com/?s=" + encodeURI(title);
        var data = {
            format: "json"
        };
        $.getJSON(url, data, success);
    });

    function success(data, jqXHR, status) {
        if (status !== 200 ) {
            console.log("On noes");
        }
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
            movieHTML += "</span><span class='movie-year'>" + movie.Year + "</span><button class='more' label='" + movie.imdbID + "'>More</button></li>";
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
            $("#displayMovie").load("../display.html");
            $(this).addClass("clicked");

            $.each(data.Search, function(i, movie){
                console.log(movie.IMDbID);
            });

        });

        console.log(jqXHR);

    }

    // I need to get the json data from whichever "more"-button is clicked.
    // I then need to use the data which was GET'ed. Maybe storing it in an object.
    //



}); //doc.ready edn
