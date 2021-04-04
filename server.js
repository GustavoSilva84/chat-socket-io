const express = require('express');
const app = express();

const http = require('http')
const serverHttp = http.createServer(app);

const socketIo = require('socket.io');
const io = socketIo(serverHttp);

app.use(express.static(`${__dirname}/public`));
let mensagens = [];

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/public/html/index.html`);
});

io.on('connection', (socket) => {

    socket.emit('mostrar mensagens quando usuario entrar', mensagens);

    socket.on('enviar mensagem', (dados) => {

        if(dados.msg.length <= 2000) {
            mensagens.push(dados);
            io.emit('mostrar mensagem', dados)
        }

    });

    socket.on('usuario dijitando', (dados) => {
        socket.broadcast.emit('mostrar usuario dijitando', dados)
    })

})

serverHttp.listen(process.env.PORT || 8181, erro => {

    if(erro) {
        return console.log(`Erro: ${erro}`);
    }

    return console.log(`Servidor iniciado`);

});



