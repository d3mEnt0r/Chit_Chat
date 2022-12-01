const socket = io();

let alias;
let textarea = document.querySelector('#textarea');
let messageArea = document.querySelector('.message_area');

do {
    alias = prompt('Enter your name: ')
} while (!alias);


textarea.addEventListener('keyup', (event)=> {
    if(event.key === 'Enter'){
        sendMessage(event.target.value);
    }
});

function sendMessage(message){
    let msg = {
        user : alias,
        message : message.trim()
    }

    // Append
    appendMessage(msg, 'outgoing');

    // send to Server
    socket.emit('message', msg);
}

function appendMessage(msg, type){
    let manDiv = document.createElement('div');
    let className = type;
    manDiv.classList.add(className, 'message');

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `

    manDiv.innerHTML = markup;
    messageArea.appendChild(manDiv);
}


// Recieve messages
socket.on('message', (msg)=>{
    appendMessage(msg, 'incoming');
});
