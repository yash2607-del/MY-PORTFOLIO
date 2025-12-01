

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';

const socialLinks = [
  { icon: <FaLinkedin />, url: 'https://www.linkedin.com/in/yashh26/' },
  { icon: <FaGithub />, url: 'https://github.com/yash2607-del' },
  { icon: <SiLeetcode />, url: 'https://leetcode.com/u/Yashh26/' },
  { icon: <FaInstagram />, url: 'https://www.instagram.com/yashh._.2607/' },
];


const Hero = () => {
  const [typedText, setTypedText] = useState('');

  // GSAP refs
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const nameRef = useRef(null);
  const typedBoxRef = useRef(null);
  const iconsRef = useRef([]);
  const buttonRef = useRef(null);
  const ballRefs = useRef([]);

  useEffect(() => {
    const words = [
      'I am MERN Stack Developer',
      'I am a Problem Solver',
      'I Love to Design Websites',
    ];
    const typeSpeed = 50;
    const deleteSpeed = 30;
    const hold = 1200;

    let i = 0; // word index
    let j = 0; // char index
    let deleting = false;
    let holdTimeout = null;
    let tickId = null;

    const tick = () => {
      const word = words[i % words.length];
      if (!deleting) {
        const next = word.slice(0, j + 1);
        setTypedText(next);
        j += 1;
        if (next === word) {
          deleting = true;
          holdTimeout = setTimeout(() => {
            tickId = setTimeout(tick, deleteSpeed);
          }, hold);
          return;
        }
        tickId = setTimeout(tick, typeSpeed);
      } else {
        const next = word.slice(0, j - 1);
        setTypedText(next);
        j -= 1;
        if (next.length === 0) {
          deleting = false;
          i = (i + 1) % words.length;
          tickId = setTimeout(tick, typeSpeed);
          return;
        }
        tickId = setTimeout(tick, deleteSpeed);
      }
    };

    tickId = setTimeout(tick, typeSpeed);

    // GSAP animations (use context to avoid double in StrictMode)
    const ctx = gsap.context(() => {
      if (titleRef.current) gsap.fromTo(titleRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: 'power3.out' });
      if (nameRef.current) gsap.fromTo(nameRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 0.4, ease: 'power3.out' });
      if (typedBoxRef.current) gsap.fromTo(typedBoxRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 0.6, ease: 'power3.out' });
      if (iconsRef.current && iconsRef.current.length)
        gsap.fromTo(iconsRef.current, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.7, delay: 0.8, stagger: 0.1, ease: 'back.out(1.7)' });
      if (buttonRef.current) gsap.fromTo(buttonRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, delay: 1.2, ease: 'power3.out' });

      // Floating balls animation
      ballRefs.current.forEach((ball) => {
        if (!ball) return;
        const animateBall = () => {
          const x = gsap.utils.random(-80, 80);
          const y = gsap.utils.random(-60, 60);
          gsap.to(ball, {
            x,
            y,
            duration: gsap.utils.random(6, 12),
            ease: 'sine.inOut',
            onComplete: animateBall,
          });
        };
        animateBall();
      });
    }, heroRef);

    return () => {
      if (holdTimeout) clearTimeout(holdTimeout);
      if (tickId) clearTimeout(tickId);
      ctx.revert();
    };
  }, []);

  return (
    <section id="hero" className="d-flex align-items-center position-relative overflow-hidden" ref={heroRef} style={{minHeight: '100vh', background: 'linear-gradient(135deg, #ffe4cc 0%, #ffd4a3 100%)'}}>
      <style>{`
        @keyframes blink { 50% { opacity: 0; } }
        .type-cursor { display: inline-block; animation: blink 1s step-end infinite; }
      `}</style>
      {/* Animated balls */}
      <div style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0}}>
        {[...Array(8)].map((_, i) => {
          // Distribute balls evenly in a circle (not too close)
          const angle = (i / 8) * 2 * Math.PI;
          const radius = 36; // percent, controls how far from center
          const left = 50 + Math.cos(angle) * radius;
          const top = 50 + Math.sin(angle) * radius * 0.7; // ellipse for more vertical space
          return (
            <div
              key={i}
              ref={el => ballRefs.current[i] = el}
              style={{
                position: 'absolute',
                width: 38 + (i % 4) * 14,
                height: 38 + (i % 4) * 14,
                borderRadius: '50%',
                background: i % 2 === 0 ? 'rgba(255,152,0,0.2)' : 'rgba(255,179,0,0.35)',
                left: `${left}%`,
                top: `${top}%`,
                filter: 'blur(2px)',
                zIndex: 1,
              }}
            />
          );
        })}
      </div>
      <div className="container position-relative" style={{zIndex: 2, maxWidth: 1200}}>
        <div className="row align-items-center">
          <div className="col-lg-8 offset-lg-2 text-center">
            <h2 ref={titleRef} className="fw-bold mb-3" style={{color: '#030303ff', fontSize: 54, letterSpacing: 2}}>Hey</h2>
            <h1 ref={nameRef} className="fw-bold mb-3" style={{color: '#222', fontSize: 64, lineHeight: 1.2, fontFamily: 'Poppins, sans-serif'}}>I'm <span style={{background: 'linear-gradient(135deg, #ff9800 0%, #ffb300 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>Yash Raj</span></h1>
            <div ref={typedBoxRef} className="mb-4" style={{fontSize: 26, color: '#555', fontWeight: 500, minHeight: 40}}>
              <span>{typedText}</span>
              <span className="type-cursor" style={{marginLeft: 4}}>|</span>
            </div>
            <div className="d-flex gap-3 mb-4 justify-content-center">
              {socialLinks.map((s, i) => (
                <a
                  key={i}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  ref={el => iconsRef.current[i] = el}
                  className="d-inline-flex align-items-center justify-content-center rounded-circle"
                  style={{background: 'linear-gradient(135deg, #ff9800 0%, #ffb300 100%)', width: 50, height: 50, color: '#ffffff', fontSize: 22, border: '2px solid rgba(255, 255, 255, 0.5)', boxShadow: '0 4px 15px rgba(255, 152, 0, 0.3)', transition: 'all 0.3s ease'}}
                  onMouseEnter={e => gsap.to(e.currentTarget, {scale: 1.15, boxShadow: '0 6px 20px rgba(255, 152, 0, 0.5)', duration: 0.2})}
                  onMouseLeave={e => gsap.to(e.currentTarget, {scale: 1, boxShadow: '0 4px 15px rgba(255, 152, 0, 0.3)', duration: 0.2})}
                >
                  {s.icon}
                </a>
              ))}
            </div>
            <a
              ref={buttonRef}
              href="https://drive.google.com/file/d/1TGTq6MFOFSaNnQ5ydm9qZ5UNjsk7284D/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-lg fw-bold shadow"
              style={{background: 'linear-gradient(135deg, #ff9800 0%, #ffb300 100%)', color: '#fff', border: 'none', borderRadius: 30, fontSize: 18, padding: '14px 40px', transition: 'all 0.3s ease', boxShadow: '0 6px 20px rgba(255, 152, 0, 0.35)', letterSpacing: 1}}
              onMouseEnter={e => gsap.to(e.currentTarget, {scale: 1.05, boxShadow: '0 8px 25px rgba(255, 152, 0, 0.5)', duration: 0.2})}
              onMouseLeave={e => gsap.to(e.currentTarget, {scale: 1, boxShadow: '0 6px 20px rgba(255, 152, 0, 0.35)', duration: 0.2})}
            >
              Hire Me
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
