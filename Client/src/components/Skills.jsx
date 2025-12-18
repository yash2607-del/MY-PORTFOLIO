import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  SiJavascript, SiReact, SiNodedotjs, SiExpress, SiMongodb, SiMysql,
  SiHtml5, SiCss3, SiBootstrap, SiFigma,
  SiC, SiCplusplus, SiPython, SiPhp, SiGit, SiQt, SiArduino
} from 'react-icons/si';

gsap.registerPlugin(ScrollTrigger);

const groups = [
  {
    title: 'Languages & Frameworks',
    items: [
      { name: 'JavaScript', icon: SiJavascript, bg: '#F7DF1E', color: '#000' },
      { name: 'React.js', icon: SiReact, bg: '#61DAFB', color: '#111' },
      { name: 'Node.js', icon: SiNodedotjs, bg: '#3C873A', color: '#fff' },
      { name: 'Express.js', icon: SiExpress, bg: '#000', color: '#fff' },
      { name: 'MongoDB', icon: SiMongodb, bg: '#47A248', color: '#fff' },
      { name: 'MySQL', icon: SiMysql, bg: '#00758F', color: '#fff' },
    ],
  },
  {
    title: 'Frontend Tools',
    items: [
      { name: 'HTML5', icon: SiHtml5, bg: '#E34F26', color: '#fff' },
      { name: 'CSS3', icon: SiCss3, bg: '#1572B6', color: '#fff' },
      { name: 'Bootstrap', icon: SiBootstrap, bg: '#7952B3', color: '#fff' },
      { name: 'Figma', icon: SiFigma, bg: '#F24E1E', color: '#fff' },
    ],
  },
  {
    title: 'Programming & Tools',
    items: [
      { name: 'C', icon: SiC, bg: '#A8B9CC', color: '#111' },
      { name: 'C++', icon: SiCplusplus, bg: '#00599C', color: '#fff' },
      { name: 'Python', icon: SiPython, bg: '#3776AB', color: '#fff' },
      { name: 'PHP', icon: SiPhp, bg: '#777BB4', color: '#fff' },
      { name: 'Git', icon: SiGit, bg: '#F05032', color: '#fff' },
      { name: 'Qt', icon: SiQt, bg: '#41CD52', color: '#fff' },
      { name: 'Arduino', icon: SiArduino, bg: '#00979D', color: '#fff' },
    ],
  },
];

const Skills = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const chipRowsRef = useRef([]);
  const floatingShapesRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      headingRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
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

    chipRowsRef.current.forEach((row) => {
      if (!row) return;
      const chips = row.querySelectorAll('.skill-chip');
      gsap.fromTo(
        chips,
        { y: 25, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.05,
          duration: 0.6,
          ease: 'back.out(1.5)',
          scrollTrigger: { 
            trigger: row, 
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
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      style={{
        background: 'linear-gradient(135deg, #e6f5ff 0%, #d4ebff 100%)',
        padding: '80px 0',
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
        {/* Main shapes */}
        {[...Array(9)].map((_, i) => (
          <div
            key={`shape-${i}`}
            ref={el => (floatingShapesRef.current[i] = el)}
            style={{
              position: 'absolute',
              width: 70 + (i % 4) * 18,
              height: 70 + (i % 4) * 18,
              borderRadius: i % 3 === 0 ? '50%' : '38%',
              background: 'rgba(255, 255, 255, 0.5)',
              left: `${12 + i * 11}%`,
              top: `${14 + (i % 4) * 21}%`,
              filter: 'blur(2px)',
              boxShadow: '0 4px 16px rgba(110,181,232,0.09)'
            }}
          />
        ))}
        
        {/* Decorative elements */}
        {[...Array(12)].map((_, i) => (
          <div
            key={`accent-${i}`}
            style={{
              position: 'absolute',
              width: 10 + (i % 3) * 5,
              height: 10 + (i % 3) * 5,
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.4)',
              left: `${6 + i * 8}%`,
              top: `${12 + (i % 5) * 17}%`,
              filter: 'blur(1px)'
            }}
          />
        ))}
        
        {/* Soft glows */}
        <div style={{
          position: 'absolute',
          width: 310,
          height: 310,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.3), transparent 68%)',
          top: '8%',
          right: '3%',
          filter: 'blur(42px)'
        }} />
        <div style={{
          position: 'absolute',
          width: 275,
          height: 275,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.35), transparent 68%)',
          bottom: '10%',
          left: '5%',
          filter: 'blur(36px)'
        }} />
      </div>
      <div className="container" style={{ maxWidth: 1100 }}>
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
            Skills & Technologies
          </h2>
          <p style={{
            fontSize: 18,
            color: '#666',
            fontFamily: 'Inter, Arial, sans-serif',
            marginBottom: 20
          }}>
            My technical expertise across various domains
          </p>
          <div
            style={{
              width: 80,
              height: 4,
              background: 'linear-gradient(90deg, #6eb5e8 0%, #8dc9f0 100%)',
              margin: '0 auto',
              borderRadius: 4
            }}
          />
        </div>

        {groups.map((group, gi) => (
          <div key={gi} className="mb-5">
            <div className="d-flex align-items-center justify-content-start mb-3">
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                background: 'linear-gradient(135deg, #6eb5e8, #8dc9f0)',
                color: '#fff',
                fontWeight: 700,
                fontSize: 18,
                letterSpacing: 0.5,
                padding: '12px 24px',
                borderRadius: 16,
                boxShadow: '0 4px 15px rgba(110,181,232,0.3)',
                fontFamily: 'Poppins, Inter, Arial, sans-serif'
              }}>
                <div style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: '#fff'
                }} />
                {group.title}
              </div>
            </div>
            <div ref={(el) => (chipRowsRef.current[gi] = el)} className="d-flex flex-wrap gap-3 justify-content-start" style={{ paddingLeft: 8 }}>
              {group.items.map((it, ii) => {
                const Icon = it.icon;
                return (
                  <span
                    key={ii}
                    className="skill-chip d-inline-flex align-items-center"
                    style={{
                      background: '#fff',
                      color: '#333',
                      padding: '14px 20px',
                      borderRadius: 14,
                      fontWeight: 600,
                      fontSize: 15,
                      boxShadow: '0 6px 18px rgba(0,0,0,0.08)',
                      border: '2px solid rgba(110,181,232,0.2)',
                      transform: 'translateZ(0)',
                      transition: 'all 0.3s ease',
                      fontFamily: 'Inter, Arial, sans-serif'
                    }}
                    onMouseEnter={(e) => {
                      gsap.to(e.currentTarget, { 
                        y: -4, 
                        scale: 1.05,
                        boxShadow: '0 10px 25px rgba(110,181,232,0.25)',
                        borderColor: '#6eb5e8',
                        duration: 0.2 
                      });
                    }}
                    onMouseLeave={(e) => {
                      gsap.to(e.currentTarget, { 
                        y: 0, 
                        scale: 1,
                        boxShadow: '0 6px 18px rgba(0,0,0,0.08)',
                        borderColor: 'rgba(110,181,232,0.2)',
                        duration: 0.2 
                      });
                    }}
                  >
                    <Icon size={20} style={{ marginRight: 10, color: '#6eb5e8' }} /> {it.name}
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
