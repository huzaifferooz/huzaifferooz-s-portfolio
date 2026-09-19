import Intro from "@/components/Intro";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import About from "@/components/About";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <main className="relative z-10">
      <Intro />
      <Hero />
      <Projects />
      <Skills />
      <About />
      <Footer />
    </main>
  );
}
