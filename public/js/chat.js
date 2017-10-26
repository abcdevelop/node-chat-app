var socket = io();

function scrollToBotom(){
    // Selectors
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child');

    // Heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
        messages.scrollTop(scrollHeight);
    }
}


socket.on('connect',function(){
    var params=jQuery.deparam(window.location.search);

    socket.emit('join', params, function(err){
        if(err){
            alert(err);
            window.location.href = '/';
        }else{
            console.log('No error');
        }
    });

//    console.log('Connected to server');

    // socket.emit('createMessage',{
    //     from:'bruno@example.com',
    //     text:'Hey. This is Bruno'
    // });
});

socket.on('newMessage',function(message){
    var formatedTime = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template,{
        from: message.from,
        text: message.text,
        createdAt: formatedTime
    });

    jQuery('#messages').append(html);
    scrollToBotom();

    // //console.log('New message',message);
    //var text = `${message.from} ${formatedTime}: ${message.text}`;
    // var li = jQuery('<li></li>');
    // li.text(`${message.from} ${formatedTime}: ${message.text}`);
    //
    // jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(message){
    var formatedTime = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template,{
        from: message.from,
        url: message.url,
        createdAt: formatedTime
    });

    jQuery('#messages').append(html);
    scrollToBotom();

    // var li = jQuery('<li></li>');
    // var a = jQuery('<a target="_blank">My current location</a>');
    //
    // li.text(`${message.from} ${formatedTime}: `);
    // a.attr('href',`${message.url}`);
    // li.append(a);
    // jQuery('#messages').append(li);
});



socket.on('disconnect',function(){
    console.log('Disconnected from server');
});

socket.on('updateUserList',function(users){
    console.log('User list', users);
    var ul = jQuery('<ul></ul>');

    users.forEach(function(user){
        var li = jQuery('<li></li>');
        li.text(user);
        ul.append(li);
    });

    jQuery('#users').html(ul);
});


// socket.emit('createMessage',{
//     from:'bruno@example.com',
//     text:'Hey. This is Bruno'
// }, function(data){
//     console.log('Got it.',data);
// });

jQuery('#message-form').on('submit',function(e){
   e.preventDefault();

   var messageTextbox = jQuery('[name=message]');

    socket.emit('createMessage',{
       from: 'User',
       text: messageTextbox.val()
    }, function(){
        messageTextbox.val('');
    });
});

var locationButton = jQuery('#send-location');
locationButton.on('click',function(){
   if(!navigator.geolocation){
        return alert('Geolocation not supported by your browser.');
   }

   locationButton.attr('disabled','disabled').text('Sending location...');

   navigator.geolocation.getCurrentPosition(function(position){
        locationButton.removeAttr('disabled').text('Send location...');
        socket.emit('createLocationMessage',{
            latitude:position.coords.latitude,
            longitude:position.coords.longitude
        });
   },function(){
       locationButton.removeAttr('disabled').text('Send location...');
       alert('Unable to fetch location');
   });

});

