import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaHeart, FaCode, FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';
import { HiArrowUp } from 'react-icons/hi';
import { SiLeetcode } from 'react-icons/si';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  console.log('Footer render');
  const footerRef = useRef(null);
  const heartRef = useRef(null);
  const floatingShapesRef = useRef([]);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    console.log('Footer useEffect start', { footer: !!footerRef.current });
    // Animate heart beat
    if (heartRef.current) {
      gsap.to(heartRef.current, {
        scale: 1.2,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      });
    }

    // Footer - no animation for better performance
    if (footerRef.current) {
      gsap.set(footerRef.current, { opacity: 1, y: 0 });
    }

    // Animate floating shapes
    floatingShapesRef.current.forEach((shape) => {
      if (!shape) return;
      const animateShape = () => {
        const x = gsap.utils.random(-50, 50);
        const y = gsap.utils.random(-30, 30);
        gsap.to(shape, {
          x,
          y,
          duration: gsap.utils.random(7, 13),
          ease: 'sine.inOut',
          onComplete: animateShape,
        });
      };
      animateShape();
    });

    // Show/hide scroll to top button
    const handleScroll = () => {
      setShowTop(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      ref={footerRef}
      style={{
        background: 'linear-gradient(135deg, #f0f7ed 0%, #dfe8db 100%)',
        color: '#333',
        padding: '60px 0 0',
        position: 'relative',
        overflow: 'hidden',
        minHeight: 320,
        borderTop: '1px solid #c8d9c4'
      }}
    >
      {/* Floating Shapes */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0
      }}>
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            ref={el => (floatingShapesRef.current[i] = el)}
            style={{
              position: 'absolute',
              width: i % 2 === 0 ? 65 : 85,
              height: i % 2 === 0 ? 65 : 85,
              borderRadius: '50%',
              background: i % 2 === 0 ? 'rgba(151,169,147,0.16)' : 'rgba(167,182,163,0.26)',
              left: `${12 + i * 18}%`,
              top: `${25 + (i % 3) * 20}%`,
              filter: 'blur(2px)'
            }}
          />
        ))}
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: 1200 }}>
        {/* Top Section - 3 Columns */}
        <div className="row g-4 mb-5">
          {/* Brand Column */}
          <div className="col-lg-4 col-md-6">
            <div
              style={{
                fontSize: 32,
                fontWeight: 900,
                fontFamily: 'Poppins, Inter, Arial, sans-serif',
                letterSpacing: 2,
                color: '#4a7c47',
                marginBottom: 16
              }}
            >
              PORTFOLIO
            </div>
            <p style={{
              fontSize: 14,
              lineHeight: 1.7,
              color: '#555',
              fontFamily: 'Inter, Arial, sans-serif',
              marginBottom: 20,
              fontWeight: 500
            }}>
              Crafting elegant solutions through code. Passionate about building impactful web experiences.
            </p>
            {/* Social Links */}
            <div style={{ display: 'flex', gap: 12 }}>
              {[
                { icon: <FaLinkedin size={20} />, url: 'https://www.linkedin.com/in/yashh26/', label: 'LinkedIn' },
                { icon: <FaGithub size={20} />, url: 'https://github.com/yash2607-del', label: 'GitHub' },
                { icon: <SiLeetcode size={18} />, url: 'https://leetcode.com/u/Yashh26/', label: 'LeetCode' },
                { icon: <FaInstagram size={20} />, url: 'https://www.instagram.com/yashh._.2607/', label: 'Instagram' }
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    background: 'rgba(151,169,147,0.1)',
                    border: '1px solid rgba(151,169,147,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#5d8c5a',
                    transition: 'all 0.3s ease',
                    textDecoration: 'none'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #5d8c5a, #78a375)';
                    e.currentTarget.style.color = '#fff';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(151,169,147,0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(151,169,147,0.1)';
                    e.currentTarget.style.color = '#5d8c5a';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="col-lg-4 col-md-6">
            <h5 style={{
              fontSize: 18,
              fontWeight: 800,
              fontFamily: 'Poppins, Inter, Arial, sans-serif',
              marginBottom: 20,
              color: '#1a1a1a',
              letterSpacing: 0.5
            }}>
              Quick Links
            </h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { label: 'Home', id: 'hero' },
                { label: 'About Me', id: 'experience' },
                { label: 'Projects', id: 'projects' },
                { label: 'Skills', id: 'skills' },
                { label: 'Contact', id: 'contact' }
              ].map((link, i) => (
                <a
                  key={i}
                  href={`#${link.id}`}
                  style={{
                    color: '#444',
                    textDecoration: 'none',
                    fontSize: 14,
                    fontWeight: 600,
                    transition: 'all 0.3s ease',
                    fontFamily: 'Inter, Arial, sans-serif',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#5d8c5a';
                    e.currentTarget.style.paddingLeft = '8px';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#444';
                    e.currentTarget.style.paddingLeft = '0';
                  }}
                >
                  <span style={{ fontSize: 10 }}>▸</span>
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Get in Touch Column */}
          <div className="col-lg-4 col-md-12">
            <h5 style={{
              fontSize: 18,
              fontWeight: 800,
              fontFamily: 'Poppins, Inter, Arial, sans-serif',
              marginBottom: 20,
              color: '#1a1a1a',
              letterSpacing: 0.5
            }}>
              Get In Touch
            </h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{
                fontSize: 14,
                color: '#444',
                fontFamily: 'Inter, Arial, sans-serif',
                lineHeight: 1.6,
                fontWeight: 500
              }}>
                <strong style={{ color: '#5d8c5a', fontWeight: 700 }}>Email:</strong><br />
                yashr1624@gmail.com
              </div>
              <div style={{
                fontSize: 14,
                color: '#444',
                fontFamily: 'Inter, Arial, sans-serif',
                lineHeight: 1.6,
                fontWeight: 500
              }}>
                <strong style={{ color: '#5d8c5a', fontWeight: 700 }}>Phone:</strong><br />
                +91 9013905981
              </div>
              <div style={{
                fontSize: 14,
                color: '#444',
                fontFamily: 'Inter, Arial, sans-serif',
                lineHeight: 1.6,
                fontWeight: 500
              }}>
                <strong style={{ color: '#5d8c5a', fontWeight: 700 }}>Location:</strong><br />
                India
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            width: '100%',
            height: 1,
            background: 'linear-gradient(90deg, transparent 0%, rgba(151,169,147,0.5) 50%, transparent 100%)',
            marginBottom: 24
          }}
        />

        {/* Bottom Section - Copyright */}
        <div style={{ 
          paddingBottom: 30,
          textAlign: 'center'
        }}>
          <p
            style={{
              fontSize: 14,
              margin: 0,
              color: '#666',
              fontFamily: 'Inter, Arial, sans-serif',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              flexWrap: 'wrap',
              fontWeight: 500
            }}
          >
            <span>&copy; {new Date().getFullYear()} Yash Raj. All rights reserved.</span>
            <span style={{ color: '#999' }}>•</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              Made with <FaHeart ref={heartRef} size={14} style={{ color: '#5d8c5a' }} /> and{' '}
              <FaCode size={14} style={{ color: '#5d8c5a' }} />
            </span>
          </p>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        style={{
          position: 'fixed',
          bottom: 30,
          right: 30,
          width: 56,
          height: 56,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #5d8c5a, #78a375)',
          color: '#fff',
          border: '2px solid rgba(255,255,255,0.2)',
          boxShadow: '0 8px 24px rgba(151,169,147,0.4)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 24,
          transition: 'all 0.3s ease',
          zIndex: 100,
          opacity: showTop ? 1 : 0,
          pointerEvents: showTop ? 'auto' : 'none',
          transform: showTop ? 'scale(1) rotate(0deg)' : 'scale(0.8) rotate(-180deg)'
        }}
        onMouseEnter={(e) => {
          gsap.to(e.currentTarget, { 
            y: -6, 
            scale: 1.1,
            boxShadow: '0 12px 32px rgba(151,169,147,0.6)', 
            duration: 0.3,
            ease: 'back.out(1.7)'
          });
        }}
        onMouseLeave={(e) => {
          gsap.to(e.currentTarget, { 
            y: 0, 
            scale: 1,
            boxShadow: '0 8px 24px rgba(151,169,147,0.4)', 
            duration: 0.3 
          });
        }}
      >
        <HiArrowUp />
      </button>
    </footer>
  );
};

export default Footer;
