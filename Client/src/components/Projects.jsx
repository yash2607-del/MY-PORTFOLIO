import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 4,
    title: 'CyberGuard',
    description: 'Cybersecurity monitoring platform for campus networks. Features tamper-proof logging, real-time threat detection, AI-powered attack classification, and honeypot deception.',
    tech: ['React.js', 'Node.js', 'Flask', 'MongoDB', 'Socket.IO', 'Machine Learning'],
    github: 'https://github.com/Dishi-Gautam/CyberGuard',
    live: '#',
    gradient: 'linear-gradient(135deg, #ff9800 0%, #ffb300 100%)'
  
  },
  {
    id: 1,
    title: 'MedSecure',
    description: 'Secure medical data exchange using steganography and encryption. Doctors embed encrypted patient data in images/audio files for safe hospital network sharing.',
    tech: ['React.js', 'Node.js', 'MongoDB', 'Python', 'Flask', 'Cryptography'],
    github: 'https://github.com/yash2607-del/MedSecure',
    live: '#',
    gradient: 'linear-gradient(135deg, #ff9800 0%, #ffb300 100%)'
   
  },
  {
    id: 2,
    title: 'MediChain',
    description: 'Blockchain-enabled healthcare ecosystem connecting patients, doctors, and pharmacies with verified prescriptions, AI chatbot, and real-time medicine discovery.',
    tech: ['React.js', 'Node.js', 'MongoDB', 'Blockchain', 'Ethereum', 'Gemini API'],
    github: 'https://github.com/yash2607-del/MediChain',
    live: 'https://medichain-chi.vercel.app/',
    gradient: 'linear-gradient(135deg, #ff9800 0%, #ffb300 100%)'
    
  },
  {
    id: 3,
    title: 'Samaaj',
    description: 'Civic issue reporting platform bridging citizens and solutions. Users report local problems with photos and locations, while moderators respond in real-time.',
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Bootstrap'],
    github: 'https://github.com/yash2607-del/Samaaj',
    live: '#',
    gradient: 'linear-gradient(135deg, #ff9800 0%, #ffb300 100%)',
    status: 'in-progress'
    
  },
  {
    id: 6,
    title: 'NextHire',
    description: 'AI-powered recruitment platform streamlining hiring process with automated resume screening, candidate matching, interview scheduling, and performance analytics.',
    tech: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'OpenAI', 'Tailwind CSS'],
    github: 'https://github.com/yash2607-del/nexthire',
    live: '#',
    gradient: 'linear-gradient(135deg, #ff9800 0%, #ffb300 100%)',
    status: 'in-progress'
  
  },
  {
    id: 5,
    title: 'Ravi Portfolio',
    description: 'Modern, responsive portfolio I built for my father a General Manager highlighting his experience, achievements, and skills with smooth animations and a clean professional design.',
    tech: ['HTML5', 'CSS3', 'JavaScript'],
    github: 'https://github.com/yash2607-del/ravi-portfolio',
    live: 'https://ravi-myportfolio.vercel.app/',
    gradient: 'linear-gradient(135deg, #ff9800 0%, #ffb300 100%)'
  
  }
];

