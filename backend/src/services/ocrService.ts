import Tesseract from 'tesseract.js';
import { logger } from '../utils/logger';

export interface OCRResult {
  text: string;
  correctedText: string;
  processingTime: number;
}

export async function processImage(buffer: Buffer, mimeType: string): Promise<OCRResult> {
  const startTime = Date.now();

  try {
    logger.info(`Starting OCR processing for ${mimeType} file (${buffer.length} bytes)...`);

    // Use simple Tesseract.recognize without persistent worker to avoid initialization issues
    const { data: { text } } = await Tesseract.recognize(buffer, 'eng', {
      logger: m => {
        if (m.status === 'recognizing text') {
          logger.info(`Tesseract: ${m.status} - ${Math.round(m.progress * 100)}%`);
        }
      }
    });

    logger.info(`OCR completed. Extracted ${text.length} characters.`);

    // Simple text cleanup
    const correctedText = text
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .replace(/\n\s*\n/g, '\n') // Remove empty lines
      .trim();

    const processingTime = Date.now() - startTime;

    logger.info(`Processing completed in ${processingTime}ms`);

    return {
      text: text.trim(),
      correctedText: correctedText,
      processingTime
    };

  } catch (error) {
    logger.error('OCR processing failed:', error);
    throw new Error(`Failed to process image: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}