let socket = io();

let form = document.querySelector('#form');
let chat = document.querySelector('.chat');
let digitando = document.querySelector('#digitando > li');

let mensagem = document.querySelector('#mensagem');
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

form.addEventListener('submit', (event) => {

    event.preventDefault();

    if(!nome){
        return alert('Nome não preenchido');
    }

    if(!id){
        return alert('Id não preenchido');
    }

    if(!mensagem.value.trim()){
        return alert('Mensagem não preenchido');
    }

    if(mensagem.value.length >= 2000){
        return alert('Limite de caracteres utrapasado');
    }

    socket.emit('enviar mensagem', {nome: nome, msg: mensagem.value, id: id});
    mensagem.blur();
    mensagem.value = '';
    
});

socket.on('mostrar mensagem', (dados) => {

    let li = document.createElement('li');

    if(id == dados.id) {

        li.innerHTML = `<strong> Eu: </strong> ${checarComandos(dados.msg)} `;
        li.classList.add('eu');

    }else {

        li.innerHTML = `<strong> ${checarComandos(dados.nome)}: </strong> ${checarComandos(dados.msg)}`;
        li.classList.add('outros');

    }                                                                   
    
    chat.appendChild(li);
    window.scrollTo(0, document.body.scrollHeight);

    if(("Notification" in window)) {
        new Notification(`${checarComandos(dados.nome)}: ${checarComandos(dados.msg)}`)
    }

});

socket.on('mostrar mensagens quando usuario entrar', (dados) => {

    dados.forEach((dados) => {

        let li = document.createElement('li');

        if(id == dados.id) {

            li.innerHTML = `<strong> Eu: </strong> ${checarComandos(dados.msg)} `;
            li.classList.add('eu');

        }else {

            li.innerHTML = `<strong> ${checarComandos(dados.nome)}: </strong> ${checarComandos(dados.msg)} `;
            li.classList.add('outros');

        }  

        chat.appendChild(li);
        window.scrollTo(0, document.body.scrollHeight);

    });

});

mensagem.addEventListener('focus', () => {
    socket.emit('usuario dijitando', true)
})

mensagem.addEventListener('keypress', () => {
    socket.emit('usuario dijitando', true)
})

mensagem.addEventListener('blur', () => {
    socket.emit('usuario dijitando', false)
})

socket.on('mostrar usuario dijitando', (dados) => {

    if(dados) {
        digitando.style.display = 'block';
    }else {
        digitando.style.display = 'none';
    }

    window.scrollTo(0, document.body.scrollHeight);

});

function checarComandos(x){
    return x.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");  
};

if(!("Notification" in window)) {
    alert("Este browser não suporta notificações de Desktop");
}else {
    Notification.requestPermission()
}