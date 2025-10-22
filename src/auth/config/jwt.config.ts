import { registerAs } from "@nestjs/config";

export default registerAs('jwt', () => {
  return {
    secret: process.env.JWT_SECRET || 'fallback-secret',
    audience: process.env.JWT_TOKEN_AUDIENCE || 'http://localhost:3000',
    issuer: process.env.JWT_TOKEN_ISSUER || 'http://localhost:3000',
    jwtTtl: parseInt(process.env.JWT_TTL_SECONDS || '2592000'), // 30 dias em segundos
  }
})