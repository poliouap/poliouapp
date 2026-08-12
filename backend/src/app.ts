import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import { fileURLToPath } from 'url';
import { authRouter } from './modules/auth/auth.router.js';
import { userRouter } from './modules/user/user.router.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middlewares Globais
app.use(cors({
  origin: [
    "http://localhost:3000", 
    "https://poliouapp.vercel.app"
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true
}));
app.use(express.json()); // Habilita o parse de JSON no body das requisições
app.use(cookieParser()); // Habilita a leitura de cookies nas requisições

// Swagger Documentation
const swaggerDocument = YAML.load(path.join(__dirname, '../docs/swagger.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Health Check
app.get('/health', (req, res) => {
  res.status(200).send('API está funcionando perfeitamente!');
});

import { errorMiddleware } from './core/middlewares/error.middleware.js';

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);

// Middleware global de tratamento de erros SEMPRE por último!
app.use(errorMiddleware as any);


export default app;
