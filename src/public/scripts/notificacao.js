function enviar(dados) {

    try {

        if(!document.hasFocus()) {

            if(("Notification" in window) && Notification.permission === "granted") {
                new Notification(`${removerComandos(dados.nome)}`, {body: `${removerComandos(dados.msg)}` });
            }

        }

    }catch (erro) {
        console.log(`Não foi possivel enviar a notificação erro: ${erro}`)
    } 

}