var topics = ["fitness", "gun", "coding", "puppy", "ski", "skateboard", "beer", "yoga"];


function displayGifInfo() {

    var gif = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=3395b98164d04612aa283dd896e10442&limit=5";

    $.ajax({
            url: queryURL,
            method: "GET"
        })

        .done(function(response) {
            // Creating a div to hold the gif
            var gifDiv = $("<div class='gif'>");
            // Storing the rating data
            var rating = response.Rated;
            // Creating an element to have the rating displayed
            var displayrating = $("<p>").text("Rating: " + rating);
            // Displaying the rating
            gifDiv.append(displayrating);


            // Retrieving the URL for the image
            var imgURL = response.Poster;
            // Creating an element to hold the image
            var image = $("<img>").attr("src", imgURL);
            // Appending the image
            gifDiv.append(image);
            // Putting the gif above the previous gifs
            $(".gifview").prepend(gifDiv);
        });
}

// Function for displaying gif data
function renderButtons() {
    // Deleting the gifs prior to adding new gifs
    $(".topicbuttons").empty();
    // Looping through the array of topics
    for (var i = 0; i < topics.length; i++) {
        // Then dynamicaly generating buttons for each topic in the array
        var a = $("<button>");
        // Adding a class of movie to our button
        a.addClass("gif");
        // Adding a data-attribute
        a.attr("data-name", topics[i]);
        // Providing the initial button text
        a.text(topics[i]);
        // Adding the button to the buttons-view div
        $(".topicbuttons").append(a);
    }
}

// This function handles events where a topic button is clicked
$("#addbutton").on("click", function(event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var gif = $("#newbuttoninput").val().trim();
    // Adding topic from the textbox to our array
    topics.push(gif);
    // Calling renderButtons which handles the processing of our topics array
    renderButtons();
});

// Adding a click event listener to all elements with a class of "gif"
$(document).on("click", ".gif", displayGifInfo);
// Calling the renderButtons function to display the intial buttons
renderButtons();