const Projects = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef([]);
  const floatingShapesRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      headingRef.current,
      { y: -50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play reverse play reverse',
          fastScrollEnd: true
        },
      }
    );

    cardsRef.current.forEach((card, index) => {
      if (!card) return;
      gsap.fromTo(
        card,
        { y: 80, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.9,
          delay: index * 0.1,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play reverse play reverse'
          },
        }
      );
    });

    // Animate floating shapes
    floatingShapesRef.current.forEach((shape) => {
      if (!shape) return;
      const animateShape = () => {
        const x = gsap.utils.random(-70, 70);
        const y = gsap.utils.random(-50, 50);
        gsap.to(shape, {
          x,
          y,
          duration: gsap.utils.random(10, 16),
          ease: 'sine.inOut',
          onComplete: animateShape,
        });
      };
      animateShape();
    });
  }, []);

  return (
    <section 
      id="projects" 
      ref={sectionRef}
      style={{
        background: 'linear-gradient(135deg, #ffe4cc 0%, #ffd4a3 100%)',
        padding: '80px 0',
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Enhanced Floating Shapes */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden'
      }}>
        {/* Animated shapes */}
        {[...Array(10)].map((_, i) => (
          <div
            key={`shape-${i}`}
            ref={el => (floatingShapesRef.current[i] = el)}
            style={{
              position: 'absolute',
              width: 65 + (i % 4) * 20,
              height: 65 + (i % 4) * 20,
              borderRadius: i % 3 === 0 ? '50%' : '40%',
              background: i % 2 === 0 
                ? 'linear-gradient(135deg, rgba(255,152,0,0.22), rgba(255,179,0,0.14))'
                : 'rgba(255,179,0,0.28)',
              left: `${10 + i * 10}%`,
              top: `${12 + (i % 4) * 22}%`,
              filter: 'blur(2px)',
              boxShadow: '0 5px 18px rgba(255,152,0,0.1)'
            }}
          />
        ))}
        
        {/* Small accent dots */}
        {[...Array(20)].map((_, i) => (
          <div
            key={`dot-${i}`}
            style={{
              position: 'absolute',
              width: 6 + (i % 2) * 3,
              height: 6 + (i % 2) * 3,
              borderRadius: '50%',
              background: 'rgba(255,152,0,0.35)',
              left: `${3 + i * 5}%`,
              top: `${8 + (i % 6) * 15}%`
            }}
          />
        ))}
        
        {/* Soft gradient glows */}
        <div style={{
          position: 'absolute',
          width: 320,
          height: 320,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,152,0,0.14), transparent 70%)',
          top: '5%',
          right: '0%',
          filter: 'blur(45px)'
        }} />
        <div style={{
          position: 'absolute',
          width: 290,
          height: 290,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,179,0,0.18), transparent 70%)',
          bottom: '8%',
          left: '2%',
          filter: 'blur(38px)'
        }} />
      </div>
      <div className="container" style={{ maxWidth: 1200 }}>
        {/* Section Header */}
        <div ref={headingRef} className="text-center mb-5">
          <h2 
            className="fw-bold mb-3"
            style={{
              fontFamily: 'Poppins, Inter, Arial, sans-serif',
              fontSize: 48,
              color: '#222',
              letterSpacing: 1.2,
            }}
          >
            Featured Projects
          </h2>
          <p style={{
            fontSize: 18,
            color: '#666',
            fontFamily: 'Inter, Arial, sans-serif',
            marginBottom: 20
          }}>
            Showcasing my best work in web development and innovation
          </p>
          <div
            style={{
              width: 80,
              height: 4,
              background: 'linear-gradient(90deg, #ff9800 0%, #ffb300 100%)',
              margin: '0 auto',
              borderRadius: 4,
            }}
          />
        </div>

        {/* Projects Grid */}
        <div className="row g-4">
          {projects.map((project, index) => (
            <div 
              className="col-12 col-md-6 col-lg-4" 
              key={project.id}
              ref={(el) => (cardsRef.current[index] = el)}
            >
              <div
                className="card border-0 h-100"
                style={{
                  borderRadius: 16,
                  overflow: 'hidden',
                  boxShadow: '0 8px 20px rgba(255,152,0,0.15)',
                  transition: 'all 0.3s',
                  background: '#fff'
                }}
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget, {
                    y: -8,
                    boxShadow: '0 12px 30px rgba(255,152,0,0.25)',
                    duration: 0.3,
                  });
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, {
                    y: 0,
                    boxShadow: '0 8px 20px rgba(255,152,0,0.15)',
                    duration: 0.3,
                  });
                }}
              >
                {/* Header with Gradient */}
                <div 
                  style={{
                    background: project.gradient,
                    padding: '20px 24px',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  {/* In Progress Badge */}
                  {project.status === 'in-progress' && (
                    <div style={{
                      position: 'absolute',
                      top: 12,
                      left: 12,
                      background: 'rgba(255,255,255,0.9)',
                      color: '#ff9800',
                      border: '1px solid rgba(255,255,255,0.7)',
                      borderRadius: 12,
                      padding: '6px 10px',
                      fontSize: 11,
                      fontWeight: 800,
                      letterSpacing: 0.6,
                      textTransform: 'uppercase',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.12)'
                    }}>
                      In Progress
                    </div>
                  )}
                  {/* Background Decoration */}
                  <div style={{
                    position: 'absolute',
                    top: -20,
                    right: -20,
                    width: 100,
                    height: 100,
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.1)',
                  }} />
                  <div style={{
                    position: 'absolute',
                    bottom: -15,
                    left: -15,
                    width: 70,
                    height: 70,
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.1)',
                  }} />

                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <span style={{
                        fontSize: 32,
                        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
                      }}>
                        {project.icon}
                      </span>
                      <div className="d-flex gap-2">
                        <a 
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            width: 32,
                            height: 32,
                            borderRadius: '50%',
                            background: 'rgba(255,255,255,0.25)',
                            backdropFilter: 'blur(10px)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#fff',
                            textDecoration: 'none',
                            transition: 'all 0.3s',
                            border: '1px solid rgba(255,255,255,0.3)'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(255,255,255,0.4)';
                            e.currentTarget.style.transform = 'scale(1.1)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(255,255,255,0.25)';
                            e.currentTarget.style.transform = 'scale(1)';
                          }}
                        >
                          <FaGithub size={16} />
                        </a>
                        <a 
                          href={project.live}
                          style={{
                            width: 32,
                            height: 32,
                            borderRadius: '50%',
                            background: 'rgba(255,255,255,0.25)',
                            backdropFilter: 'blur(10px)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#fff',
                            textDecoration: 'none',
                            transition: 'all 0.3s',
                            border: '1px solid rgba(255,255,255,0.3)'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(255,255,255,0.4)';
                            e.currentTarget.style.transform = 'scale(1.1)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(255,255,255,0.25)';
                            e.currentTarget.style.transform = 'scale(1)';
                          }}
                        >
                          <FaExternalLinkAlt size={14} />
                        </a>
                      </div>
                    </div>
                    <h3 style={{
                      color: '#fff',
                      fontSize: 22,
                      fontWeight: 700,
                      fontFamily: 'Poppins, Inter, Arial, sans-serif',
                      marginBottom: 0,
                      textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}>
                      {project.title}
                    </h3>
                  </div>
                </div>

                {/* Card Body */}
                <div style={{ padding: '20px 24px' }}>
                  <p style={{
                    fontSize: 14,
                    color: '#555',
                    lineHeight: 1.6,
                    fontFamily: 'Inter, Arial, sans-serif',
                    marginBottom: 18
                  }}>
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div style={{ marginBottom: 18 }}>
                    <h6 style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: '#999',
                      textTransform: 'uppercase',
                      letterSpacing: 1,
                      marginBottom: 10,
                      fontFamily: 'Poppins, Inter, Arial, sans-serif'
                    }}>
                      Tech Stack
                    </h6>
                    <div className="d-flex flex-wrap gap-2">
                      {project.tech.map((tech, i) => (
                        <span 
                          key={i}
                          style={{
                            background: 'linear-gradient(135deg, #ffe8cc 0%, #ffd699 100%)',
                            color: '#333',
                            padding: '5px 12px',
                            borderRadius: 15,
                            fontSize: 12,
                            fontWeight: 600,
                            fontFamily: 'Inter, Arial, sans-serif',
                            border: '1px solid rgba(255,152,0,0.15)'
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Read More Button */}
                  <a 
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      padding: '10px 20px',
                      background: project.gradient,
                      color: '#fff',
                      textDecoration: 'none',
                      borderRadius: 20,
                      fontSize: 13,
                      fontWeight: 600,
                      fontFamily: 'Poppins, Inter, Arial, sans-serif',
                      boxShadow: '0 4px 12px rgba(255,152,0,0.25)',
                      transition: 'all 0.3s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 6px 16px rgba(255,152,0,0.35)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(255,152,0,0.25)';
                    }}
                  >
                    Read More
                    <FaExternalLinkAlt size={11} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Projects CTA */}
        <div className="text-center mt-5 pt-4">
          <a
            href="https://github.com/yash2607-del?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              padding: '16px 40px',
              background: 'linear-gradient(135deg, #ff9800 0%, #ffb300 100%)',
              color: '#fff',
              textDecoration: 'none',
              borderRadius: 30,
              fontSize: 16,
              fontWeight: 700,
              fontFamily: 'Poppins, Inter, Arial, sans-serif',
              boxShadow: '0 6px 20px rgba(255,152,0,0.3)',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(255,152,0,0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(255,152,0,0.3)';
            }}
          >
            View All Projects on GitHub
            <FaGithub size={20} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
