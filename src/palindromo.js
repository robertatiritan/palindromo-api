const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.port ? Number(process.env.port) : 3333;

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('robsonsss')
  })

app.post('/', (req, res) => {
    const texto = req.body.texto;

    if (!texto || texto.trim() === "") {
        return res.status(400).json({ error: "A entrada nao pode estar vazia." });
    }

    const retornojson = {
        palindromo: verificaPalindromo(texto),
        ocorrencias_caracteres: contarCaracteres(texto)
    };
    res.json(retornojson);

});

function verificaPalindromo(texto) {
    const comprimento = texto.length;
    for (let i = 0; i < comprimento / 2; i++) {
        if (texto[i] !== texto[comprimento - 1 - i]) {
            return false;
        }
    }
    return true;
}

function contarCaracteres(texto) {
    const caracteres = {};
    for (let i of texto) {
        caracteres[i] = (caracteres[i] || 0) + 1;
    }
    return caracteres;
}

app.listen(port, () => {
    console.log("server local ok")
});
