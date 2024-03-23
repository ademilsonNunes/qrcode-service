const express = require('express');
const fs = require('fs');
const app = express();
const port =  process.env.PORT || 5000;

let lastCode = '';

app.get('/captura_qrcode', (req, res) => {
    const code = req.query.code;
    if (code) {
        lastCode = code;
        fs.writeFile('last_code.txt', code, (err) => {
            if (err) {
                console.error(`Erro ao escrever o último código: ${err}`);
                res.send('Erro ao escrever o último código.');
            } else {
                console.log('Último código atualizado com sucesso:', code);
                res.send('Conteúdo do QR Code capturado e armazenado com sucesso!');
            }
        });
    } else {
        console.log('Nenhum conteúdo foi recebido.');
        res.send('Nenhum conteúdo foi recebido.');
    }
});

app.get('/ultimo_codigo', (req, res) => {
    res.send(lastCode);
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
