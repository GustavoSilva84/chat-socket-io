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

        if(dados.msg.length <= 2000) {
            mensagens.push(dados);
            console.log(mensagens);
            io.emit('mostrar mensagem', dados)
        }

    });

    socket.on('usuario dijitando', (dados) => {
        socket.broadcast.emit('mostrar usuario dijitando', dados)
    })

    // socket.on('usuario nao dijitando', () => {
    //     socket.broadcast.emit('mostrar nao usuario dijitando')
    // })

})

function checarComandos(x){
    return x.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");  
};


http.listen(process.env.PORT || 8181, erro => {

    if(erro) {
        return console.log(`Erro: ${erro}`);
    }

    return console.log(`Servidor iniciado`);

});

