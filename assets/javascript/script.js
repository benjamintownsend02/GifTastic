var elements=["hydrogen","helium", "lithium", "beryllium", "boron", "carbon", 
            "nitrogen", "oxygen", "fluorine","neon","sodium", "magnesium",
            "aluminium","silicon", "phosphorous"];

function addButton(currentName)
{
    var newButton=$("<button/>").attr("data-id",currentName).text(currentName);
    newButton.attr("class","btn-display");
    $("#buttons").append(newButton);
        elements.push(currentName);
}

$.each(elements, function(key)
{
    addButton(elements[key]);
});

$("#btn-submit").on("click", function(event) {
    event.preventDefault();
    var mySearch = $("#search-input").val().trim().toLowerCase();
    if(!elements.includes(mySearch) && mySearch.length>0)
    {
        addButton(mySearch);
    }
  });
  
$(document).on("click", ".btn-display", function() {
    $("#gifs-here").empty();
    var current = $(this).attr("data-id");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      current + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
          var gifDiv = $("<div>").attr("class","gif-div");
          var rating = results[i].rating;

          var p = $("<p>").text("Rating: " + rating);

          var currentImage = $("<img>")
          var gifURL=results[i].images.fixed_height.url;
          var stillURL=gifURL.substring(0,results[i].images.fixed_height.url.length-4)+"_s.gif";
          currentImage.attr("class","gif");
          currentImage.attr("data-state","still");
          currentImage.attr("data-still",stillURL);
          currentImage.attr("data-animate",gifURL);
          currentImage.attr("src", stillURL);

          gifDiv.prepend(p);
          gifDiv.append(currentImage);

          $("#gifs-here").append(gifDiv);
        }
    });
});


$(document).on("click", ".gif",function() {
    var state=$(this).attr("data-state");
    if(state==="still")
    {
      $(this).attr("src",$(this).attr("data-animate"))
      state=$(this).attr("data-state", "animate");
    }
    else if(state==="animate")
    {
      $(this).attr("src",$(this).attr("data-still"))
      state=$(this).attr("data-state", "still");
    }
});
  

