let socket = io();

let form = document.querySelector('#form');
let chat = document.querySelector('.chat');
let digitando = document.querySelector('#digitando > li');
let body = document.querySelector('body');

let chatLi = document.querySelector('.chat > li')

let mensagem = document.querySelector('#inputMensagem');
let nome = localStorage.getItem('nome');
let id = localStorage.getItem('id');

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




socket.on('carregou', () => {
    chatLi.style.display = 'none'
})


socket.on('mostrar mensagens quando usuario entrar', (dados) => {

    dados.forEach((dados) => {

        let li = document.createElement('li');

        if(id == dados.id) {

            li.innerHTML = `${removerComandos(dados.msg)} `;
            li.classList.add('eu');

        }else {

            li.innerHTML = `<strong> ${removerComandos(dados.nome)}: </strong> ${removerComandos(dados.msg)} `;
            li.classList.add('outros');

        }  

        chat.appendChild(li);
        window.scrollTo(0, document.body.scrollHeight);

    });

});




function removerComandos(x){
    return x.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");  
};

if(!("Notification" in window)) {
    alert("Este browser não suporta notificações de Desktop");
}else {
    
    if(Notification.permission === 'denied' || Notification.permission === 'default') {
        Notification.requestPermission()
    }
    
}

