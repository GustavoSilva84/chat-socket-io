inputMensagem.addEventListener('keypress', () => {
    socket.emit('digitando', true);
});

inputMensagem.addEventListener('focus', () => {
    socket.emit('digitando', true);
});

inputMensagem.addEventListener('blur', () => {
    socket.emit('digitando', false);
});

socket.on('digitando', (dados) => {

    if(dados) {
        usuarioDigitando.style.display = 'block';
    }else {
        usuarioDigitando.style.display = 'none';
    }

    window.scrollTo(0, document.body.scrollHeight);

});
