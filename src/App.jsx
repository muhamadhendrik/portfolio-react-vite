import Navbar from './components/ui/Navbar';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import TechStack from './components/sections/TechStack';
import Projects from './components/sections/Projects';
import Contact from './components/sections/Contact';
import Footer from './components/ui/Footer';

function App() {
  return (
    <div className="min-h-screen bg-darker">
      <Navbar />
      <main>
        <Hero />
        <About />
        <TechStack />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
