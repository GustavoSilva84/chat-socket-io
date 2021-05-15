socket.on('mostrar mensagem', (dados) => {

    const li = document.createElement('li');

    if(id == dados.id) {
        li.innerHTML = `${removerComandos(dados.msg)} `;
        li.classList.add('eu');
    }else {
        li.innerHTML = `<strong> ${removerComandos(dados.nome)}: </strong> ${removerComandos(dados.msg)}`;
        li.classList.add('outros');
        enviar(dados)
    }
    
    chat.appendChild(li);
    window.scrollTo(0, document.body.scrollHeight);

});
