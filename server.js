const express = require('express');
const app = express();

const http = require('http').createServer(app);
const io = require('socket.io')(http);

const chalk = require('chalk');

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/public/html/index.html`);
});

let mensagens = [];

io.on('connection', (socket) => {

    socket.emit('mostrar mensagens quando usuario entrar', mensagens);

    socket.on('enviar mensagem', (dados) => {

        mensagens.push(dados);
        console.log(mensagens);
        io.emit('mostrar mensagem', dados)

    });

    socket.on('usuario dijitando', (dados) => {
        socket.broadcast.emit('mostrar usuario dijitando', dados)
    })

    // socket.on('usuario nao dijitando', () => {
    //     socket.broadcast.emit('mostrar nao usuario dijitando')
    // })

})

http.listen(8181, erro => {

    if(erro) {
        return console.log(`Erro: ${erro}`);
    }

    return console.log(`Servidor iniciado`);

});