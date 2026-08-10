import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import { fileURLToPath } from 'url';
import { authRouter } from './modules/auth/auth.router.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middlewares Globais
app.use(cors());
app.use(express.json()); // Habilita o parse de JSON no body das requisições

// Swagger Documentation
const swaggerDocument = YAML.load(path.join(__dirname, '../../docs/swagger.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Health Check
app.get('/health', (req, res) => {
  res.status(200).send('API está funcionando perfeitamente!');
});

// AQUI VOCÊ VAI IMPORTAR SUAS ROTAS MODULARES DEPOIS!
// Exemplo: app.use('/api/auth', authRoutes);

app.use('/api/auth', authRouter);

export default app;
