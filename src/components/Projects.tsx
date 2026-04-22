import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowUpRight, Sparkles, Globe, Palette, Image as ImageIcon, Video, 
  ArrowLeft, ExternalLink, Play, Pause, X, RotateCcw, Volume2, VolumeX, Maximize2
} from 'lucide-react';

// --- DATA ---
const projectData = {
  websites: [
    { id: "web-1", title: "TARAKI", type: "Web Dev & Design", year: "2024", img: "/img/projects/taraki.png", link: "https://taraki.vercel.app/", category: "Tech", desc: "Hyper-functional interface design with a focus on seamless user flow." },
    { id: "web-2", title: "JAIDEE AND KO", type: "Brand Experience", year: "2023", img: "/img/projects/jaidee.png", link: "https://jaideeandko.com/", category: "Corporate", desc: "A narrative-driven corporate presence for high-tier video production." },
    { id: "web-3", title: "CEREBRO WORKFORCE", type: "Technical Solution", year: "2024", img: "/img/projects/cerebro.png", link: "https://cerebroworkforce.com/", category: "Tech", desc: "Enterprise-grade architecture for industrial workforce management." },
    { id: "web-4", title: "WEALTHTREE LIMITED", type: "Wealth Management", year: "2024", img: "/img/projects/wealthtree.png", link: "https://wealthtreelimited.com/eng", category: "Finance", desc: "Minimalist luxury fin-tech experience with high-security visual language." },
    { id: "web-5", title: "CALYX CPA", type: "Financial Group", year: "2023", img: "/img/projects/calyxcpa.png", link: "https://www.calyxcpa.com/", category: "Finance", desc: "Modern accounting firm identity transformed into a digital-first platform." },
  ],
  logos: [
    { id: "logo-1", title: "TAN REAL ESTATE", type: "Identity", img: "/img/logos/4.png", category: "Minimal", desc: "Strategic visual identity for a professional real estate agency." },
    { id: "logo-2", title: "UNDERGROUNDZ TATTOO", type: "Branding", img: "/img/logos/ug.png", category: "System", desc: "A bold, sub-culture inspired identity for Baguio's premier tattoo studio." },
    { id: "logo-3", title: "INKY NOTES", type: "Visual ID", img: "/img/logos/Client(InkPen).jpg", category: "Visual ID", desc: "Hand-crafted identity for a Philippines-based artist and entrepreneur." },
    { id: "logo-4", title: "ACIAO'S", type: "Logo Design", img: "/img/logos/Aciaos-50cm.jpg", category: "System", desc: "Modern branding for a Manila food stall specializing in fried noodles and dimsum." },
    { id: "logo-5", title: "RETROPHILE TOWN", type: "Modern Logo", img: "/img/logos/retro.png", category: "Minimal", desc: "Nostalgic, high-impact branding for a famous Baguio thrift institution." },
    { id: "logo-6", title: "CHAN-ON JAPAN SURPLUS", type: "Minimalist", img: "/img/logos/co.png", category: "Minimal", desc: "Identity for a renowned surplus shop and international logistics partner." },
    { id: "logo-7", title: "VAPORVILLE", type: "Industry Logo", img: "/img/logos/vape.jpg", category: "Visual ID", desc: "Modern visual language for a high-end Pangasinan-based vape boutique." },
    { id: "logo-8", title: "THE NORTH", type: "Mark", img: "/img/logos/tn.png", category: "Minimal", desc: "Esports identity developed for a competitive Valorant school team." },
    { id: "logo-9", title: "KAT & PASTE", type: "Typography", img: "/img/logos/ate.jpg", category: "Typography", desc: "Creative typographic identity for a local Baguio thifting brand." },
    { id: "logo-10", title: "6410", type: "Symbol", img: "/img/logos/6410.jpg", category: "Minimal", desc: "Streamer-focused personal brand identity for a Baguio digital creator." },
  ],
  mascots: [
    { id: "mas-1", title: "FOX CHARACTER", img: "/img/mascots/fox.png", category: "Character" },
    { id: "mas-2", title: "BEE MASCOT", img: "/img/mascots/bee.png", category: "Character" },
    { id: "mas-3", title: "SKULL CHARACTER", img: "/img/mascots/skull.png", category: "Illustration" },
    { id: "mas-4", title: "PEBBLE CHARACTER", img: "/img/mascots/pebble.png", category: "Illustration" },
    { id: "mas-5", title: "LAMA MASCOT", img: "/img/mascots/lama.png", category: "Character" },
    { id: "mas-6", title: "SAGE CHARACTER", img: "/img/mascots/sage.png", category: "Illustration" },
  ],
  aiGens: Array.from({ length: 25 }, (_, i) => ({
    id: `ai-${i + 1}`,
    title: `AI EXPERIMENT #${i + 1}`,
    img: `/img/ai-gen/${i + 1}.png`,
    category: i % 2 === 0 ? "Abstract" : "Hyper-real"
  })),
  flyers: Array.from({ length: 11 }, (_, i) => ({
    id: `flyer-${i + 1}`,
    title: `FLYER DESIGN #${i + 1}`,
    img: `/img/flyers/${i + 1}.png`,
    category: i % 3 === 0 ? "Corporate" : "Promo"
  })),
  videos: [
    { id: "vid-1", title: "PRODUCTION REEL #1", videoSrc: "/vids/1.mp4", thumbnail: "/img/projects/video1.png", category: "Reel" },
    { id: "vid-2", title: "PRODUCTION REEL #2", videoSrc: "/vids/2.mp4", thumbnail: "/img/projects/video2.png", category: "Reel" },
    { id: "vid-3", title: "PRODUCTION REEL #3", videoSrc: "/vids/3.mp4", thumbnail: "/img/projects/video3.png", category: "Reel" },
    { id: "vid-4", title: "PRODUCTION REEL #4", videoSrc: "/vids/4.mp4", thumbnail: "/img/projects/video4.png", category: "Reel" },
    { id: "vid-5", title: "PRODUCTION REEL #5", videoSrc: "/vids/5.mp4", thumbnail: "/img/projects/video5.png", category: "Commercial" },
    { id: "vid-6", title: "PRODUCTION REEL #6", videoSrc: "/vids/6.mp4", thumbnail: "/img/projects/video6.png", category: "Commercial" },
    { id: "vid-7", title: "PRODUCTION REEL #7", videoSrc: "/vids/7.mp4", thumbnail: "/img/projects/video7.png", category: "Commercial" },
  ]
};

