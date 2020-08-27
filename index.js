const express = require("express");
const bodyParser = require("body-parser");
const port = 3000;

var app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: false}));
app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("index", {cotacao_dolar: "", cotacao_euro: "", valor: "", valor_dolar: "", valor_euro: "", mensagens: []});
} );

app.post("/converter", function(req, res){
    let mensagens = [];

    if(!req.body.valor)
      mensagens.push("Montante em Reais não informado.");

    if(!req.body.cotacao_dolar)
      mensagens.push("Cotação do Dólar não informada.");

    if(!req.body.cotacao_euro)
      mensagens.push("Cotação do Euro não informada.");

    let valor = parseFloat(req.body.valor);
    let cotacao_dolar = parseFloat(req.body.cotacao_dolar);
    let cotacao_euro = parseFloat(req.body.cotacao_euro);
    let valor_dolar = valor * (1 / cotacao_dolar);
    let valor_euro = valor * (1 / cotacao_euro);
    
    res.render("index", {valor: valor.toFixed(2), cotacao_dolar: cotacao_dolar.toFixed(2), cotacao_euro: cotacao_euro.toFixed(2), valor_dolar: valor_dolar.toFixed(2), valor_euro: valor_euro.toFixed(2), mensagens: mensagens});
});

app.listen(port, () => {
	console.log(`O ConversorMoedas está rodando em http://localhost:${port}`)
})