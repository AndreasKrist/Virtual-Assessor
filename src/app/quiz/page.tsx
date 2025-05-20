import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { QuizForm } from './components';

export default function Quiz() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <QuizForm />
      </main>
      
      <Footer />
    </div>
  );
}