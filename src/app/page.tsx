import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6 text-blue-600">
            Assess Your IT Knowledge
          </h1>
          <p className="text-lg mb-8 text-gray-700">
            Welcome to our IT Knowledge Assessment tool. This quiz will help identify your
            strengths and areas for improvement in general computing, networking, and cybersecurity.
            Based on your responses, we'll recommend courses tailored to your needs.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h2 className="text-xl font-semibold mb-3 text-blue-600">General IT</h2>
              <p className="text-gray-600 mb-4">Basic computer operations, file management, and software usage.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h2 className="text-xl font-semibold mb-3 text-blue-600">Networking</h2>
              <p className="text-gray-600 mb-4">Internet connectivity, Wi-Fi setup, and network troubleshooting.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h2 className="text-xl font-semibold mb-3 text-blue-600">Cybersecurity</h2>
              <p className="text-gray-600 mb-4">Password management, safe browsing, and protection against threats.</p>
            </div>
          </div>
          
          <Link 
            href="/quiz" 
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            Start Assessment
          </Link>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}