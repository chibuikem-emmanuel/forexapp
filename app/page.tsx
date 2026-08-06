import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import AboutSection from '@/components/AboutSection';
import OurEdgeSection from '@/components/OurEdgeSection';
import ServicesSection from '@/components/ServicesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#030710] antialiased">
      <Navbar />
      <main>
        <Hero />
        <AboutSection />
        <OurEdgeSection />
        <ServicesSection />
        <section id="why-choose-linkforex">
        <OurEdgeSection />
        </section>
        <TestimonialsSection />
        <Footer />
      </main>
    </div>
  );
}