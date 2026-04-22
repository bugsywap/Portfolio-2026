import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

export function Header({ activeSection, setActiveSection }) {
	const [open, setOpen] = React.useState(false);
	
	// Since our application uses a fixed fullpage scrolling mechanism, 
	// window.scrollY is always 0. But we can force "scrolled" for demo
	// aesthetics if needed. For now, true ensures the sleek glass border.
	const scrolled = true; 

	const links = [
		{ label: 'Home', href: '#' },
		{ label: 'About', href: '#' },
		{ label: 'Skills', href: '#' },
		{ label: 'Projects', href: '#' },
	];

	React.useEffect(() => {
		if (open) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}

		return () => {
			document.body.style.overflow = '';
		};
	}, [open]);

	return (
		<header
			className={cn(
				'fixed top-0 left-0 right-0 z-[100] mx-auto w-full max-w-5xl border-b border-transparent md:rounded-b-2xl md:border md:transition-all md:ease-out',
				{
					'bg-background/80 supports-[backdrop-filter]:bg-background/50 border-border backdrop-blur-xl md:top-4 md:max-w-4xl md:shadow-lg md:rounded-full':
						scrolled && !open,
					'bg-background/90': open,
				},
			)}
		>
			<nav
				className={cn(
					'flex h-20 w-full items-center justify-between px-6 md:h-18 md:transition-all md:ease-out',
					{
						'md:px-4': scrolled,
					},
				)}
			>
				<button 
					onClick={() => {
						if (setActiveSection) {
							setActiveSection(0);
							setOpen(false);
						}
					}}
					className="flex items-center h-10 cursor-pointer hover:opacity-80 transition-opacity"
				>
					<img src="/img/logo-black.png" alt="Logo" className="h-[36px] md:h-[40px] object-contain" />
				</button>
				<div className="hidden items-center gap-1 md:flex">
					{links.map((link, i) => {
						const isActive = activeSection === i;
						return (
							<button 
								key={i} 
								className={cn(
									"relative px-5 py-2 text-xs font-black uppercase tracking-widest transition-all duration-300 rounded-full",
									isActive 
										? "bg-purple-600 text-white shadow-lg shadow-purple-600/20 scale-105" 
										: "text-zinc-400 hover:text-black hover:bg-zinc-100"
								)}
								onClick={() => setActiveSection && setActiveSection(i)}
							>
								{link.label}
							</button>
						);
					})}
					<button 
						className={cn(
							"ml-4 px-6 py-2 rounded-full border transition-all duration-300 text-xs font-black uppercase tracking-widest",
							activeSection === 4 
								? "bg-purple-600 text-white border-purple-600 scale-105 shadow-lg shadow-purple-600/20" 
								: "bg-transparent text-black border-black hover:bg-black hover:text-white"
						)}
						onClick={() => setActiveSection && setActiveSection(4)}
					>
						Contact
					</button>
				</div>
				<button onClick={() => setOpen(!open)} className="md:hidden flex items-center justify-center h-12 w-12 border-2 border-black rounded-full bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all">
					<MenuToggleIcon open={open} className="size-6" duration={300} />
				</button>
			</nav>

			<div
				className={cn(
					'fixed inset-0 z-[100] bg-white transition-all duration-500 md:hidden flex flex-col',
					open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full pointer-events-none',
				)}
			>
				<div className="flex h-20 items-center justify-between px-8 border-b border-black/5">
					<img src="/img/logo-black.png" alt="Logo" className="h-[36px] object-contain" />
					<button onClick={() => setOpen(false)} className="h-12 w-12 border-2 border-black rounded-full flex items-center justify-center bg-black text-white">
						<MenuToggleIcon open={open} className="size-6" duration={300} />
					</button>
				</div>

				<div className="flex-1 flex flex-col justify-center px-8 space-y-4">
					{links.map((link, i) => {
						const isActive = activeSection === i;
						return (
							<button
								key={link.label}
								className={cn(
									"group flex items-center justify-start text-[clamp(3.5rem,15vw,6rem)] font-black uppercase tracking-tighter leading-none transition-all text-left",
									isActive ? "text-purple-600" : "text-black hover:italic"
								)}
								onClick={() => {
									if (setActiveSection) {
										setActiveSection(i);
										setOpen(false);
									}
								}}
							>
								{isActive && (
									<motion.div 
										layoutId="active-pill-mobile"
										className="w-4 h-4 bg-purple-600 rounded-full mr-4"
									/>
								)}
								{link.label}
							</button>
						);
					})}
					<button 
						className={cn(
							"text-[clamp(3.5rem,15vw,6rem)] font-black uppercase tracking-tighter leading-none text-left transition-all",
							activeSection === 4 ? "text-purple-600 italic underline decoration-purple-600/20" : "text-black hover:italic"
						)}
						onClick={() => {
							if (setActiveSection) {
								setActiveSection(4);
								setOpen(false);
							}
						}}
					>
						{activeSection === 4 && (
							<motion.div 
								layoutId="active-pill-mobile"
								className="w-4 h-4 bg-purple-600 rounded-full mr-4 inline-block"
							/>
						)}
						Contact
					</button>
				</div>

				<div className="p-8 border-t border-black/5 bg-zinc-50 flex justify-between items-center">
					<p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">© 2024 G.A.O. STUDIO</p>
					<div className="flex gap-4">
						<div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white text-[10px] font-black italic">PH</div>
					</div>
				</div>
			</div>
		</header>
	);
}
