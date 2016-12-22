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

    $("#submit").click(function(e){

        e.preventDefault();

        var title = $("#search").val();
        var url = "http://www.omdbapi.com/?s=" + encodeURI(title);
        var data = {
            format: "json"
        };
        $.getJSON(url, data, success);
    });

    function success(data) {
        var movieHTML = "<ul>";
        $.each(data.Search, function(i, movie){
            movieHTML += "<li>" + movie.Title + "</li>";
        });
        $("#movies").html(movieHTML);
    }

});
