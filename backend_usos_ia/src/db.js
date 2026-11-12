const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'usos_ia',
})

connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco:', err)
    } else {
        console.log('Conectado ao banco de dados!')
    }
})

module.exports = connection