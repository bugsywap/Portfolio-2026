import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Mail, Globe, MessageSquare, User, Sparkles, Video, Briefcase, Phone, MessageCircle, Calendar } from 'lucide-react';

const Contact = () => {
  return (
    <div className="relative w-full h-full pb-12 bg-white text-black font-['Outfit'] flex flex-col items-center">
       <div className="absolute inset-x-12 md:inset-x-[4rem] top-12 md:top-[3rem] h-px bg-black/10 z-30" />

      {/* Extreme Contrast BG blob */}
      <div className="absolute right-[5%] bottom-[10%] -z-10 bg-purple-500/10 w-[500px] h-[500px] blur-[150px] rounded-full" />

      <div className="relative z-20 h-full w-full flex items-center justify-center p-8 md:px-[4rem]">
        <div className="max-w-[1500px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* Left: Huge Headers */}
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4"
            >
              <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-purple-600 text-white text-[10px] font-black uppercase tracking-[0.25em]">
                <Sparkles size={12} className="fill-current" />
                <span>Let's Build</span>
              </div>
              
              <div className="space-y-0">
                <h2 className="text-[clamp(1.5rem,5vw,3.5rem)] lg:text-[clamp(3rem,6vw,4.5rem)] font-black tracking-tighter leading-[0.85] text-black uppercase block w-full whitespace-normal">
                  READY TO <span className="text-purple-600">BUILD</span>
                </h2>
                <h2 className="text-[clamp(1.5rem,5vw,3.5rem)] lg:text-[clamp(3rem,6vw,4.5rem)] font-black tracking-tighter leading-[0.85] text-zinc-300 uppercase block w-full whitespace-normal">
                  GET IN TOUCH
                </h2>
              </div>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-2xl text-zinc-500 max-w-xl font-bold leading-tight"
            >
              "Whether it's a new brand identity, a technical web solution, or creative AI production—I'm ready to collaborate."
            </motion.p>
          </div>

          {/* Right: Modern Contact Interaction */}
          <div className="space-y-12">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="space-y-10"
            >
              <a href="mailto:ollerogabe@gmail.com" className="group block space-y-2">
                <span className="text-[10px] font-black text-purple-600 uppercase tracking-widest leading-none">Drop an Email</span>
                <div className="flex items-center gap-4 group-hover:gap-8 transition-all duration-500">
                   <h3 className="text-xl sm:text-2xl md:text-5xl font-black text-black break-all">ollerogabe@gmail.com</h3>
                   <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-zinc-100 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-300">
                     <ArrowUpRight size={32} />
                   </div>
                </div>
                <div className="h-0.5 w-full bg-zinc-100 group-hover:bg-purple-600 origin-left transition-all duration-500" />
              </a>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
                  {[
                    { icon: Globe, label: 'LinkedIn', href: 'https://www.linkedin.com/in/gabe-ollero-21936b274/' },
                    { icon: Calendar, label: 'Book a Call', href: 'https://calendar.app.google/yXx1NmKxWnycJXQt9' },
                    { icon: MessageCircle, label: 'WhatsApp', href: 'https://wa.me/639472738133' },
                    { icon: Mail, label: 'Instagram', href: 'https://www.instagram.com/dzadiig/' },
                    { icon: Briefcase, label: 'TikTok', href: 'https://www.tiktok.com/@bugsywap' }
                  ].map((social, i) => (
                    <motion.a 
                     key={i}
                     whileHover={{ y: -5 }}
                     href={social.href} 
                     target={social.href.startsWith('http') ? "_blank" : undefined}
                     rel="noopener noreferrer"
                     className="p-4 rounded-[1.5rem] bg-zinc-50 border border-zinc-100 flex flex-col items-center justify-center space-y-3 transition-colors hover:bg-white hover:shadow-xl hover:shadow-black/5 group relative"
                    >
                      <social.icon size={20} className="text-zinc-300 group-hover:text-purple-600 transition-colors" />
                      <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">{social.label}</span>
                    </motion.a>
                  ))}
               </div>

              <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-8">


                <div className="text-right">
                  <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">&copy; {new Date().getFullYear()} Gabriel Albert Ollero</p>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
