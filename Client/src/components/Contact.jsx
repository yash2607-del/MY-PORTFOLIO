import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaLinkedin, FaGithub, FaInstagram, FaDiscord } from 'react-icons/fa';
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from 'react-icons/hi';

gsap.registerPlugin(ScrollTrigger);

const socialMedia = [
  { icon: <FaLinkedin />, url: 'https://www.linkedin.com/in/yashh26/' },
  { icon: <FaGithub />, url: 'https://github.com/yash2607-del' },
  { icon: <FaInstagram />, url: 'https://www.instagram.com/yashh._.2607/' },
  { icon: <FaDiscord />, url: 'https://discord.com/users/yash_2602' }
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
  const [showToast, setShowToast] = useState(false);

  // ------------------- ANIMATIONS -------------------
  useEffect(() => {

    gsap.fromTo(headingRef.current,
      { y: -40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%'
        }
      }
    );

    gsap.fromTo(formRef.current,
      { x: -60, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: formRef.current,
          start: 'top 80%'
        }
      }
    );

    gsap.fromTo(socialRef.current,
      { x: 60, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: socialRef.current,
          start: 'top 80%'
        }
      }
    );

    floatingShapesRef.current.forEach((shape) => {
      if (!shape) return;

      const animate = () => {
        gsap.to(shape, {
          x: gsap.utils.random(-50, 50),
          y: gsap.utils.random(-30, 30),
          duration: gsap.utils.random(6, 12),
          ease: 'sine.inOut',
          onComplete: animate
        });
      };

      animate();
    });

  }, []);

  // ------------------- FORM HANDLERS -------------------

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setSubmitStatus('sending');

    try {

      const response = await fetch("https://formspree.io/f/xreakyqn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {

        setSubmitStatus('success');

        setFormData({
          name: '',
          email: '',
          message: ''
        });

        setShowToast(true);

        setTimeout(() => {
          setShowToast(false);
          setSubmitStatus('');
        }, 3000);

      } else {
        setSubmitStatus('');
        alert("Error sending message");
      }

    } catch (error) {
      setSubmitStatus('');
      alert("Network error");
    }
  };

  // ------------------- JSX -------------------

  return (

    <section
      ref={sectionRef}
      style={{
        background: 'linear-gradient(135deg, #e6f5ff, #d4ebff)',
        padding: '100px 0',
        position: 'relative',
        overflow: 'hidden'
      }}
    >

      {/* Floating shapes */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          ref={el => floatingShapesRef.current[i] = el}
          style={{
            position: 'absolute',
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.4)',
            left: `${10 + i * 15}%`,
            top: `${20 + i * 10}%`
          }}
        />
      ))}

      <div className="container">

        {/* Heading */}
        <div ref={headingRef} className="text-center mb-5">

          <h2 className="fw-bold">Get In Touch</h2>

          <p>I'm always open to collaborations and opportunities.</p>

        </div>

        <div className="row">

          {/* FORM */}
          <div className="col-lg-7" ref={formRef}>

            <div className="bg-white p-4 rounded shadow">

              <h4 className="mb-3">Send a Message</h4>

              <form onSubmit={handleSubmit}>

                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="form-control mb-3"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="form-control mb-3"
                />

                <textarea
                  name="message"
                  placeholder="Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="form-control mb-3"
                  rows="5"
                />

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={submitStatus === 'sending'}
                >
                  {submitStatus === 'sending'
                    ? 'Sending...'
                    : 'Send Message'}
                </button>

              </form>

            </div>

          </div>

          {/* CONTACT INFO */}
          <div className="col-lg-5" ref={socialRef}>

            <div className="bg-white p-4 rounded shadow mb-3">

              <p><HiOutlineMail /> yashr1624@gmail.com</p>

              <p><HiOutlinePhone /> +91 9013905981</p>

              <p><HiOutlineLocationMarker /> India</p>

            </div>

            <div className="bg-white p-4 rounded shadow text-center">

              {socialMedia.map((s, i) => (
                <a
                  key={i}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    fontSize: 24,
                    margin: 10
                  }}
                >
                  {s.icon}
                </a>
              ))}

            </div>

          </div>

        </div>

      </div>

      {/* TOAST */}
      {showToast && (

        <div
          style={{
            position: 'fixed',
            top: 20,
            right: 20,
            background: '#0f8ce0',
            color: '#ffffff',
            padding: '14px 22px',
            borderRadius: 10,
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
            fontWeight: 600,
            zIndex: 9999
          }}
        >
          Message sent successfully!
        </div>

      )}

    </section>

  );
};

export default Contact;
