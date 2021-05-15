socket.on('carregarMensagens', (dados) => {

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
