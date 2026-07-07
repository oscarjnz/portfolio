import { lazy, Suspense, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import LoadingScreen from "@/components/sections/LoadingScreen";
import Hero from "@/components/sections/Hero";

// Below-the-fold sections are code-split so they never block first paint.
const About = lazy(() => import("@/components/sections/About"));
const Skills = lazy(() => import("@/components/sections/Skills"));
const Work = lazy(() => import("@/components/sections/Work"));
const Certifications = lazy(() => import("@/components/sections/Certifications"));
const Experience = lazy(() => import("@/components/sections/Experience"));
const Beyond = lazy(() => import("@/components/sections/Beyond"));
const Contact = lazy(() => import("@/components/sections/Contact"));

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={null}>
          <About />
          <Skills />
          <Work />
          <Experience />
          <Certifications />
          <Beyond />
          <Contact />
        </Suspense>
      </main>
    </>
  );
}
