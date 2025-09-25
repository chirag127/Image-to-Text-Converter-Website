import { processImage } from '../services/ocrService';
import fs from 'fs';
import path from 'path';

// Mock Tesseract for testing
jest.mock('tesseract.js', () => ({
  recognize: jest.fn().mockResolvedValue({
    data: { text: 'Sample extracted text from image' }
  })
}));

describe('OCR Service', () => {
  it('should process image and return text', async () => {
    // Create a mock image buffer
    const mockBuffer = Buffer.from('mock image data');

    const result = await processImage(mockBuffer, 'image/jpeg');

    expect(result).toHaveProperty('text');
    expect(result).toHaveProperty('correctedText');
    expect(result).toHaveProperty('processingTime');
    expect(typeof result.processingTime).toBe('number');
  });

  it('should handle processing errors gracefully', async () => {
    const Tesseract = require('tesseract.js');
    Tesseract.recognize.mockRejectedValueOnce(new Error('OCR failed'));

    const mockBuffer = Buffer.from('invalid image data');

    await expect(processImage(mockBuffer, 'image/jpeg')).rejects.toThrow('Failed to process image');
  });
});