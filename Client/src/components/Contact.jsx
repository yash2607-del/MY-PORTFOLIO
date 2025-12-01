import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaLinkedin, FaGithub, FaInstagram, FaDiscord } from 'react-icons/fa';
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from 'react-icons/hi';

gsap.registerPlugin(ScrollTrigger);

const socialMedia = [
  { icon: <FaLinkedin />, url: 'https://www.linkedin.com/in/yashh26/', label: 'LinkedIn' },
  { icon: <FaGithub />, url: 'https://github.com/yash2607-del', label: 'GitHub' },
  { icon: <FaInstagram />, url: 'https://www.instagram.com/yashh._.2607/', label: 'Instagram' },
  { icon: <FaDiscord />, url: 'https://discord.com/users/yash_2602', label: 'Discord' }
];

const Contact = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const formRef = useRef(null);
  const socialRef = useRef(null);
  const infoCardsRef = useRef([]);
  const floatingShapesRef = useRef([]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState('');

  // ------------------- ANIMATIONS -------------------
  useEffect(() => {
    gsap.from(headingRef.current, {
      y: -40,
      rotationX: -20,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
    });

    gsap.from(formRef.current, {
      x: -60,
      rotationY: -15,
      duration: 0.8,
      delay: 0.1,
      ease: 'power3.out',
      scrollTrigger: { trigger: formRef.current, start: 'top 80%' }
    });

    gsap.from(socialRef.current, {
      x: 60,
      rotationY: 15,
      duration: 0.8,
      delay: 0.2,
      ease: 'power3.out',
      scrollTrigger: { trigger: socialRef.current, start: 'top 80%' }
    });

    infoCardsRef.current.forEach((card, index) => {
      if (!card) return;
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
          duration: 0.75,
          ease: 'back.out(1.6)',
          delay: 0.2 + index * 0.08,
          scrollTrigger: { trigger: card, start: 'top 85%', once: true }
        }
      );
    });

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

  // ------------------- FORM HANDLERS -------------------
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitStatus('sending');

    setTimeout(() => {
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });

      setTimeout(() => setSubmitStatus(''), 3000);
    }, 1500);
  };

  // ------------------- JSX -------------------
  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{
        background: 'linear-gradient(135deg, #ffe4cc 0%, #ffd4a3 100%)',
        padding: '100px 0',
        scrollMarginTop: 100,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Floating Shapes */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 0
        }}
      >
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            ref={el => (floatingShapesRef.current[i] = el)}
            style={{
              position: 'absolute',
              width: i % 2 === 0 ? 70 : 90,
              height: i % 2 === 0 ? 70 : 90,
              borderRadius: '50%',
              background: i % 2 === 0 ? 'rgba(255,152,0,0.18)' : 'rgba(255,179,0,0.28)',
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              filter: 'blur(2px)'
            }}
          />
        ))}
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: 1200 }}>
        {/* Header */}
        <div ref={headingRef} className="text-center mb-5">
          <h2
            className="fw-bold mb-3"
            style={{
              fontFamily: 'Poppins, Inter, Arial, sans-serif',
              fontSize: 48,
              color: '#222',
              letterSpacing: 1.2,
              textShadow: '2px 2px 4px rgba(255,152,0,0.1)'
            }}
          >
            Get In Touch
          </h2>
          <p
            style={{
              fontSize: 18,
              color: '#666',
              fontFamily: 'Inter, Arial, sans-serif',
              marginBottom: 20
            }}
          >
            I'm always open to discussing new opportunities, collaborations, or innovative projects.
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

        <div className="row g-4">
          {/* Form */}
          <div className="col-lg-7" ref={formRef}>
            <div
              style={{
                background: '#fff',
                borderRadius: 25,
                padding: '40px',
                boxShadow: '0 15px 40px rgba(255,152,0,0.15)',
                transform: 'perspective(1000px)',
                transformStyle: 'preserve-3d',
                transition: 'box-shadow 0.3s ease',
                minHeight: 400
              }}
              onMouseMove={e => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;

                gsap.to(e.currentTarget, {
                  rotationX: rotateX,
                  rotationY: rotateY,
                  y: -6,
                  boxShadow: '0 25px 60px rgba(255,152,0,0.28)',
                  duration: 0.3,
                  ease: 'power2.out'
                });
              }}
              onMouseLeave={e => {
                gsap.to(e.currentTarget, {
                  rotationX: 0,
                  rotationY: 0,
                  y: 0,
                  boxShadow: '0 15px 40px rgba(255,152,0,0.15)',
                  duration: 0.5,
                  ease: 'power2.out'
                });
              }}
            >
              <h3
                style={{
                  fontSize: 28,
                  fontWeight: 700,
                  color: '#222',
                  marginBottom: 10,
                  fontFamily: 'Poppins, Inter, Arial, sans-serif'
                }}
              >
                Send a Message
              </h3>

              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  {/* Name */}
                  <div className="col-md-6">
                    <label
                      style={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: '#555',
                        marginBottom: 8,
                        display: 'block'
                      }}
                    >
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      style={{
                        width: '100%',
                        padding: '14px 18px',
                        borderRadius: 12,
                        border: '2px solid #f0f0f0',
                        fontSize: 15,
                        outline: 'none',
                        fontFamily: 'Inter, Arial, sans-serif',
                        transition: 'all 0.3s'
                      }}
                    />
                  </div>

                  {/* Email */}
                  <div className="col-md-6">
                    <label
                      style={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: '#555',
                        marginBottom: 8,
                        display: 'block'
                      }}
                    >
                      Your Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      style={{
                        width: '100%',
                        padding: '14px 18px',
                        borderRadius: 12,
                        border: '2px solid #f0f0f0',
                        fontSize: 15,
                        outline: 'none',
                        fontFamily: 'Inter, Arial, sans-serif',
                        transition: 'all 0.3s'
                      }}
                    />
                  </div>

                  {/* Message */}
                  <div className="col-12">
                    <label
                      style={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: '#555',
                        marginBottom: 8,
                        display: 'block'
                      }}
                    >
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      style={{
                        width: '100%',
                        padding: '14px 18px',
                        borderRadius: 12,
                        border: '2px solid #f0f0f0',
                        fontSize: 15,
                        outline: 'none',
                        resize: 'vertical',
                        fontFamily: 'Inter, Arial, sans-serif',
                        transition: 'all 0.3s'
                      }}
                    />
                  </div>
                </div>

                {/* SUBMIT BUTTON */}
                <button
                  type="submit"
                  disabled={submitStatus === 'sending'}
                  style={{
                    marginTop: 25,
                    padding: '15px 40px',
                    background: 'linear-gradient(135deg, #ff9800 0%, #ffb300 100%)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 25,
                    fontSize: 16,
                    fontWeight: 700,
                    cursor: submitStatus === 'sending' ? 'not-allowed' : 'pointer',
                    boxShadow: '0 6px 20px rgba(255,152,0,0.3)',
                    fontFamily: 'Poppins, Inter, Arial, sans-serif',
                    opacity: submitStatus === 'sending' ? 0.7 : 1,
                    transition: 'all 0.3s'
                  }}
                >
                  {submitStatus === 'sending'
                    ? 'Sending...'
                    : submitStatus === 'success'
                    ? 'Message Sent!'
                    : 'Send Message'}
                </button>
              </form>
            </div>
          </div>

          {/* RIGHT SIDE – CONTACT INFO + SOCIAL */}
          <div className="col-lg-5" ref={socialRef} style={{ marginTop: 20 }}>
            {/* Info Cards */}
            <div className="mb-5">
              {[
                { icon: <HiOutlineMail />, label: 'Email', value: 'yashr1624@gmail.com' },
                { icon: <HiOutlinePhone />, label: 'Phone', value: '+91 9013905981' },
                { icon: <HiOutlineLocationMarker />, label: 'Location', value: 'India' }
              ].map((item, i) => (
                <div
                  key={i}
                  ref={el => (infoCardsRef.current[i] = el)}
                  style={{
                    background: '#fff',
                    borderRadius: 20,
                    padding: '20px 25px',
                    marginBottom: i === 2 ? 90 : 35,
                    boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 15,
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    transform: 'perspective(800px)',
                    transformStyle: 'preserve-3d',
                    minHeight: 10       // prevents card shrinking
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                      background: '#ffb300',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 20,
                      color: '#fff',
                      border: '1px solid #ffe0a3'
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: 13, color: '#999', fontWeight: 600 }}>{item.label}</div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: '#333' }}>{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Media */}
            <div
              style={{
                background: '#fff',
                borderRadius: 20,
                padding: '30px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
              }}
            >
              <h4
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: '#222',
                  marginBottom: 20,
                  fontFamily: 'Poppins, Inter, Arial, sans-serif',
                  textAlign: 'center'
                }}
              >
                Connect With Me
              </h4>

              <div className="d-flex justify-content-center gap-2 flex-wrap">
                {socialMedia.map((s, i) => (
                  <a
                    key={i}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                      background: '#ffb300',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 20,
                      color: '#fff',
                      textDecoration: 'none',
                      border: '1px solid #ffe0a3',
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                      boxShadow: '0 6px 16px rgba(255,152,0,0.28)'
                    }}
                    onMouseEnter={(e) => gsap.to(e.currentTarget, { y: -3, rotateY: 12, duration: 0.2 })}
                    onMouseLeave={(e) => gsap.to(e.currentTarget, { y: 0, rotateY: 0, duration: 0.25 })}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>

              <p
                style={{
                  fontSize: 13,
                  color: '#999',
                  textAlign: 'center',
                  marginTop: 20
                }}
              >
                Let's connect and build something amazing together
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