const categoryLabels = [
  { id: 'websites', label: 'WEBSITE DEVELOPMENT', icon: Globe },
  { id: 'logos', label: 'BRANDING SYSTEMS', icon: Palette },
  { id: 'aiGens', label: 'AI CREATIVE GENS', icon: Sparkles },
  { id: 'mascots', label: 'MASCOTS & CHARACTER', icon: ImageIcon },
  { id: 'flyers', label: 'FLYER DESIGN', icon: ImageIcon },
  { id: 'videos', label: 'VIDEO PRODUCTION', icon: Video },
];

// --- COMPONENTS ---

const SecureVideoPlayer = ({ src }: { src: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const p = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(isNaN(p) ? 0 : p);
    }
  };

  return (
    <div className="relative h-full max-h-[85vh] aspect-[9/16] bg-black rounded-[3rem] overflow-hidden shadow-2xl mx-auto">
      <div 
        className="absolute inset-0 z-10 cursor-pointer" 
        onContextMenu={(e) => e.preventDefault()} 
        onClick={togglePlay}
      />
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-cover"
        onTimeUpdate={handleTimeUpdate}
        playsInline
        autoPlay
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        controlsList="nodownload"
        onContextMenu={(e) => e.preventDefault()}
      />
      
      <div className="absolute bottom-0 inset-x-0 z-20 p-10 bg-gradient-to-t from-black/80 to-transparent">
        <div className="flex flex-col gap-4">
          <input 
            type="range" 
            value={progress} 
            onChange={(e) => {
              const time = (Number(e.target.value) / 100) * (videoRef.current?.duration || 0);
              if (videoRef.current) videoRef.current.currentTime = time;
            }}
            className="w-full h-1 accent-white"
          />
          <div className="flex items-center gap-6">
            <button onClick={togglePlay} className="text-white">
              {isPlaying ? <Pause size={24} /> : <Play size={24} fill="currentColor" />}
            </button>
            <div className="group/vol relative flex items-center gap-3">
              <button onClick={() => { if (videoRef.current) { videoRef.current.muted = !isMuted; setIsMuted(!isMuted); } }} className="text-white">
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
              <input 
                type="range" 
                min="0" max="1" step="0.1"
                defaultValue="1"
                onChange={(e) => {
                  if (videoRef.current) {
                    videoRef.current.volume = Number(e.target.value);
                    videoRef.current.muted = Number(e.target.value) === 0;
                    setIsMuted(Number(e.target.value) === 0);
                  }
                }}
                className="w-0 group-hover/vol:w-24 transition-all duration-300 h-1 accent-white overflow-hidden"
              />
            </div>
            <button onClick={() => { if (videoRef.current) videoRef.current.currentTime = 0; }} className="text-white">
              <RotateCcw size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ShowcaseHeader = ({ title, icon: Icon, onBack }: any) => (
  <div className="relative pt-20 pb-12 border-b border-black/5 mb-12 flex flex-col items-center text-center">
    <button 
      onClick={onBack}
      className="absolute top-20 left-0 px-6 py-2 bg-zinc-50 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-black hover:text-white transition-all shadow-sm"
    >
      <ArrowLeft size={14} /> Back
    </button>
    <div className="space-y-4">
      <div className="inline-flex items-center gap-2 px-4 py-1 bg-purple-100 text-purple-600 rounded-full text-[10px] font-black uppercase tracking-widest font-['Outfit']">
        <Icon size={12} /> {title}
      </div>
      <h3 className="text-5xl font-black tracking-tighter uppercase leading-none font-['Outfit']">Project Archive</h3>
      <p className="text-[10px] font-black tracking-[0.4em] text-zinc-400 uppercase italic">Digital Excellence &bull; 2024</p>
    </div>
  </div>
);

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedProject, setExpandedProject] = useState<any>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') setExpandedProject(null); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <div className="w-full h-full font-['Outfit'] pt-16 lg:pt-24">
      <AnimatePresence mode="wait">
        {!selectedCategory ? (
          <motion.div 
            key="hub"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full h-full flex flex-col justify-center"
          >
            <div className="px-12 md:px-24 mb-16 text-center md:text-left">
              <span className="inline-block px-4 py-1 bg-black text-white text-[10px] font-black uppercase tracking-widest mb-6 rounded-full font-['Outfit']">Studio Archive</span>
              <h2 className="text-[min(8vw,5.5rem)] font-black tracking-tighter uppercase leading-[0.85] font-['Outfit']">
                Creative <span className="text-zinc-300 italic">Portfolio</span>
              </h2>
            </div>
            
            {/* Desktop: Triple-Row Scroller */}
            <div className="hidden lg:flex flex-col space-y-4">
              {[categoryLabels, [...categoryLabels].reverse(), categoryLabels].map((row, idx) => (
                <div key={idx} className="flex overflow-hidden whitespace-nowrap border-y border-black/[0.03] py-8 hover:bg-zinc-50 transition-colors">
                  <motion.div 
                    animate={{ x: idx === 1 ? ["-50%", "0%"] : ["0%", "-50%"] }}
                    transition={{ duration: 40 + idx * 10, repeat: Infinity, ease: "linear" }}
                    className="flex gap-24 pr-24 items-center shrink-0"
                  >
                    {[...row, ...row, ...row].map((cat, i) => (
                      <div key={i} onClick={() => setSelectedCategory(cat.id)} className="flex items-center gap-8 cursor-pointer group transition-transform hover:scale-105 font-['Outfit']">
                        <cat.icon size={32} className="text-zinc-200 group-hover:text-purple-600 transition-colors" />
                        <span className="text-[min(6vw,4.5rem)] font-black uppercase tracking-tighter group-hover:text-purple-600 transition-colors font-['Outfit']">{cat.label}</span>
                        <div className="w-12 h-12 rounded-2xl bg-zinc-100 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all"><ArrowUpRight size={24} /></div>
                      </div>
                    ))}
                  </motion.div>
                </div>
              ))}
            </div>

            {/* Mobile/Tablet: Massive Vertical Brutalist Menu */}
            <div className="lg:hidden flex flex-col w-full px-6 space-y-4">
              {categoryLabels.map((cat, i) => (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setSelectedCategory(cat.id)}
                  className="group relative flex flex-col border-b-2 border-black/5 pb-4 last:border-0"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[clamp(1.8rem,10vw,4rem)] font-black uppercase tracking-tighter leading-none transition-colors group-active:text-purple-600">
                      {cat.label.split(' ')[0]}
                      <span className="text-purple-600/20 group-hover:text-purple-600 transition-colors">.</span>
                    </span>
                    <div className="w-10 h-10 rounded-full border-2 border-black flex items-center justify-center group-active:bg-black group-active:text-white transition-all">
                      <ArrowUpRight size={20} />
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <cat.icon size={12} className="text-zinc-400" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">View Archive</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="showcase" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-white overflow-auto px-6 md:px-24 pb-32 flex flex-col font-['Outfit']"
          >
            <ShowcaseHeader 
              title={categoryLabels.find(c => c.id === selectedCategory)?.label} 
              icon={categoryLabels.find(c => c.id === selectedCategory)?.icon}
              onBack={() => setSelectedCategory(null)}
            />
            
            <div className={`max-w-[1400px] mx-auto w-full grid gap-6 md:gap-8 ${
              selectedCategory === 'videos' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' 
                : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
            }`}>
              {(projectData as any)[selectedCategory as string].map((item: any) => (
                <div 
                  key={item.id} 
                  onClick={() => {
                    if (selectedCategory === 'websites') window.open(item.link, '_blank');
                    else setExpandedProject(item);
                  }}
                  className={`group relative cursor-pointer bg-[#fafafa] border border-black/5 rounded-[2.5rem] overflow-hidden hover:shadow-2xl transition-all duration-500 ${
                    selectedCategory === 'videos' ? 'aspect-[9/16]' : 'aspect-square p-6'
                  }`}
                >
                  {/* High-Impact Centered Logo Overlay (Watermark) */}
                  <div className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center">
                    <img 
                      src="/img/logo-white.png" 
                      alt="Logo" 
                      className="w-[60%] h-auto object-contain opacity-15 group-hover:opacity-40 group-hover:scale-110 transition-all duration-700" 
                    />
                  </div>

                  {/* Dynamic Video Preview for Reels */}
                  {selectedCategory === 'videos' ? (
                    <div className="w-full h-full relative">
                      <video 
                        src={item.videoSrc} 
                        className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-[2s]" 
                        muted 
                        loop 
                        playsInline
                        onMouseOver={(e) => (e.target as HTMLVideoElement).play()}
                        onMouseOut={(e) => {
                          const v = (e.target as HTMLVideoElement);
                          v.pause();
                          v.currentTime = 0;
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                         <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center scale-90 group-hover:scale-110 transition-transform">
                            <Play size={24} className="text-white fill-white ml-1" />
                         </div>
                      </div>
                      <div className="absolute bottom-8 left-8 right-8 z-10">
                        <h4 className="text-sm font-black text-white tracking-widest uppercase mb-1">{item.title}</h4>
                        <div className="flex items-center gap-2">
                           <div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
                           <span className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em]">Live Preview</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <img src={item.img || item.thumbnail} alt={item.title} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100 rounded-[2.5rem]">
                        {selectedCategory === 'websites' ? <ExternalLink size={24} className="text-white" /> : <Maximize2 size={24} className="text-white" />}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {expandedProject && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
            className="fixed inset-0 z-[400] bg-white/95 backdrop-blur-xl flex items-center justify-center p-6 md:p-12 overflow-hidden"
            onClick={() => setExpandedProject(null)}
          >
            <button className="absolute top-10 right-10 p-4 bg-black text-white rounded-full z-[500] hover:rotate-90 transition-transform"><X size={24} /></button>
            <div className="max-w-[1600px] w-full h-full flex flex-col lg:flex-row items-center gap-12 lg:gap-24" onClick={e => e.stopPropagation()}>
                <div className="flex-1 w-full h-full relative flex items-center justify-center">
                    {/* Expansion Watermark (Centered & Large) */}
                    <div className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center">
                      <img 
                        src="/img/logo-white.png" 
                        alt="Logo" 
                        className="w-[70%] h-auto object-contain opacity-20" 
                      />
                    </div>

                    {expandedProject.videoSrc ? (
                        <div className="h-full w-full flex items-center justify-center">
                            <SecureVideoPlayer src={expandedProject.videoSrc} />
                        </div>
                    ) : (
                        <img src={expandedProject.img} alt={expandedProject.title} className="max-w-full max-h-full object-contain drop-shadow-2xl" />
                    )}
                </div>
                {!(expandedProject.id.startsWith('ai') || expandedProject.id.startsWith('mas') || expandedProject.id.startsWith('flyer') || expandedProject.id.startsWith('vid')) && (
                  <div className="max-w-xl space-y-10">
                    <div className="space-y-4">
                        <span className="px-4 py-1 bg-purple-600 text-white text-[10px] font-black rounded-full uppercase tracking-widest">{expandedProject.category}</span>
                        <h2 className="text-7xl font-black uppercase tracking-tighter leading-none">{expandedProject.title}</h2>
                        <p className="text-lg text-zinc-500 font-medium leading-relaxed">{expandedProject.desc}</p>
                    </div>
                  </div>
                )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects;
