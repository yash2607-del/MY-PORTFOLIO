import React, { useEffect } from 'react';
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Portfolio() {
	console.log('Portfolio rendering...');

	useEffect(() => {
		// On reload or initial mount, always show the Hero section
		// Remove any hash to prevent browser auto-scrolling to other sections
		try {
			if (window.location.hash) {
				window.history.replaceState(null, '', window.location.pathname + window.location.search);
			}
			requestAnimationFrame(() => {
				const heroEl = document.getElementById('hero');
				if (heroEl) {
					window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
				}
			});
		} catch {}
	}, []);

	return (
		<div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
			<Navbar />
			<div style={{ flex: '1 0 auto' }}>
				<Hero />
				<Experience />
				<Education />
				<Projects />
				<Skills />
				<Contact />
			</div>
			<Footer />
		</div>
	);
}
