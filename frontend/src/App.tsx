import { ImageUploader } from './components/ImageUploader';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

function App() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />

            <main className="flex-1 container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            Free Image to Text Converter
                        </h1>
                        <p className="text-xl text-gray-600 mb-2">
                            Extract text from images using AI-powered OCR technology
                        </p>
                        <p className="text-sm text-gray-500">
                            Upload JPG, PNG, or PDF files up to 10MB • 100% Free • No Registration Required
                        </p>
                    </div>

                    <ImageUploader />
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default App;