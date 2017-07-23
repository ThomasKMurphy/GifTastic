var topics = ['rainbow', 'gun', 'coding', 'puppy', 'ski', 'skateboard', 'beer', 'yoga']

function displayGif () {
  var gif = $(this).attr('data-name')
  var queryURL = 'http://api.giphy.com/v1/gifs/search?q=' + gif + '&api_key=3395b98164d04612aa283dd896e10442&limit=10'
  $.ajax({
    url: queryURL,
    method: 'GET'
  }).done(function (response) {
    console.log(response)

    var i

    for (i = 0; i < response.data.length; i++) {
      var gifDiv = $("<div class='gif'>")
      var rating = response.data[i].rating
      var displayrating = $('<p>').text('Rating: ' + rating)
      var animated = response.data[i].images.fixed_height.url
      var still = response.data[i].images.fixed_height_still.url
      var image = $('<img>')
      image.attr('src', still)
      image.attr('data-still', still)
      image.attr('data-animated', animated)
      image.attr('data-state', 'still')
      gifDiv.append(displayrating)
      gifDiv.append(image)
      $('.gifview').prepend(gifDiv)
    }
  })
}

function renderButtons () {
  $('.topicbuttons').empty()
  for (var i = 0; i < topics.length; i++) {
    var a = $('<button>')
    a.addClass('gif')
    a.attr('data-name', topics[i])
    a.text(topics[i])
    $('.topicbuttons').append(a)
  }
}

$('#addbutton').on('click', function (event) {
  event.preventDefault()
  var gif = $('#newbuttoninput').val().trim()
  topics.push(gif)
  renderButtons()
})

$(document).on('click', '.gif', displayGif)
$('#gifview').empty()
renderButtons()
