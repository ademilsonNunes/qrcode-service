const express = require('express');
const { exec } = require('child_process');

const app = express();
const port = 5000;

app.get('/capturar_qrcode', (req, res) => {
    const code = req.query.code;
    if (code) {
        exec(`echo "${code}" | pbcopy`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Erro ao copiar para a área de transferência: ${error.message}`);
                res.send('Erro ao copiar para a área de transferência.');
                return;
            }
            if (stderr) {
                console.error(`Erro ao copiar para a área de transferência: ${stderr}`);
                res.send('Erro ao copiar para a área de transferência.');
                return;
            }
            console.log('Conteúdo do QR Code copiado para a área de transferência com sucesso!');
            res.send('Conteúdo do QR Code copiado para a área de transferência com sucesso!');
        });
    } else {
        console.log('Nenhum conteúdo foi recebido.');
        res.send('Nenhum conteúdo foi recebido.');
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
