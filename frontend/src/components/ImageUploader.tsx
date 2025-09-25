import React, { useState, useCallback } from 'react';
import { PhotoIcon, DocumentTextIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { uploadImage } from '../services/api';

interface OCRResult {
    text: string;
    correctedText: string;
    processingTime: number;
}

export function ImageUploader() {
    const [file, setFile] = useState<File | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [result, setResult] = useState<OCRResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [dragActive, setDragActive] = useState(false);
    const [processingStatus, setProcessingStatus] = useState<string>('');

    const handleDrag = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        const files = e.dataTransfer.files;
        if (files && files[0]) {
            handleFileSelect(files[0]);
        }
    }, []);

    const handleFileSelect = (selectedFile: File) => {
        const maxSize = 10 * 1024 * 1024; // 10MB
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];

        if (!allowedTypes.includes(selectedFile.type)) {
            setError('Please upload a JPG, PNG, or PDF file');
            return;
        }

        if (selectedFile.size > maxSize) {
            setError('File size must be less than 10MB');
            return;
        }

        setFile(selectedFile);
        setError(null);
        setResult(null);
    };

    const processImage = async () => {
        if (!file) return;

        setIsProcessing(true);
        setError(null);
        setResult(null);
        setProcessingStatus('Uploading image...');

        try {
            setProcessingStatus('Processing with OCR engine...');
            const response = await uploadImage(file);
            setProcessingStatus('Complete!');
            setResult(response);
        } catch (err) {
            setProcessingStatus('');
            if (err instanceof Error && err.message.includes('timeout')) {
                setError('Processing timeout - please try a smaller image or try again');
            } else {
                setError(err instanceof Error ? err.message : 'Processing failed');
            }
        } finally {
            setIsProcessing(false);
            setTimeout(() => setProcessingStatus(''), 2000);
        }
    };

    const downloadText = (text: string, filename: string) => {
        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="space-y-6">
            {/* Upload Area */}
            <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${dragActive
                    ? 'border-blue-400 bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400'
                    }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                <PhotoIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <div className="space-y-2">
                    <p className="text-lg font-medium text-gray-900">
                        Drop your image here, or{' '}
                        <label className="text-blue-600 hover:text-blue-700 cursor-pointer">
                            browse
                            <input
                                type="file"
                                className="hidden"
                                accept="image/*,.pdf"
                                onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                            />
                        </label>
                    </p>
                    <p className="text-sm text-gray-500">
                        Supports JPG, PNG, PDF up to 10MB
                    </p>
                </div>
            </div>

            {/* Selected File */}
            {file && (
                <div className="bg-white rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <DocumentTextIcon className="h-8 w-8 text-blue-600" />
                            <div>
                                <p className="font-medium text-gray-900">{file.name}</p>
                                <p className="text-sm text-gray-500">
                                    {(file.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={processImage}
                            disabled={isProcessing}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {isProcessing ? 'Processing...' : 'Extract Text'}
                        </button>
                    </div>
                    {processingStatus && (
                        <div className="mt-3 text-sm text-blue-600 font-medium">
                            {processingStatus}
                        </div>
                    )}
                </div>
            )}

            {/* Error */}
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-800">{error}</p>
                </div>
            )}

            {/* Results */}
            {result && (
                <div className="space-y-4">
                    <div className="bg-white rounded-lg border p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">Extracted Text</h3>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => downloadText(result.correctedText, 'extracted-text.txt')}
                                    className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-700"
                                >
                                    <ArrowDownTrayIcon className="h-4 w-4" />
                                    <span>Download</span>
                                </button>
                            </div>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
                            <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono">
                                {result.correctedText || result.text || 'No text found in image'}
                            </pre>
                        </div>

                        <div className="mt-4 text-xs text-gray-500">
                            Processing time: {result.processingTime}ms
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}