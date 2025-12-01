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
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      }
    );

    chipRowsRef.current.forEach((row) => {
      if (!row) return;
      const chips = row.querySelectorAll('.skill-chip');
      gsap.fromTo(
        chips,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.06,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: { trigger: row, start: 'top 85%' },
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
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            ref={el => (floatingShapesRef.current[i] = el)}
            style={{
              position: 'absolute',
              width: i % 2 === 0 ? 65 : 85,
              height: i % 2 === 0 ? 65 : 85,
              borderRadius: '50%',
              background: i % 2 === 0 ? 'rgba(255,152,0,0.16)' : 'rgba(255,179,0,0.26)',
              left: `${12 + i * 18}%`,
              top: `${25 + (i % 3) * 20}%`,
              filter: 'blur(2px)',
            }}
          />
        ))}
      </div>
      <div className="container" style={{ maxWidth: 1100 }}>
        <div ref={headingRef} className="text-center mb-4">
          <h2 className="fw-bold" style={{ color: '#222', fontSize: 36 }}>Skills</h2>
          <div style={{ width: 90, height: 4, background: 'linear-gradient(90deg, #ff9800, #ffb300)', borderRadius: 4, margin: '12px auto 0' }} />
        </div>

        {groups.map((group, gi) => (
          <div key={gi} className="mb-4">
            <div className="d-flex align-items-center justify-content-center mb-3">
              <span
                style={{
                  background: 'rgba(255,152,0,0.1)',
                  color: '#ff9800',
                  fontWeight: 700,
                  letterSpacing: 0.4,
                  padding: '8px 14px',
                  borderRadius: 999,
                  border: '1px solid rgba(255,152,0,0.35)'
                }}
              >
                {group.title}
              </span>
            </div>
            <div ref={(el) => (chipRowsRef.current[gi] = el)} className="d-flex flex-wrap gap-2 justify-content-center">
              {group.items.map((it, ii) => {
                const Icon = it.icon;
                return (
                  <span
                    key={ii}
                    className="skill-chip d-inline-flex align-items-center"
                    style={{
                      background: 'linear-gradient(135deg, #ff9800 0%, #ffb300 100%)',
                      color: '#fff',
                      padding: '10px 14px',
                      borderRadius: 12,
                      fontWeight: 700,
                      boxShadow: '0 8px 20px rgba(255,152,0,0.25)',
                      border: '1px solid rgba(255,255,255,0.35)',
                      transform: 'translateZ(0)',
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      gsap.to(e.currentTarget, { y: -2, boxShadow: '0 10px 24px rgba(255,152,0,0.38)', duration: 0.2 });
                    }}
                    onMouseLeave={(e) => {
                      gsap.to(e.currentTarget, { y: 0, boxShadow: '0 8px 20px rgba(255,152,0,0.25)', duration: 0.2 });
                    }}
                  >
                    <Icon size={18} style={{ marginRight: 8 }} /> {it.name}
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