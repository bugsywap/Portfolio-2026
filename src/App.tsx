import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Mail, Globe, MessageSquare, User, Sparkles, Video, Briefcase, Phone, Calendar } from 'lucide-react';
import './App.css';
import { Header } from '@/components/ui/header-2';
import HalideLanding from './components/ui/halide-landing';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';

function App() {
  const [activeSection, setActiveSection] = useState<number>(0);
  const [direction, setDirection] = useState<number>(1); // 1 for forward/down, -1 for backward/up
  const isTransitioning = useRef(false);

  const totalSections = 5;

  useEffect(() => {
    let touchStartY = 0;
    
    const handleWheel = (e: any) => {
      if (isTransitioning.current) return;

      const scrollContainer = (e.target as any).closest('.overflow-auto');
      if (scrollContainer) {
        const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
        if (e.deltaY > 0 && Math.ceil(scrollTop + clientHeight) < scrollHeight - 2) return;
        if (e.deltaY < 0 && scrollTop > 2) return;
        if (Math.abs(e.deltaY) < 30) return; 
      }

      if (e.deltaY > 40) {
        if (activeSection < totalSections - 1) {
          setDirection(1);
          isTransitioning.current = true;
          setActiveSection(prev => prev + 1);
        }
      } else if (e.deltaY < -40) {
        if (activeSection > 0) {
          setDirection(-1);
          isTransitioning.current = true;
          setActiveSection(prev => prev - 1);
        }
      }
    };

    const handleTouchStart = (e: any) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: any) => {
      if (isTransitioning.current) return;
      
      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY - touchEndY;

      // Ensure we're not inside an overflow container that's currently scrolling
      const scrollContainer = (e.target as any).closest('.overflow-auto');
      if (scrollContainer) {
        const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
        if (deltaY > 0 && Math.ceil(scrollTop + clientHeight) < scrollHeight - 2) return;
        if (deltaY < 0 && scrollTop > 2) return;
      }

      if (Math.abs(deltaY) > 50) {
        if (deltaY > 0 && activeSection < totalSections - 1) {
          setDirection(1);
          isTransitioning.current = true;
          setActiveSection(prev => prev + 1);
        } else if (deltaY < 0 && activeSection > 0) {
          setDirection(-1);
          isTransitioning.current = true;
          setActiveSection(prev => prev - 1);
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [activeSection, totalSections]);

  // Trigger internal CSS animations every time a new slide renders
  useEffect(() => {
    const timer = setTimeout(() => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach(el => el.classList.add('is-visible'));
    }, 100);
    return () => clearTimeout(timer);
  }, [activeSection]);

  // Unlock transitions after the animation finishes
  const onAnimationComplete = () => {
    isTransitioning.current = false;
  };

  // Define transitions for each exact step
  // 0 -> 1: Camera moves Right (Content moves Left, Next enters from Right)
  // 1 -> 2: Camera moves Down (Content moves Up, Next enters from Bottom)
  // 2 -> 3: Camera moves Left (Content moves Right, Next enters from Left)
  // 3 -> 4: Camera moves Right (Content moves Left, Next enters from Right)

  const getVariants = (index: number, dir: number) => {
    // Going backwards reverses the entrance logic!
    
    if (index === 0) {
      // Hero (Slide 0)
      return {
        enter: { x: dir === 1 ? '100vw' : '-100vw', y: 0, opacity: 1 }, // Enter backwards from Left
        center: { x: 0, y: 0, opacity: 1 },
        exit: { x: dir === 1 ? '-100vw' : '100vw', y: 0, opacity: 1 } // Exit forwards to Left
      };
    }
    
    if (index === 1) {
      // About (Slide 1) - Arrives from Right (x: 100vw -> 0)
      return {
        enter: { x: dir === 1 ? '100vw' : 0, y: dir === 1 ? 0 : '-100vh', opacity: 1 },
        center: { x: 0, y: 0, opacity: 1 },
        exit: { x: dir === 1 ? 0 : '100vw', y: dir === 1 ? '-100vh' : 0, opacity: 1 }
      };
    }

    if (index === 2) {
      // Skills (Slide 2) - Arrives from Bottom (y: 100vh -> 0)
      return {
        enter: { x: dir === 1 ? 0 : '-100vw', y: dir === 1 ? '100vh' : 0, opacity: 1 },
        center: { x: 0, y: 0, opacity: 1 },
        exit: { x: dir === 1 ? '100vw' : 0, y: dir === 1 ? 0 : '100vh', opacity: 1 }
      };
    }

    if (index === 3) {
      // Projects (Slide 3) - Arrives from Left (x: -100vw -> 0)
      return {
        enter: { x: dir === 1 ? '-100vw' : '100vw', y: 0, opacity: 1 },
        center: { x: 0, y: 0, opacity: 1 },
        exit: { x: dir === 1 ? '-100vw' : '100vw', y: 0, opacity: 1 }
      };
    }

    if (index === 4) {
      // Contact (Slide 4) - Arrives from Right (x: 100vw -> 0)
      return {
        enter: { x: '100vw', y: 0, opacity: 1 },
        center: { x: 0, y: 0, opacity: 1 },
        exit: { x: '100vw', y: 0, opacity: 1 }
      };
    }
  };

  const socialLinks = [
    { icon: Globe, href: 'https://www.linkedin.com/in/gabe-ollero-21936b274/' },
    { icon: Calendar, href: 'https://calendar.app.google/yXx1NmKxWnycJXQt9' },
    { icon: MessageSquare, href: 'https://wa.me/639472738133' }, // WhatsApp
    { icon: Mail, href: 'https://www.instagram.com/dzadiig/' },
    { icon: Briefcase, href: 'https://www.tiktok.com/@bugsywap' },
  ];

  const navLinks = [
    { label: 'HOME', href: '#' },
    { label: 'ABOUT', href: '#' },
    { label: 'SKILLS', href: '#' },
    { label: 'WORK', href: '#' },
  ];

  return (
    <div className="bg-background min-h-screen text-foreground overflow-hidden fixed w-full h-full">
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />

      <AnimatePresence initial={false} custom={direction} onExitComplete={onAnimationComplete}>
        
        {activeSection === 0 && (
          <motion.div
            key="hero"
            custom={direction}
            variants={getVariants(0, direction)}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
            onAnimationComplete={onAnimationComplete}
            className="absolute top-0 left-0 w-full h-full"
          >
            <HalideLanding onViewProjects={() => setActiveSection(3)} />
          </motion.div>
        )}

        {activeSection === 1 && (
          <motion.div
            key="about"
            custom={direction}
            variants={getVariants(1, direction)}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
            onAnimationComplete={onAnimationComplete}
            className="absolute top-0 left-0 w-full h-full bg-background flex flex-col items-center justify-start overflow-auto pt-28"
          >
            <About />
          </motion.div>
        )}

        {activeSection === 2 && (
          <motion.div
            key="skills"
            custom={direction}
            variants={getVariants(2, direction)}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
            onAnimationComplete={onAnimationComplete}
            className="absolute top-0 left-0 w-full h-full bg-background flex flex-col items-center justify-start overflow-auto pt-28"
          >
             <div className="w-full h-full"><Skills /></div>
          </motion.div>
        )}

        {activeSection === 3 && (
          <motion.div
            key="projects"
            custom={direction}
            variants={getVariants(3, direction)}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
            onAnimationComplete={onAnimationComplete}
            className="absolute top-0 left-0 w-full h-full bg-background flex flex-col items-center justify-start overflow-auto pt-28"
          >
            <div className="w-full h-full pb-16"><Projects /></div>
          </motion.div>
        )}

        {activeSection === 4 && (
          <motion.div
            key="contact"
            custom={direction}
            variants={getVariants(4, direction)}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
            onAnimationComplete={onAnimationComplete}
            className="absolute top-0 left-0 w-full h-full bg-background flex flex-col items-center justify-start overflow-hidden pt-28"
          >
            <Contact />
          </motion.div>
        )}

      </AnimatePresence>
      
      {/* Scroll Indicator */}
      <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-50 flex space-x-3">
        {[0, 1, 2, 3, 4].map((idx) => (
          <div 
            key={idx} 
            className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${activeSection === idx ? 'bg-purple-600 scale-125' : 'bg-zinc-300'}`}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
