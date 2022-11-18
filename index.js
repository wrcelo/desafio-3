const express = require('express');
const exphbs = require('express-handlebars');
const mysql = require('mysql');
const app = express();
const port = 3000;

// Configurando handlebars
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

// Configurando para aceitar CSS
// app.use(express.static('public'));

// Middlewares para receber dados dos formulários
app.use(
    express.urlencoded({extended: true})
);
app.use(express.json());



app.get('/', (req, res) => {
    res.render('home')
});
app.post('/cliente/save', (req, res) => {
    const nome            = req.body.nome;
    const endereco        = req.body.endereco;
    const email           = req.body.email;
    const dataNascimento  = req.body.dataNascimento;

    const sql = `INSERT INTO cliente (nome_cliente, endereco_cliente, email_cliente, data_nascimento_cliente) VALUES ('${nome}', '${endereco}', '${email}', '${dataNascimento}')`;
    
    conn.query(sql, (err) => {
        if(err) {
            console.log(err);
            return
        }
        res.redirect('/clientes');
    });
});
app.get('/clientes', (req, res) => {

    const sql = `SELECT id_cliente, nome_cliente, endereco_cliente, email_cliente, data_nascimento_cliente FROM cliente`;

    conn.query(sql,(err, clientes) => {
        if(err){
            console.log(err);
            return
        }
        res.render('clientes', {clientes});
    });


});

const conn = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'db_comum'
});

conn.connect((err) => {
    if (err){
        console.log(err);
        return
    }
    console.log('Conectou no banco db_comum')
    app.listen(port, () => console.log(`App listening on port ${port}!`));

});
