import Fastify from 'fastify';
import multipart from '@fastify/multipart';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';
import { ocrRoutes } from './routes/ocr';
import { logger } from './utils/logger';

const fastify = Fastify({
  logger: true
});

async function start() {
  try {
    // Security middleware
    await fastify.register(helmet);

    // CORS configuration
    await fastify.register(cors, {
      origin: process.env.NODE_ENV === 'production'
        ? ['https://image-to-text-converter-website.vercel.app', 'https://free-ocr.vercel.app']
        : true
    });

    // Rate limiting
    await fastify.register(rateLimit, {
      max: 20,
      timeWindow: '1 hour',
      errorResponseBuilder: () => ({
        error: 'Rate limit exceeded',
        message: 'Too many requests. Please try again later.'
      })
    });

    // File upload support
    await fastify.register(multipart, {
      limits: {
        fileSize: 10 * 1024 * 1024 // 10MB
      }
    });

    // Routes
    await fastify.register(ocrRoutes, { prefix: '/api' });

    // Health check
    fastify.get('/health', async () => {
      return {
        status: 'ok',
        timestamp: new Date().toISOString(),
        tesseract: 'ready'
      };
    });

    // Simple test endpoint
    fastify.get('/api/test', async () => {
      return {
        message: 'OCR API is working!',
        timestamp: new Date().toISOString()
      };
    });

    const port = parseInt(process.env.PORT || '3000');
    await fastify.listen({ port, host: '0.0.0.0' });

    logger.info(`Server running on port ${port}`);
  } catch (err) {
    logger.error('Error starting server:', err);
    process.exit(1);
  }
}

start();