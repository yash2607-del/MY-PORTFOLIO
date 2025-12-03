import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  FaLaptopCode,
  FaCheckCircle,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaCode,
  FaRocket,
  FaPalette,
  FaFileAlt,
  FaAward,
  FaExternalLinkAlt
} from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  console.log('Experience component loaded');
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardRef = useRef(null);
  const dscCardRef = useRef(null);
  const modalRef = useRef(null);
  const [showModal, setShowModal] = useState(false);

  const experience = {
    title: 'Web Development Intern',
    company: 'Mini Information Technology',
    location: 'Noida',
    period: 'July 2025 - September 2025',
    type: 'Internship',
    gradient: 'linear-gradient(135deg, #ff9800 0%, #ffb300 100%)',
    website: {
      label: 'Project Website',
      url: 'https://www.lmpowersolution.com/'
    },
    offerLetter: 'https://drive.google.com/file/d/16pHpFld68CbqZax965UuERAmcSh9r1Q8/view?usp=sharing',
    certificate: 'https://drive.google.com/file/d/1OAo78SZ8j-BEpXFa8i2lW6R-i1_o-f43/view?usp=drive_link',
    summary:
      'Designed and developed a fully responsive, production-ready website for LM Power Solution, a healthcare simulation technology provider, ensuring cross-device compatibility and optimal user experience.',
    responsibilities: [
      {
        icon: <FaCode size={20} />,
        text: 'Designed and developed a complete website from scratch for LM Power Solution using  modern web technologies'
      },
      {
        icon: <FaRocket size={20} />,
        text: 'Built fully responsive layouts ensuring seamless experience across desktop, tablet, and mobile devices with cross-browser compatibility'
      },
      {
        icon: <FaPalette size={20} />,
        text: 'Created an intuitive UI/UX showcasing healthcare simulation products with interactive features, product galleries, and detailed anatomical model displays'
      },
      {
        icon: <FaCheckCircle size={20} />,
        text: 'Successfully delivered a production-ready website meeting all client requirements with 100% satisfaction'
      }
    ],
    technologies: ['React.js', 'JavaScript', 'CSS3', 'Bootstrap', 'Git', 'GitHub'],
    achievements: [
      'Successfully delivered a production-ready website for healthcare technology provider',
      'Achieved 100% client satisfaction rating with responsive and cross-device compatible design',
      'Hands-on experience with real-world client requirements and deployment workflows'
    ]
  };

  useEffect(() => {
    if (!sectionRef.current) return;

    if (headingRef.current) {
      gsap.from(headingRef.current, {
        y: -30,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
        },
      });
    }

    if (cardRef.current) {
      const cardEl = cardRef.current.querySelector('.exp-card') || cardRef.current;
      gsap.fromTo(
        cardEl,
        {
          opacity: 0,
          y: 24,
          rotationX: -22,
          transformPerspective: 800,
          transformOrigin: 'top center'
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.85,
          ease: 'back.out(1.6)',
          scrollTrigger: {
            trigger: cardEl,
            start: 'top 85%',
            once: true
          },
        }
      );
    }

    if (dscCardRef.current) {
      const dscCardEl = dscCardRef.current.querySelector('.exp-card') || dscCardRef.current;
      gsap.fromTo(
        dscCardEl,
        {
          opacity: 0,
          y: 24,
          rotationX: -22,
          transformPerspective: 800,
          transformOrigin: 'top center'
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.85,
          ease: 'back.out(1.6)',
          scrollTrigger: {
            trigger: dscCardEl,
            start: 'top 85%',
            once: true
          },
        }
      );
    }

    // cleanup ScrollTrigger instances if component unmounts
    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  // Animate modal open/close and lock body scroll
  useEffect(() => {
    if (showModal && modalRef.current) {
      const el = modalRef.current;
      gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.2, ease: 'power2.out' });
      const panel = el.querySelector('.exp-modal-panel');
      if (panel) gsap.fromTo(panel, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.25, ease: 'power3.out' });
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [showModal]);

  const floatingShapesRef = useRef([]);

  useEffect(() => {
    // Animate floating shapes
    floatingShapesRef.current.forEach((shape) => {
      if (!shape) return;
      const animateShape = () => {
        const x = gsap.utils.random(-60, 60);
        const y = gsap.utils.random(-40, 40);
        gsap.to(shape, {
          x,
          y,
          duration: gsap.utils.random(8, 14),
          ease: 'sine.inOut',
          onComplete: animateShape,
        });
      };
      animateShape();
    });
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      style={{
        background: 'linear-gradient(135deg, #ffe4cc 0%, #ffd4a3 100%)',
        padding: '80px 0',
        position: 'relative',
        overflow: 'hidden'
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
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            ref={el => (floatingShapesRef.current[i] = el)}
            style={{
              position: 'absolute',
              width: i % 2 === 0 ? 70 : 90,
              height: i % 2 === 0 ? 70 : 90,
              borderRadius: '50%',
              background: i % 2 === 0 ? 'rgba(255,152,0,0.15)' : 'rgba(255,179,0,0.25)',
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              filter: 'blur(2px)',
            }}
          />
        ))}
      </div>
      <div className="container" style={{ maxWidth: 1000 }}>
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-5">
          <h2
            className="fw-bold mb-3"
            style={{
              fontFamily: 'Poppins, Inter, Arial, sans-serif',
              fontSize: 48,
              color: '#222',
              letterSpacing: 1.2
            }}
          >
            Work Experience
          </h2>
          <p style={{
            fontSize: 18,
            color: '#666',
            fontFamily: 'Inter, Arial, sans-serif',
            marginBottom: 20
          }}>
            Professional Highlights
          </p>
          <div
            style={{
              width: 80,
              height: 4,
              background: 'linear-gradient(90deg, #ff9800 0%, #ffb300 100%)',
              margin: '0 auto',
              borderRadius: 4
            }}
          />
        </div>

        {/* Experience Cards Row */}
        <div className="row justify-content-center align-items-stretch g-4" ref={cardRef}>
          {/* Internship Card */}
          <div className="col-12 col-md-6 d-flex">
            <div
              className="card border-0 exp-card h-100 w-100"
            style={{
              background: '#fff',
              borderRadius: 24,
              overflow: 'hidden',
              boxShadow: '0 10px 40px rgba(255,152,0,0.12)',
              marginBottom: 30,
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
              transform: 'perspective(1000px)',
              transformStyle: 'preserve-3d',
              transition: 'box-shadow 0.3s ease'
            }}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              const centerX = rect.width / 2;
              const centerY = rect.height / 2;
              const rotateX = (y - centerY) / 15;
              const rotateY = (centerX - x) / 15;
              
              gsap.to(e.currentTarget, {
                rotationX: rotateX,
                rotationY: rotateY,
                y: -8,
                boxShadow: '0 20px 60px rgba(255,152,0,0.25)',
                duration: 0.3,
                ease: 'power2.out'
              });
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, {
                rotationX: 0,
                rotationY: 0,
                y: 0,
                boxShadow: '0 10px 40px rgba(255,152,0,0.12)',
                duration: 0.5,
                ease: 'power2.out'
              });
            }}
          >
              {/* Header */}
            <div
              style={{
                background: experience.gradient,
                padding: '24px 28px',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{
                position: 'absolute',
                top: -50,
                right: -50,
                width: 200,
                height: 200,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.08)'
              }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 10 }}>
                  <div style={{
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.18)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    border: '2px solid rgba(255,255,255,0.25)'
                  }}>
                    <FaLaptopCode size={26} />
                  </div>

                  <div>
                    <h3 style={{
                      color: '#fff',
                      fontSize: 20,
                      fontWeight: 700,
                      margin: 0,
                      fontFamily: 'Poppins, Inter, Arial, sans-serif'
                    }}>
                      {experience.title}
                    </h3>
                    <p style={{
                      color: 'rgba(255,255,255,0.95)',
                      fontSize: 14,
                      fontWeight: 600,
                      margin: 0
                    }}>
                      {experience.company}
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    background: 'rgba(255,255,255,0.12)',
                    padding: '8px 14px',
                    borderRadius: 20,
                    color: '#fff',
                    fontWeight: 600,
                    fontSize: 14
                  }}>
                    <FaCalendarAlt size={14} /> {experience.period}
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    background: 'rgba(255,255,255,0.12)',
                    padding: '8px 14px',
                    borderRadius: 20,
                    color: '#fff',
                    fontWeight: 600,
                    fontSize: 14
                  }}>
                    <FaMapMarkerAlt size={14} /> {experience.location}
                  </div>

                  <div style={{
                    background: '#fff',
                    padding: '8px 14px',
                    borderRadius: 20,
                    color: '#ff9800',
                    fontWeight: 700,
                    fontSize: 13
                  }}>
                    {experience.type}
                  </div>
                </div>
              </div>
            </div>

              {/* Body (compact summary; full details in modal) */}
              <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <div style={{ marginBottom: 12 }}>
                  <p style={{ margin: 0, color: '#444', fontSize: 15, lineHeight: 1.6 }}>
                    {experience.summary}
                  </p>
                </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 'auto' }}>
                <div style={{ display: 'flex', gap: 10 }}>
                  <a
                    href="https://www.lmpowersolution.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn fw-bold"
                    style={{
                      flex: 1,
                      background: 'linear-gradient(135deg, #ff9800 0%, #ffb300 100%)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 12,
                      padding: '12px 16px',
                      fontSize: 14,
                      boxShadow: '0 6px 20px rgba(255,152,0,0.25)',
                      transition: 'all 0.3s ease',
                      fontWeight: 700,
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 6
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(255,152,0,0.35)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 6px 20px rgba(255,152,0,0.25)';
                    }}
                  >
                    <FaExternalLinkAlt size={13} />
                    View Live Projects
                  </a>

                  <button
                    className="btn fw-bold"
                    style={{
                      flex: 1,
                      background: '#fff',
                      color: '#ff9800',
                      border: '2px solid #ff9800',
                      borderRadius: 12,
                      padding: '12px 16px',
                      fontSize: 14,
                      boxShadow: '0 4px 15px rgba(255,152,0,0.15)',
                      transition: 'all 0.3s ease',
                      fontWeight: 700
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, #ff9800, #ffb300)';
                      e.currentTarget.style.color = '#fff';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 6px 20px rgba(255,152,0,0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#fff';
                      e.currentTarget.style.color = '#ff9800';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 15px rgba(255,152,0,0.15)';
                    }}
                    onClick={() => setShowModal(true)}
                  >
                    View Details
                  </button>
                </div>

                <div style={{ display: 'flex', gap: 10 }}>
                  {experience.offerLetter && (
                    <a
                      href={experience.offerLetter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn fw-bold"
                      style={{
                        flex: 1,
                        background: '#fff',
                        color: '#ff9800',
                        border: '2px solid #ff9800',
                        borderRadius: 12,
                        padding: '10px 16px',
                        fontSize: 14,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 8,
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 15px rgba(255,152,0,0.15)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, #ff9800, #ffb300)';
                        e.currentTarget.style.color = '#fff';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 6px 20px rgba(255,152,0,0.3)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = '#fff';
                        e.currentTarget.style.color = '#ff9800';
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 15px rgba(255,152,0,0.15)';
                      }}
                    >
                      <FaFileAlt size={14} />
                      Offer Letter
                    </a>
                  )}

                  {experience.certificate && (
                    <a
                      href={experience.certificate}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn fw-bold"
                      style={{
                        flex: 1,
                        background: '#fff',
                        color: '#ff9800',
                        border: '2px solid #ff9800',
                        borderRadius: 12,
                        padding: '10px 16px',
                        fontSize: 14,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 8,
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 15px rgba(255,152,0,0.15)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, #ff9800, #ffb300)';
                        e.currentTarget.style.color = '#fff';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 6px 20px rgba(255,152,0,0.3)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = '#fff';
                        e.currentTarget.style.color = '#ff9800';
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 15px rgba(255,152,0,0.15)';
                      }}
                    >
                      <FaAward size={14} />
                      Certificate
                    </a>
                  )}
                </div>
              </div>

                {/* No inline details now; handled by modal */}
              </div>
            </div>
          </div>

          {/* DSC Club Management Head Card */}
          <div ref={dscCardRef} className="col-12 col-md-6 d-flex">
            <div
              className="card border-0 exp-card h-100 w-100"
              style={{
                background: '#fff',
                borderRadius: 24,
                overflow: 'hidden',
                boxShadow: '0 10px 40px rgba(255,152,0,0.12)',
                marginBottom: 30,
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                transform: 'perspective(1000px)',
                transformStyle: 'preserve-3d',
                transition: 'box-shadow 0.3s ease'
              }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 15;
                const rotateY = (centerX - x) / 15;
                
                gsap.to(e.currentTarget, {
                  rotationX: rotateX,
                  rotationY: rotateY,
                  y: -8,
                  boxShadow: '0 20px 60px rgba(255,152,0,0.25)',
                  duration: 0.3,
                  ease: 'power2.out'
                });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, {
                  rotationX: 0,
                  rotationY: 0,
                  y: 0,
                  boxShadow: '0 10px 40px rgba(255,152,0,0.12)',
                  duration: 0.5,
                  ease: 'power2.out'
                });
              }}
            >
            {/* Header */}
            <div
              style={{
                background: 'linear-gradient(135deg, #ff9800 0%, #ffb300 100%)',
                padding: '24px 28px',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{
                position: 'absolute',
                top: -50,
                right: -50,
                width: 200,
                height: 200,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.08)'
              }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 10 }}>
                  <div style={{
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.18)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    border: '2px solid rgba(255,255,255,0.25)'
                  }}>
                    <FaLaptopCode size={26} />
                  </div>

                  <div>
                    <h3 style={{
                      color: '#fff',
                      fontSize: 20,
                      fontWeight: 700,
                      margin: 0,
                      fontFamily: 'Poppins, Inter, Arial, sans-serif'
                    }}>
                      Management Head
                    </h3>
                    <p style={{
                      color: 'rgba(255,255,255,0.95)',
                      fontSize: 14,
                      fontWeight: 600,
                      margin: 0
                    }}>
                      Developer Student Club (DSC)
                    </p>
                    <p style={{
                      color: 'rgba(255,255,255,0.85)',
                      fontSize: 12,
                      fontWeight: 500,
                      margin: 0,
                      marginTop: 2
                    }}>
                      Jaypee Institute of Information Technology
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    background: 'rgba(255,255,255,0.12)',
                    padding: '8px 14px',
                    borderRadius: 20,
                    color: '#fff',
                    fontWeight: 600,
                    fontSize: 14
                  }}>
                    <FaCalendarAlt size={14} /> July 2025 – Present
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    background: 'rgba(255,255,255,0.12)',
                    padding: '8px 14px',
                    borderRadius: 20,
                    color: '#fff',
                    fontWeight: 600,
                    fontSize: 14
                  }}>
                    <FaMapMarkerAlt size={14} /> Noida
                  </div>

                  <div style={{
                    background: '#fff',
                    padding: '8px 14px',
                    borderRadius: 20,
                    color: '#ff9800',
                    fontWeight: 700,
                    fontSize: 13
                  }}>
                    Club Responsibility
                  </div>
                </div>
              </div>
            </div>

              {/* Body */}
              <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <div style={{ marginBottom: 16 }}>
                  <p style={{ margin: 0, color: '#444', fontSize: 15, lineHeight: 1.6 }}>
                    Managed SIH internal rounds, hackathons, and technical workshops; coordinated logistics and
                    communication for 200+ students. Active DSC member since July 2024; Management Head (2025–26).
                  </p>
                </div>

                {/* Stats Grid */}
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(2, 1fr)', 
                  gap: 12,
                  marginBottom: 12
                }}>
                  <div style={{
                    background: 'linear-gradient(135deg, #ffe4cc, #ffd4a3)',
                    borderRadius: 12,
                    padding: '14px 16px',
                    textAlign: 'center',
                    border: '2px solid rgba(255,152,0,0.15)',
                    transition: 'all 0.3s ease',
                    cursor: 'default'
                  }}
                  onMouseEnter={(e) => {
                    gsap.to(e.currentTarget, { scale: 1.05, duration: 0.2 });
                  }}
                  onMouseLeave={(e) => {
                    gsap.to(e.currentTarget, { scale: 1, duration: 0.2 });
                  }}
                  >
                    <div style={{ fontSize: 24, fontWeight: 800, color: '#ff9800', marginBottom: 4 }}>10+</div>
                    <div style={{ fontSize: 12, color: '#666', fontWeight: 600 }}>Events</div>
                  </div>

                  <div style={{
                    background: 'linear-gradient(135deg, #ffe4cc, #ffd4a3)',
                    borderRadius: 12,
                    padding: '14px 16px',
                    textAlign: 'center',
                    border: '2px solid rgba(255,152,0,0.15)',
                    transition: 'all 0.3s ease',
                    cursor: 'default'
                  }}
                  onMouseEnter={(e) => {
                    gsap.to(e.currentTarget, { scale: 1.05, duration: 0.2 });
                  }}
                  onMouseLeave={(e) => {
                    gsap.to(e.currentTarget, { scale: 1, duration: 0.2 });
                  }}
                  >
                    <div style={{ fontSize: 24, fontWeight: 800, color: '#ff9800', marginBottom: 4 }}>200+</div>
                    <div style={{ fontSize: 12, color: '#666', fontWeight: 600 }}>Participants</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Modal Overlay for full details */}
      {showModal && (
        <div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1050
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowModal(false);
          }}
        >
          <div
            className="exp-modal-panel"
            style={{
              width: 'min(820px, 94vw)',
              maxHeight: '88vh',
              overflow: 'auto',
              background: '#fff',
              borderRadius: 20,
              boxShadow: '0 25px 80px rgba(0,0,0,0.3)',
              position: 'relative'
            }}
          >
            {/* Modal header */}
            <div
              style={{
                background: experience.gradient,
                color: '#fff',
                padding: '22px 26px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                position: 'sticky',
                top: 0,
                zIndex: 10,
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}
            >
              <div>
                <div style={{ fontWeight: 800, fontSize: 20, marginBottom: 4 }}>{experience.company}</div>
                <div style={{ opacity: 0.95, fontWeight: 600, fontSize: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <FaLaptopCode size={14} />
                  {experience.title} • {experience.period}
                </div>
              </div>
              <button
                aria-label="Close"
                className="btn btn-sm"
                style={{ 
                  background: '#fff', 
                  color: '#ff9800', 
                  fontWeight: 700, 
                  borderRadius: 20,
                  padding: '8px 16px',
                  fontSize: 14,
                  border: 'none',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                }}
                onClick={() => setShowModal(false)}
              >
                ✕ Close
              </button>
            </div>

            {/* Modal body */}
            <div style={{ padding: '28px 26px' }}>
              <h5 className="fw-bold" style={{ 
                color: '#222', 
                marginBottom: 14, 
                fontSize: 18,
                display: 'flex',
                alignItems: 'center',
                gap: 8
              }}>
                <div style={{ 
                  width: 4, 
                  height: 24, 
                  background: 'linear-gradient(180deg, #ff9800, #ffb300)',
                  borderRadius: 4
                }} />
                What I Did
              </h5>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {experience.responsibilities.map((r, idx) => (
                  <div key={idx} style={{ 
                    display: 'flex', 
                    gap: 12, 
                    padding: '14px 16px', 
                    background: 'linear-gradient(135deg, #ffe4cc, #ffd4a3)', 
                    borderRadius: 10, 
                    borderLeft: '4px solid #ff9800',
                    transition: 'all 0.3s ease',
                    cursor: 'default'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateX(4px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(255,152,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateX(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  >
                    <div style={{ 
                      color: '#ff9800', 
                      marginTop: 2, 
                      fontSize: 18,
                      flexShrink: 0
                    }}>{r.icon}</div>
                    <p style={{ margin: 0, color: '#444', lineHeight: 1.7, fontSize: 14.5 }}>{r.text}</p>
                  </div>
                ))}
              </div>

              <h5 className="fw-bold" style={{ 
                color: '#222', 
                marginTop: 24, 
                marginBottom: 14,
                fontSize: 18,
                display: 'flex',
                alignItems: 'center',
                gap: 8
              }}>
                <div style={{ 
                  width: 4, 
                  height: 24, 
                  background: 'linear-gradient(180deg, #ff9800, #ffb300)',
                  borderRadius: 4
                }} />
                Technologies Used
              </h5>
              <div style={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: 8,
                padding: '12px',
                background: '#f8f9fa',
                borderRadius: 10,
                border: '1px solid #e9ecef'
              }}>
                {experience.technologies.map((t, i) => (
                  <span key={i} style={{ 
                    background: 'linear-gradient(135deg, #ff9800, #ffb300)', 
                    color: '#fff', 
                    padding: '8px 14px', 
                    borderRadius: 14, 
                    fontWeight: 600, 
                    fontSize: 13,
                    boxShadow: '0 2px 8px rgba(255,152,0,0.2)',
                    transition: 'transform 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                  >{t}</span>
                ))}
              </div>

              <h5 className="fw-bold" style={{ 
                color: '#222', 
                marginTop: 24, 
                marginBottom: 14,
                fontSize: 18,
                display: 'flex',
                alignItems: 'center',
                gap: 8
              }}>
                <div style={{ 
                  width: 4, 
                  height: 24, 
                  background: 'linear-gradient(180deg, #ff9800, #ffb300)',
                  borderRadius: 4
                }} />
                Key Achievements
              </h5>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {experience.achievements.map((a, i) => (
                  <div key={i} style={{ 
                    display: 'flex', 
                    gap: 12, 
                    alignItems: 'center', 
                    padding: '12px 14px', 
                    background: 'linear-gradient(90deg, #f8f9fa 0%, #ffffff 100%)', 
                    borderRadius: 10, 
                    border: '1px solid #ffe9c9',
                    transition: 'all 0.3s ease',
                    cursor: 'default'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(90deg, #fff9f0 0%, #ffffff 100%)';
                    e.currentTarget.style.borderColor = '#ffd699';
                    e.currentTarget.style.transform = 'translateX(4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(90deg, #f8f9fa 0%, #ffffff 100%)';
                    e.currentTarget.style.borderColor = '#ffe9c9';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                  >
                    <FaCheckCircle size={16} style={{ color: '#ff9800', flexShrink: 0 }} />
                    <p style={{ margin: 0, color: '#444', fontSize: 14.5, lineHeight: 1.6 }}>{a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Experience;
