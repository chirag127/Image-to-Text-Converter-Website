export function Header() {
    return (
        <header className="bg-white shadow-sm border-b">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">OCR</span>
                        </div>
                        <span className="text-xl font-semibold text-gray-900">Free OCR</span>
                    </div>

                    <nav className="hidden md:flex items-center space-x-6">
                        <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
                            Features
                        </a>
                        <a href="#about" className="text-gray-600 hover:text-gray-900 transition-colors">
                            About
                        </a>
                        <a
                            href="https://github.com/chirag127/Image-to-Text-Converter-Website"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            GitHub
                        </a>
                    </nav>
                </div>
            </div>
        </header>
    );
}