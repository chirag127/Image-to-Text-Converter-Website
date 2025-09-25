import React from 'react';

export function Footer() {
    return (
        <footer className="bg-white border-t mt-12">
            <div className="container mx-auto px-4 py-8">
                <div className="grid md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-3">Free OCR</h3>
                        <p className="text-gray-600 text-sm">
                            Privacy-focused, open-source image-to-text converter powered by AI.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-medium text-gray-900 mb-3">Features</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li>• AI-powered text extraction</li>
                            <li>• Support for JPG, PNG, PDF</li>
                            <li>• No registration required</li>
                            <li>• Privacy-first approach</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-medium text-gray-900 mb-3">Open Source</h4>
                        <p className="text-sm text-gray-600 mb-2">
                            This project is open source and available on GitHub.
                        </p>
                        <a
                            href="https://github.com/your-username/ocr-app"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                        >
                            View on GitHub →
                        </a>
                    </div>
                </div>

                <div className="border-t mt-8 pt-6 text-center text-sm text-gray-500">
                    <p>&copy; 2024 Free OCR. Made with ❤️ for the community.</p>
                </div>
            </div>
        </footer>
    );
}