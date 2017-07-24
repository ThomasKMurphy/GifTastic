var topics = ['wolf', 'gun', 'code', 'puppy', 'ski', 'skateboard', 'beer', 'yoga']

function renderButtons () {
  $('.topicbuttons').empty()
  for (var i = 0; i < topics.length; i++) {
    var a = $('<button>')
    a.addClass('gifbutton')
    a.attr('data-name', topics[i])
    a.text(topics[i])
    $('.topicbuttons').append(a)
  }
}

renderButtons()
$(document).on('click', 'button', function (event) {
  var gif = $(this).attr('data-name')
  var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + gif + '&api_key=3395b98164d04612aa283dd896e10442&limit=10'
  console.log(queryURL)
  $.ajax({
    url: queryURL,
    method: 'GET'
  }) .done(function (response) {
    $('img').remove()
    $('.rating').remove()
    var results = response.data

    for (var i = 0; i < topics.length; i++) {
      var gifDiv = $('<div class="gif">')
      var rating = results[i].rating
      var displayrating = $('<p>').text('Rating: ' + rating)
      displayrating.addClass('rating')

      var image = $('<img>')
      image.addClass('imageClass')
      image.attr('src', results[i].images.fixed_height_still.url)
      image.attr('data-state', 'still')
      image.attr('animate', results[i].images.fixed_height_still.url)
      image.attr('still', results[i].images.fixed_height.url)
      gifDiv.append(displayrating)
      gifDiv.append(image)

      $('.gifview').prepend(gifDiv)
      $('.imageClass').on('click', function () {
        var state = $(this).attr('data-state')
        if (state === 'still') {
          $(this).attr('src', $(this).attr('animate'))
          $(this).attr('data-state', 'animate')
        } else {
          $(this).attr('src', $(this).attr('still'))
          $(this).attr('data-state', 'still')
        }
      })
    }
  }
  )
})
$('#addbutton').on('click', function (event) {
  event.preventDefault()
  var gif = $('#newbuttoninput').val().trim()
  topics.push(gif)
  renderButtons()
  $('#newbuttoninput').val('')
})
