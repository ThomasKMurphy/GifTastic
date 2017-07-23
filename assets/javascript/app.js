var topics = ['wolf', 'gun', 'code', 'puppy', 'ski', 'skateboard', 'beer', 'yoga']

function displayGif () {
  $('#gifview').empty()
  var gif = $(this).attr('data-name')
  var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + gif + '&api_key=3395b98164d04612aa283dd896e10442&limit=10'
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
      gifDiv.append(displayrating)
      var gifurl = response.data[i].images.fixed_height_small.url
      var image = $('<img>').attr('src', gifurl)
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

renderButtons()

$('.gifview').empty()

// introduce still gifs, then upon 'click' animate gifs
// clear .gifview each time topic button is clicked
