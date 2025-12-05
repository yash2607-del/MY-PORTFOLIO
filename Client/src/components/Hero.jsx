

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaLinkedin, FaGithub, FaDiscord } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';

gsap.registerPlugin(ScrollTrigger);

const socialLinks = [
  { icon: <FaLinkedin />, url: 'https://www.linkedin.com/in/yashh26/' },
  { icon: <FaGithub />, url: 'https://github.com/yash2607-del' },
  { icon: <SiLeetcode />, url: 'https://leetcode.com/u/Yashh26/' },
  { icon: <FaDiscord />, url: 'https://discord.com/users/yash_2602' },
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

    // GSAP animations with ScrollTrigger
    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.fromTo(titleRef.current, 
          { y: 60, opacity: 0, scale: 0.9 }, 
          { 
            y: 0, opacity: 1, scale: 1, 
            duration: 1.2, 
            ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play reverse play reverse',
              fastScrollEnd: true
            }
          }
        );
      }
      
      if (nameRef.current) {
        gsap.fromTo(nameRef.current, 
          { y: 60, opacity: 0, scale: 0.9 }, 
          { 
            y: 0, opacity: 1, scale: 1, 
            duration: 1.2, 
            delay: 0.2,
            ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play reverse play reverse',
              fastScrollEnd: true
            }
          }
        );
      }
      
      if (typedBoxRef.current) {
        gsap.fromTo(typedBoxRef.current, 
          { y: 50, opacity: 0, rotationX: -20 }, 
          { 
            y: 0, opacity: 1, rotationX: 0, 
            duration: 1, 
            delay: 0.4,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play reverse play reverse',
              fastScrollEnd: true
            }
          }
        );
      }
      
      if (iconsRef.current && iconsRef.current.length) {
        gsap.fromTo(iconsRef.current, 
          { scale: 0, opacity: 0, rotation: -180 }, 
          { 
            scale: 1, opacity: 1, rotation: 0, 
            duration: 0.8, 
            delay: 0.6,
            stagger: 0.12, 
            ease: 'back.out(2)',
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play reverse play reverse',
              fastScrollEnd: true
            }
          }
        );
      }
      
      if (buttonRef.current) {
        gsap.fromTo(buttonRef.current, 
          { y: 40, opacity: 0, scale: 0.8 }, 
          { 
            y: 0, opacity: 1, scale: 1, 
            duration: 0.9, 
            delay: 0.9,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play reverse play reverse',
              fastScrollEnd: true
            }
          }
        );
      }

      // Floating balls animation - optimized
      ballRefs.current.forEach((ball, index) => {
        if (!ball) return;
        const animateBall = () => {
          const x = gsap.utils.random(-60, 60);
          const y = gsap.utils.random(-40, 40);
          gsap.to(ball, {
            x,
            y,
            duration: gsap.utils.random(8, 14),
            ease: 'sine.inOut',
            delay: index * 0.1,
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
    <section id="hero" className="d-flex align-items-center position-relative" ref={heroRef} style={{minHeight: '100vh', background: 'linear-gradient(135deg, #f0f7ed 0%, #dfe8db 100%)', overflow: 'hidden'}}>
      <style>{`
        @keyframes blink { 50% { opacity: 0; } }
        .type-cursor { display: inline-block; animation: blink 1s step-end infinite; }
      `}</style>
      {/* Enhanced Animated Background Elements */}
      <div style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0}}>
        {/* Floating Circles */}
        {[...Array(12)].map((_, i) => {
          const angle = (i / 12) * 2 * Math.PI;
          const radius = 38;
          const left = 50 + Math.cos(angle) * radius;
          const top = 50 + Math.sin(angle) * radius * 0.65;
          const size = 35 + (i % 5) * 12;
          const isSpecial = i % 3 === 0;
          return (
            <div
              key={`circle-${i}`}
              ref={el => ballRefs.current[i] = el}
              style={{
                position: 'absolute',
                width: size,
                height: size,
                borderRadius: isSpecial ? '30%' : '50%',
                background: i % 2 === 0 
                  ? 'linear-gradient(135deg, rgba(151, 169, 147, 0.25), rgba(167, 182, 163, 0.15))'
                  : 'rgba(167, 182, 163, 0.3)',
                left: `${left}%`,
                top: `${top}%`,
                filter: 'blur(2px)',
                boxShadow: '0 4px 15px rgba(151,169,147,0.1)',
                zIndex: 1,
              }}
            />
          );
        })}
        
        {/* Decorative Rings */}
        {[...Array(4)].map((_, i) => (
          <div
            key={`ring-${i}`}
            style={{
              position: 'absolute',
              width: 100 + i * 40,
              height: 100 + i * 40,
              borderRadius: '50%',
              border: '2px solid rgba(151, 169, 147, 0.12)',
              left: `${15 + i * 20}%`,
              top: `${10 + i * 15}%`,
              animation: `rotate ${20 + i * 5}s linear infinite`,
              zIndex: 0
            }}
          />
        ))}
        
        {/* Gradient Blobs */}
        <div style={{
          position: 'absolute',
          width: 300,
          height: 300,
          borderRadius: '40%',
          background: 'radial-gradient(circle, rgba(151, 169, 147, 0.15), transparent 70%)',
          top: '10%',
          right: '5%',
          filter: 'blur(30px)'
        }} />
        <div style={{
          position: 'absolute',
          width: 250,
          height: 250,
          borderRadius: '45%',
          background: 'radial-gradient(circle, rgba(167, 182, 163, 0.2), transparent 70%)',
          bottom: '15%',
          left: '8%',
          filter: 'blur(25px)'
        }} />
      </div>
      <style>{`
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
      <div className="container position-relative" style={{zIndex: 2, maxWidth: 1200}}>
        <div className="row align-items-center">
          <div className="col-lg-8 offset-lg-2 text-center">
            <h2 ref={titleRef} className="fw-bold mb-3" style={{color: '#030303ff', fontSize: 54, letterSpacing: 2}}>Hey</h2>
            <h1 ref={nameRef} className="fw-bold mb-3" style={{color: '#222', fontSize: 64, lineHeight: 1.2, fontFamily: 'Poppins, sans-serif'}}>I'm <span style={{color: '#4a7c47', fontWeight: 900}}>Yash Raj</span></h1>
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
                  style={{background: 'linear-gradient(135deg, #5d8c5a 0%, #78a375 100%)', width: 50, height: 50, color: '#ffffff', fontSize: 22, border: '2px solid rgba(255, 255, 255, 0.5)', boxShadow: '0 4px 15px rgba(151, 169, 147, 0.3)', transition: 'all 0.3s ease'}}
                  onMouseEnter={e => gsap.to(e.currentTarget, {scale: 1.15, boxShadow: '0 6px 20px rgba(151, 169, 147, 0.5)', duration: 0.2})}
                  onMouseLeave={e => gsap.to(e.currentTarget, {scale: 1, boxShadow: '0 4px 15px rgba(151, 169, 147, 0.3)', duration: 0.2})}
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
              style={{background: '#ffffff', color: '#4a7c47', border: '2px solid #5d8c5a', borderRadius: 30, fontSize: 18, padding: '14px 40px', transition: 'all 0.3s ease', boxShadow: '0 6px 20px rgba(151, 169, 147, 0.25)', letterSpacing: 1, fontWeight: 700}}
              onMouseEnter={e => gsap.to(e.currentTarget, {scale: 1.05, background: 'linear-gradient(135deg, #5d8c5a 0%, #78a375 100%)', color: '#fff', boxShadow: '0 8px 25px rgba(151, 169, 147, 0.4)', duration: 0.2})}
              onMouseLeave={e => gsap.to(e.currentTarget, {scale: 1, background: '#ffffff', color: '#4a7c47', boxShadow: '0 6px 20px rgba(151, 169, 147, 0.25)', duration: 0.2})}
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
