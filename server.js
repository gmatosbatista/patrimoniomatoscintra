const express = require('express');
const app = express();
const mysql = require('mysql2/promise');

// Criar uma conexão com o banco de dados
const connection = await mysql.createConnection({
    host: 'db-gestaopatrimonio.cq14kel3drw6.us-east-2.rds.amazonaws.com',
    user: 'gmatosbatista',
    password: 'G271920g!',
    database: 'gestaopatrimonio'
  });

// Definir a rota "/api/sql"
app.post('/api/sql', async (req, res) => {
    try {
      // Executar a consulta SQL
      const [rows, fields] = await connection.execute(req.body.query);
  
      // Enviar os resultados como uma resposta JSON
      res.json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Ocorreu um erro ao executar a consulta SQL' });
    }
  });

// Iniciar o servidor na porta 3000
app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});