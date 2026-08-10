import rateLimit from "express-rate-limit";


export const loginRateLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    limit: 10,
    message: {error: "Muitas tentativas de login. Por favor, aguarde 1 minuto antes de tentar novamente."},
    standardHeaders: true, // Retorna os headers informando o limite (bom padrão)
    legacyHeaders: false, // Desabilita os headers antigos (X-RateLimit-*)
})