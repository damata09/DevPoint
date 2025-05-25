const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');

exports.setupSecurity = (app) => {
  // CORS
  app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
  }));

  // Headers de segurança
  app.use(helmet());

  // Rate limiting
  const limiter = rateLimit({
    max: 100,
    windowMs: 15 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in 15 minutes'
  });
  app.use('/api', limiter);

  // Sanitização de dados
  app.use(mongoSanitize());
  app.use(xss());
  app.use(hpp({
    whitelist: ['points', 'ratingsQuantity'] // Parâmetros permitidos para duplicação
  }));
};