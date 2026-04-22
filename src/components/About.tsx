import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Sparkles, Code, Palette } from 'lucide-react';

const images = [
  '/img/sld1.jpg',
  '/img/sld2.jpg',
  '/img/sld3.jpg',
];

const About = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const getCardIndex = (index: number) => {
    return (index - currentIndex + images.length) % images.length;
  };

  return (
    <div className="relative w-full h-full bg-white text-black font-['Outfit']">
      {/* Halide Style Container Edges */}
      <div className="absolute inset-x-12 md:inset-x-[4rem] top-12 md:top-[3rem] h-px bg-black/10 z-30" />
      <div className="absolute inset-x-12 md:inset-x-[4rem] bottom-12 md:bottom-[3rem] h-px bg-black/10 z-30" />

      <div className="relative z-20 w-full flex flex-col items-center justify-start p-6 md:p-8 md:px-[4rem] pt-16 lg:pt-24">
        <div className="max-w-[1300px] w-full flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-20 items-center lg:items-center">
          
          <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] w-full flex items-center justify-center lg:justify-start order-1 lg:order-1 lg:mt-0">
            <div className="relative w-[320px] h-[340px] sm:w-[380px] sm:h-[420px] md:w-[460px] md:h-[520px] lg:w-[420px] lg:h-[580px] lg:ml-[-2rem]">
              <AnimatePresence mode="popLayout">
                {images.map((src, i) => {
                  const position = getCardIndex(i);
                  if (position > 2) return null;

                  return (
                    <motion.div
                      key={src}
                      initial={{ opacity: 0, x: 100, scale: 0.9 }}
                      animate={{
                        opacity: 1 - position * 0.3,
                        scale: 1 - position * 0.08,
                        x: position * -30,
                        y: position * -20,
                        zIndex: 10 - position,
                        rotate: position * -2,
                      }}
                      exit={{ 
                        x: 600, 
                        opacity: 0, 
                        rotate: 15,
                        transition: { duration: 0.8, ease: [0.32, 0.72, 0, 1] } 
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 90,
                        damping: 20,
                      }}
                      className="absolute inset-0 rounded-[2.5rem] overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] md:shadow-[0_45px_100px_-20px_rgba(0,0,0,0.35)] border-[6px] md:border-[8px] border-white ring-1 ring-black/5"
                    >
                      <img 
                        src={src} 
                        alt="" 
                        className="w-full h-full object-cover transition-all duration-700"
                        loading="eager"
                        decoding="async"
                      />
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

          {/* Right/Bottom: Content */}
          <div className="flex flex-col space-y-8 md:space-y-5 items-start text-left order-2 lg:order-2 mt-12 lg:mt-0">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4 w-full"
            >
              <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-purple-600 text-white text-[9px] font-black uppercase tracking-[0.2em]">
                <Sparkles size={12} className="fill-current" />
                <span>Creative Identity</span>
              </div>
              
              <div className="space-y-0 relative">
                <h2 className="text-[clamp(2.5rem,12vw,6rem)] lg:text-[clamp(2.5rem,3.5vw,3rem)] font-black tracking-tighter leading-[0.8] text-black uppercase block w-full">
                  DRIVEN BY <span className="text-purple-600">PASSION</span>
                </h2>
                <h2 className="text-[clamp(2.5rem,12vw,6rem)] lg:text-[clamp(2.5rem,3.5vw,3rem)] font-black tracking-tighter leading-[0.8] text-zinc-200 uppercase block w-full mt-[-0.2em] lg:mt-0">
                  DEFINED BY DESIGN
                </h2>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8 md:space-y-4 w-full"
            >
              <div className="space-y-4">
                <p className="text-2xl md:text-2xl text-black leading-tight font-black tracking-tight">
                  Hi! I'm <span className="text-purple-600 underline decoration-purple-600/20 underline-offset-8">Gabriel Albert Ollero</span>.
                </p>
                <p className="text-base md:text-base text-zinc-600 max-w-xl font-medium leading-relaxed">
                  A highly motivated, self-taught designer with 6 years of hands-on experience in graphic design, specializing in logos, brand identity, and ad creatives. Continuously driven to learn and improve, with a strong ability to leverage various software tools to streamline workflows and boost productivity. Also served as the developer for the Capstone Project, DentaSync.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 max-w-2xl">
                {[
                  "Flyers", "Posters", "IG Posts", "SocMed", 
                  "AI Videos", "AI Images", "Web Design", 
                  "Web Development"
                ].map((tag) => (
                  <span key={tag} className="px-4 py-2 bg-white text-black border-2 border-black rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-purple-600 hover:text-white hover:border-purple-600 transition-all duration-300 cursor-default shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none translate-y-[-2px] hover:translate-y-0 active:translate-y-0">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                <div className="group p-6 rounded-[2rem] bg-white border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-300 flex flex-col space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white shadow-sm flex items-center justify-center transition-transform group-hover:rotate-6">
                    <Palette size={24} />
                  </div>
                  <div>
                    <h4 className="font-black text-black uppercase text-xs tracking-widest">Visual Specialist</h4>
                    <p className="text-[10px] text-zinc-500 mt-1 leading-none font-semibold uppercase tracking-tight">Branding & Mascots Specialist</p>
                  </div>
                </div>

                <div className="group p-6 rounded-[2rem] bg-white border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-300 flex flex-col space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-black text-white shadow-sm flex items-center justify-center transition-transform group-hover:-rotate-6">
                    <Code size={24} />
                  </div>
                  <div>
                    <h4 className="font-black text-black uppercase text-xs tracking-widest">Tech Lead</h4>
                    <p className="text-[10px] text-zinc-500 mt-1 leading-none font-semibold uppercase tracking-tight">Full-Stack & Project Management</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6 pt-4">
                <a 
                  href="/Resume - Gabriel Ollero (New).pdf"
                  download
                  className="group relative inline-flex items-center justify-center gap-4 px-10 py-6 bg-black text-white rounded-full font-black text-xs uppercase tracking-[0.2em] overflow-hidden transition-all duration-300 active:scale-95 shadow-[8px_8px_0px_0px_rgba(147,51,234,0.3)] hover:shadow-none"
                  style={{ clipPath: 'polygon(0 0, 100% 0, 100% 75%, 90% 100%, 0 100%)' }}
                >
                  <Download size={20} className="transition-transform group-hover:-translate-y-1" />
                  <span>Download CV</span>
                  <div className="absolute inset-0 bg-purple-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500 -z-10" />
                </a>
                
                <div className="flex items-center gap-4 py-3 px-6 bg-zinc-50 rounded-full border border-zinc-200">
                  <div className="flex -space-x-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-zinc-300 overflow-hidden ring-1 ring-transparent hover:ring-purple-600/20 transition-all">
                        <img src={`/img/sld${i}.jpg`} alt="" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                  <span className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">6+ Years Exp</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
