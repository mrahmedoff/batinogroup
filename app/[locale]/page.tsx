import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Projects from '@/components/Projects';
import Partners from '@/components/Partners';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <Hero />
        <Services />
        <Projects />
        <Partners />
      </main>
      <Footer />
    </div>
  );
}
