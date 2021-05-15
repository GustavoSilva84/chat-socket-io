const { app, http, io } = require('./app');

let mensagens = [];
let pessoasNaSala = 0;

io.on('connection', (socket) => {

    io.emit('pessoasNaSala', ++pessoasNaSala)

    socket.emit('mostrar mensagens quando usuario entrar', mensagens)
     
    socket.on('enviar mensagem', (dados) => {
        mensagens.push(dados);
        io.emit('mostrar mensagem', dados)
        io.emit('new', dados)
    });

    socket.on('digitando', (dados) => {
        socket.broadcast.emit('digitando', dados)
    })

    socket.on('disconnect', () => {
        io.emit('pessoasNaSala', --pessoasNaSala, false);
        socket.broadcast.emit('mostrar usuario dijitando', false);
    })

    io.emit('carregou');

});

http.listen(process.env.PORT || 8181, (erro) => {
    if(erro) return console.log(`Erro: ${erro}`);
    return console.log(`Servidor iniciado`);
});