
const socket = io('http://localhost:3000');

const form=document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");


//play sound when a user write the message
function play() {
    var audio = new Audio('https://pl3dxz-a.akamaihd.net/downloads/ringtones/files/mp3/twitter-bird-dceb51f6-7561-3a2e-89a2-aad53695e412-53702.mp3');
    audio.play();
  }

//The message written is shown in container
const append = (message,position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position=='left')
    play();
}


//when we click on send button we send the msg to server so that he send the msg to 
//everone who is connected with server
form.addEventListener('submit',(e)=>{
    e.preventDefault();//page does not reload
    const message=messageInput.value;
    append(`You:${message}`,'right');
    socket.emit('send',message);
    messageInput.value='';
   
})
//Take name and send the info to server
const name=prompt("Enter your name to join");
socket.emit('new-user-joined',name);

//server send the info of a use who recently joined
socket.on('user-joined',name=>{
    append(`${name} joined the chat`,'right');  
})

//server send the msg send by the user
socket.on('recieve',data=>{
    append(`${data.name}:${data.message}`,'left');

})

//server says that this user left the chat
socket.on('leave',name=>{
    append(`${name}:left the chat`,'right');
})