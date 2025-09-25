import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { processImage } from '../services/ocrService';
import { logger } from '../utils/logger';

export async function ocrRoutes(fastify: FastifyInstance) {
  fastify.post('/ocr', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const data = await request.file();

      if (!data) {
        return reply.code(400).send({
          error: 'No file uploaded',
          message: 'Please upload an image file'
        });
      }

      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
      if (!allowedTypes.includes(data.mimetype)) {
        return reply.code(400).send({
          error: 'Invalid file type',
          message: 'Only JPG, PNG, and PDF files are supported'
        });
      }

      // Convert stream to buffer
      const buffer = await data.toBuffer();

      logger.info(`Processing ${data.mimetype} file, size: ${buffer.length} bytes`);

      // Process the image
      const result = await processImage(buffer, data.mimetype);

      return {
        success: true,
        text: result.text,
        correctedText: result.correctedText,
        processingTime: result.processingTime
      };

    } catch (error) {
      logger.error('OCR processing error:', error);

      return reply.code(500).send({
        error: 'Processing failed',
        message: 'Unable to process the image. Please try again.'
      });
    }
  });
}