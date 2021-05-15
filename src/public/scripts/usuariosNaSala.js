const pessoasOnline = document.querySelector('#pessoasOnline > p');

socket.on('pessoasNaSala', (dados) => {

    if(dados == 1) {
        pessoasOnline.innerHTML = `Somente você esta na sala`;
        return;
    }

    pessoasOnline.innerHTML = `Você e mais ${dados - 1} pessoas estão na sala`;
    return;

});
