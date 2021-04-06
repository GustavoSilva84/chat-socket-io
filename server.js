
const express = require('express');
const app = express();

const http = require('http').createServer(app);
const io = require('socket.io')(http);


app.use(express.static(`${__dirname}/public`));
const chalk = require('chalk');

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/public/html/index.html`);
});

let mensagens = [];
let pessoasNaSala = 0;

io.on('connection', (socket) => {

    pessoasNaSala++
    io.emit('pessoasNaSala', pessoasNaSala)
    //socket.broadcast.emit('pessoas', true)

    socket.emit('mostrar mensagens quando usuario entrar', mensagens)
     
    socket.on('enviar mensagem', (dados) => {

        mensagens.push(dados);
        console.log(mensagens);
        io.emit('mostrar mensagem', dados)
        io.emit('new', dados)

    });

    socket.on('usuario dijitando', (dados) => {
        socket.broadcast.emit('mostrar usuario dijitando', dados)
    })

    socket.on('disconnect', () => {
        pessoasNaSala--
        io.emit('pessoasNaSala', pessoasNaSala, false)
        //socket.broadcast.emit('pessoas', false)
        socket.broadcast.emit('mostrar usuario dijitando', false)
    })

    io.emit('carregou')


})

http.listen(process.env.PORT || 8181, (erro) => {

    if(erro) {
        return console.log(`Erro: ${erro}`);
    }

    return console.log(`Servidor iniciado`);

});


