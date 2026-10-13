import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Projects from './components/Projects';
import WhyUs from './components/WhyUs';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import Enquiry from './components/Enquiry';
import CTA from './components/CTA';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Projects />
        <WhyUs />
        <Gallery />
        <Testimonials />
        <Enquiry />
        <CTA />
      </main>
      <Footer />
      <Chatbot />
    </>
  );
}
