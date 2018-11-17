let socket = io();

socket.on('connect', function() {
  console.log('Connected to server');
});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
    const formatedTime = moment(message.createdAt).format('h:mm a')

    let li = jQuery('<li></li>')
    li.text(`${message.from} ${formatedTime}: ${message.text}`)

    jQuery('#messages').append(li)
})

socket.on('newLocationMessage', function(message) {
  let li = jQuery('<li></li>')
  let a = jQuery('<a target="_blank" >My current location</a>')
  const formatedTime = moment(message.createdAt).format('h:mm a')

  li.text(`${message.from} ${formatedTime}: `)
  a.attr('href', message.url)
  li.append(a)
  jQuery('#messages').append(li)
})

jQuery('#message-form').on('submit', function(e) {
  e.preventDefault()
  const messageTextbox = jQuery('[name=message]')

  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.val()
  }, function() {
    messageTextbox.val('')
  })
})

const locationButton = jQuery('#send-location')

locationButton.on('click', function() {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser')
  }

  locationButton.attr('disabled', 'disabled').text('Sending location...')

  navigator.geolocation.getCurrentPosition(function(position) {
    locationButton.removeAttr('disabled').text('Send location')

    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longiture: position.coords.longitude
    })
  }, function() {
    locationButton.removeAttr('disabled').text('Send location')
    alert('Unable to fetch location')
  })
})