var socket = io();

socket.on('connect',function(){
    console.log('Connected to server');

    // socket.emit('createMessage',{
    //     from:'bruno@example.com',
    //     text:'Hey. This is Bruno'
    // });
});

socket.on('newMessage',function(message){
    console.log('New message',message);
});

socket.on('disconnect',function(){
    console.log('Disconnected from server');
});

