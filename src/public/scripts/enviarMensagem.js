
form.addEventListener('submit', (event) => {

    event.preventDefault();

    if(!nome){
        return alert('Nome não preenchido');
    }

    if(!id){
        return alert('Id não preenchido');
    }

    if(!inputMensagem.value.trim()){
        return alert('Mensagem não preenchido');
    }

    if(inputMensagem.value.length >= 2000){
        return alert('Limite de caracteres utrapasado');
    }

    socket.emit('enviar mensagem', {
        nome, 
        msg: inputMensagem.value,
        id
    });

    socket.emit('digitando', false);
    
    inputMensagem.value = '';
    
});