//Node server which will handle socket io connections
const io= require('socket.io')(8000)

const users = {};

//whena a new user joins
io.on('connection',socket=>{
    socket.on('new-user-joined',name=>{
    
        users[socket.id] = name;
        socket.broadcast.emit('user-joined',name);

    })
    //when a user send the message let the other to know that someone sends the msg
    socket.on('send',message=>{
        socket.broadcast.emit('recieve',{message:message,name:users[socket.id]});   
    })
    //when a use leave the chat appp let the other know
    socket.on('disconnect',message=>{
        socket.broadcast.emit('leave',users[socket.id]);   
        delete users[socket.id];
    })
})
