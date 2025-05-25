require('dotenv').config();
const express = require('express');
const http = require('http');
const mysql = require('mysql2/promise');
const authController = require('./controllers/authController'); // Importe o controller
const initSocket = require('./services/socketService');

// Configuração do pool MySQL
const pool = mysql.createPool({
  host: 'localhost',
  port: 3306, // Porta do MySQL (XAMPP)
  user: 'root',
  password: 'root',
  database: 'devpoints', // Corrigi o nome para "devpoints"
  waitForConnections: true,
  connectionLimit: 10
});

// Teste de conexão MySQL
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Conectado ao MySQL na porta 3306!');
    connection.release();
  } catch (err) {
    console.error('❌ Erro ao conectar ao MySQL:', err);
  }
})();

const app = express();
const server = http.createServer(app);

// Configuração do Socket.IO
const io = initSocket(server);

// Middleware
app.use(express.json());

// Rotas
app.get('/', (req, res) => {
  res.send('🟢 API DevPoints Online');
});

// Rotas de autenticação
app.post('/api/auth/register', authController.register);
app.post('/api/auth/login', authController.login);

// Tratamento de erros
process.on('uncaughtException', (err) => {
  console.error('Erro não tratado:', err);
});

// Inicie o servidor Node.js na porta 5000 (não use 3306 para o servidor)
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Servidor Node.js rodando na porta ${PORT}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Porta ${PORT} já em uso!`);
    console.log('Execute este comando no PowerShell para resolver:');
    console.log('netstat -ano | findstr :5000');
    console.log('taskkill /PID [PID_ENCONTRADO] /F');
  } else {
    console.error('Erro ao iniciar servidor:', err);
  }
});