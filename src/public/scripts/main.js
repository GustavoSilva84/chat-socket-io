const socket = io();
const form = document.querySelector('#form');
const chat = document.querySelector('.chat');
const digitando = document.querySelector('#digitando > li');
const body = document.querySelector('body');
const chatLi = document.querySelector('.chat > li')
const inputMensagem = document.querySelector('#inputMensagem');
const usuarioDigitando = document.querySelector('#digitando > li');
let nome = localStorage.getItem('nome');
let id = localStorage.getItem('id');

socket.on('carregou', () => chatLi.style.display = 'none' )

function salvarNome() {

    if(!nome) {
        nome = prompt('Nome');
        id = Math.floor(Math.random() * 100000000000000000000);
        localStorage.setItem('nome', nome);
        localStorage.setItem('id', id);
        salvarNome();
    }

}

salvarNome();  


if(!("Notification" in window)) {
    alert("Este browser não suporta notificações de Desktop");
}else {
    if(Notification.permission === 'denied' || Notification.permission === 'default') {
        Notification.requestPermission();
    }
}