import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Education = () => {
  console.log('Education component rendering');
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const timelineRef = useRef(null);
  const floatingShapesRef = useRef([]);

  useEffect(() => {
    console.log('Education useEffect running');
    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%'
          },
        }
      );
    }

    if (timelineRef.current) {
      const cards = timelineRef.current.querySelectorAll('.edu-card');
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 24,
            rotateX: -22,
            transformPerspective: 800,
            transformOrigin: 'top center'
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            ease: 'back.out(1.6)',
            delay: i * 0.06,
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'bottom 15%',
              toggleActions: 'play reverse play reverse'
            }
          }
        );
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

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
      id="education"
      ref={sectionRef}
      style={{
        background: 'linear-gradient(135deg, #e6f5ff 0%, #d4ebff 100%)',
        padding: '80px 0',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '100vh'
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
              width: i % 2 === 0 ? 70 : 90,
              height: i % 2 === 0 ? 70 : 90,
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.5)',
              left: `${10 + i * 20}%`,
              top: `${15 + (i % 3) * 30}%`,
              filter: 'blur(2px)',
            }}
          />
        ))}
      </div>

      <div className="container" style={{ maxWidth: 1000, position: 'relative', zIndex: 1 }}>
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
            Education
          </h2>
          <p style={{
            fontSize: 18,
            color: '#666',
            fontFamily: 'Inter, Arial, sans-serif',
            marginBottom: 20
          }}>
          </p>
        </div>

        {/* Timeline Container */}
        <div ref={timelineRef} style={{ position: 'relative', padding: '20px 0', maxWidth: 900, margin: '0 auto' }}>
          {/* Vertical Line */}
          <div style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            bottom: 0,
            width: 4,
            background: 'linear-gradient(180deg, #6eb5e8 0%, #8dc9f0 100%)',
            transform: 'translateX(-50%)',
            zIndex: 0
          }} />

          {/* Class 10th */}
          <div className="edu-item" style={{ display: 'flex', alignItems: 'center', marginBottom: 60, position: 'relative' }}>
            <div style={{ flex: 1, textAlign: 'right', paddingRight: 40 }}>
              <div className="edu-card" style={{
                background: '#fff',
                padding: '24px',
                borderRadius: 16,
                boxShadow: '0 4px 20px rgba(110,181,232,0.15)',
                border: '2px solid #e8f0e6',
                transition: 'all 0.3s ease',
                cursor: 'default'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateX(-8px)';
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(110,181,232,0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateX(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(110,181,232,0.15)';
              }}
              >
                <h4 style={{ color: '#6eb5e8', fontWeight: 700, fontSize: 20, marginBottom: 8 }}>Class 10th</h4>
                <p style={{ color: '#333', fontWeight: 600, fontSize: 16, marginBottom: 6 }}>M.L. Khanna DAV Public School</p>
                <p style={{ color: '#666', fontSize: 14, marginBottom: 4 }}>Dwarka, New Delhi</p>
                <p style={{ color: '#444', fontSize: 15, fontWeight: 500 }}>Percentage: 86%</p>
              </div>
            </div>
            <div style={{
              width: 24,
              height: 24,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #6eb5e8, #8dc9f0)',
              border: '4px solid #fff',
              boxShadow: '0 0 0 4px rgba(110,181,232,0.2)',
              zIndex: 1,
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)'
            }} />
            <div style={{ flex: 1 }} />
          </div>

          {/* Class 12th */}
          <div className="edu-item" style={{ display: 'flex', alignItems: 'center', marginBottom: 60, position: 'relative' }}>
            <div style={{ flex: 1 }} />
            <div style={{
              width: 24,
              height: 24,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #6eb5e8, #8dc9f0)',
              border: '4px solid #fff',
              boxShadow: '0 0 0 4px rgba(110,181,232,0.2)',
              zIndex: 1,
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)'
            }} />
            <div style={{ flex: 1, textAlign: 'left', paddingLeft: 40 }}>
              <div className="edu-card" style={{
                background: '#fff',
                padding: '24px',
                borderRadius: 16,
                boxShadow: '0 4px 20px rgba(110,181,232,0.15)',
                border: '2px solid #e8f0e6',
                transition: 'all 0.3s ease',
                cursor: 'default'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateX(8px)';
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(110,181,232,0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateX(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(110,181,232,0.15)';
              }}
              >
                <h4 style={{ color: '#6eb5e8', fontWeight: 700, fontSize: 20, marginBottom: 8 }}>Class 12th</h4>
                <p style={{ color: '#333', fontWeight: 600, fontSize: 16, marginBottom: 6 }}>Sri Chaitanya Junior College</p>
                <p style={{ color: '#666', fontSize: 14, marginBottom: 4 }}>Hyderabad, Telangana</p>
                <p style={{ color: '#444', fontSize: 15, fontWeight: 500 }}>Percentage: 96%</p>
              </div>
            </div>
          </div>

          {/* B.Tech */}
          <div className="edu-item" style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
            <div style={{ flex: 1, textAlign: 'right', paddingRight: 40 }}>
              <div className="edu-card" style={{
                background: '#fff',
                padding: '24px',
                borderRadius: 16,
                boxShadow: '0 4px 20px rgba(110,181,232,0.15)',
                border: '2px solid #e8f0e6',
                transition: 'all 0.3s ease',
                cursor: 'default'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateX(-8px)';
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(110,181,232,0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateX(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(110,181,232,0.15)';
              }}
              >
                <h4 style={{ color: '#6eb5e8', fontWeight: 700, fontSize: 20, marginBottom: 8 }}>B.Tech in Computer Science</h4>
                <p style={{ color: '#333', fontWeight: 600, fontSize: 16, marginBottom: 6 }}>Jaypee Institute of Information Technology</p>
                <p style={{ color: '#666', fontSize: 14, marginBottom: 4 }}>Sector 62, Noida</p>
                <p style={{ color: '#444', fontSize: 15, fontWeight: 500 }}>CGPA: 8.0</p>
              </div>
            </div>
            <div style={{
              width: 24,
              height: 24,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #6eb5e8, #8dc9f0)',
              border: '4px solid #fff',
              boxShadow: '0 0 0 4px rgba(110,181,232,0.2)',
              zIndex: 1,
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)'
            }} />
            <div style={{ flex: 1 }} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
