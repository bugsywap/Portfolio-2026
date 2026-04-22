import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code2, Palette, Cpu, Sparkles, Zap, Smartphone, Globe, Layers, 
  X, Terminal, Box, Database, 
  Layout, Image as ImageIcon, Video,
  MousePointer2, Mail, TrendingUp, Brush, 
  Lightbulb, MessageSquare, Ear, RefreshCw, PenTool, Component
} from 'lucide-react';

const webSkills = [
  { name: 'Web Design', icon: Layout, color: '#0ea5e9', category: 'Web Development' },
  { name: 'Cursor', icon: MousePointer2, color: '#3b82f6', category: 'Web Development' },
  { name: 'MailChimp', icon: Mail, color: '#facc15', category: 'Web Development' },
  { name: 'HTML', icon: Globe, color: '#e34f26', category: 'Web Development' },
  { name: 'CSS', icon: Layers, color: '#1572b6', category: 'Web Development' },
  { name: 'Tailwind', icon: Zap, color: '#06b6d4', category: 'Web Development' },
  { name: 'JS', icon: Code2, color: '#f7df1e', category: 'Web Development' }
];

const designSkills = [
  { name: 'AI Generation', icon: Sparkles, color: '#c026d3', category: 'Graphic Design' },
  { name: 'Graphic Design', icon: Palette, color: '#ea580c', category: 'Graphic Design' },
  { name: 'Adobe Photoshop', icon: ImageIcon, color: '#1d4ed8', category: 'Graphic Design' },
  { name: 'Figma', icon: Component, color: '#a855f7', category: 'Graphic Design' },
  { name: 'Canva', icon: PenTool, color: '#06b6d4', category: 'Graphic Design' }
];

const proSkills = [
  { name: 'Multitasking', icon: Layers, color: '#10b981', category: 'Professional' },
  { name: 'Problem - Solving', icon: Lightbulb, color: '#f59e0b', category: 'Professional' },
  { name: 'Strong Communication', icon: MessageSquare, color: '#3b82f6', category: 'Professional' },
  { name: 'Active Listening', icon: Ear, color: '#6366f1', category: 'Professional' },
  { name: 'Adaptability', icon: RefreshCw, color: '#ec4899', category: 'Professional' }
];

const SkillBubble = ({ skill, index }: { skill: any, index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="relative z-10 w-full flex flex-col items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Message Bubble Tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute bottom-full inset-x-0 flex justify-center mb-4 z-50 pointer-events-none"
          >
            <div className="relative bg-black text-white px-4 py-2 rounded-xl shadow-xl border border-white/10 whitespace-nowrap">
              <span className="text-[10px] font-black uppercase tracking-widest">{skill.name}</span>
              {/* Arrow */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-black" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Circle Skill Icon */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        className={`
          w-[85px] h-[85px] rounded-full bg-white border border-zinc-100 
          flex items-center justify-center shadow-sm relative overflow-hidden
          transition-colors duration-300
          ${isHovered ? 'border-purple-600/30 shadow-md' : ''}
        `}
      >
        {/* Inner Hover Color Overlay - Strictly contained in circle */}
        <motion.div 
          initial={false}
          animate={{ opacity: isHovered ? 0.08 : 0 }}
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundColor: skill.color }}
        />
        
        <skill.icon 
          size={28} 
          style={{ color: isHovered ? skill.color : '#a1a1aa' }} 
          className="transition-colors duration-300"
        />
      </motion.div>
    </div>
  );
};

const Skills = () => {
  return (
    <div className="relative w-full h-full bg-white text-black font-['Outfit'] overflow-hidden">
      {/* Background Grid Lines */}
       <div className="absolute inset-x-12 md:inset-x-[4rem] top-12 md:top-[3rem] h-px bg-black/10 z-0" />
       <div className="absolute inset-x-12 md:inset-x-[4rem] bottom-12 md:bottom-[3rem] h-px bg-black/10 z-0" />

      {/* Background Decor Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/5 blur-[150px] rounded-full -z-10" />

      <div className="relative z-20 w-full h-full flex flex-col pb-24 px-8 md:px-[4rem] pt-16 lg:pt-24">
        
        {/* Header Section */}
        <div className="max-w-[1300px] w-full mx-auto mb-20">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-8"
          >
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-purple-600 text-white text-[10px] font-black uppercase tracking-[0.25em]">
                <Sparkles size={12} className="fill-current" />
                <span>Interactive Arsenal</span>
              </div>
              <div className="space-y-0">
                <h2 className="text-[clamp(1.8rem,5vw,3.5rem)] font-black tracking-tighter leading-[0.85] text-black uppercase block">
                  EXPLORE <span className="text-purple-600">CAPABILITIES</span>
                </h2>
                <h2 className="text-[clamp(1.8rem,5vw,3.5rem)] font-black tracking-tighter leading-[0.85] text-zinc-300 uppercase block">
                  CRAFTED SOLUTIONS
                </h2>
              </div>
            </div>

            <p className="text-lg text-zinc-500 max-w-sm font-medium leading-tight italic border-l-4 border-purple-600 pl-6">
              "Mastery is a precise collection of specialized instruments for the digital era."
            </p>
          </motion.div>
        </div>

        {/* Categorized Grid */}
        <div className="flex-1 w-full max-w-[1300px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 lg:gap-20 relative">
          
          {/* Column 1: Web Development */}
          <div className="flex flex-col space-y-10 items-center lg:items-start">
             <div className="flex items-center space-x-3 opacity-50 mb-2">
                <div className="w-8 h-px bg-black" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Web Development</span>
             </div>
             <div className="grid grid-cols-3 gap-x-6 gap-y-10 justify-items-center lg:justify-items-start">
               {webSkills.map((skill, i) => (
                 <SkillBubble key={skill.name} skill={skill} index={i} />
               ))}
             </div>
          </div>

          {/* Column 2: Graphic Design */}
          <div className="flex flex-col space-y-10 items-center lg:items-center">
             <div className="flex items-center space-x-3 opacity-50 mb-2">
                <div className="w-8 h-px bg-black" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Graphic Design & AI</span>
             </div>
             <div className="grid grid-cols-3 gap-x-6 gap-y-10 justify-items-center">
               {designSkills.map((skill, i) => (
                 <SkillBubble key={skill.name} skill={skill} index={i + 10} />
               ))}
             </div>
          </div>

          {/* Column 3: Professional Attributes */}
          <div className="flex flex-col space-y-10 items-center lg:items-end">
             <div className="flex items-center space-x-3 opacity-50 mb-2 lg:flex-row-reverse lg:space-x-reverse">
                <div className="w-8 h-px bg-black" />
                <span className="text-[10px] font-black uppercase tracking-[0.25em]">Professional Attributes</span>
             </div>
             <div className="grid grid-cols-3 gap-x-6 gap-y-10 justify-items-center lg:justify-items-end">
               {proSkills.map((skill, i) => (
                 <SkillBubble key={skill.name} skill={skill} index={i + 20} />
               ))}
             </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Skills;
