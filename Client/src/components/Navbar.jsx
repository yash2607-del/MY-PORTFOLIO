import React, { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

const navFont = {
  fontFamily: "Inter, Segoe UI, Arial, sans-serif",
  fontWeight: 500,
  letterSpacing: "0.3px",
  color: "#333",
  fontSize: 16,
  transition: "all 0.3s ease",
  background: "none",
  position: 'relative'
};
const navActiveBtn = {
  background: "linear-gradient(135deg, #6eb5e8 0%, #8dc9f0 100%)",
  color: "#fff",
  fontWeight: 600,
  borderRadius: 20,
  minWidth: 110,
  textAlign: "center",
  fontSize: 16,
  padding: "8px 20px",
  transition: "all 0.3s ease",
  boxShadow: "0 4px 15px rgba(110, 181, 232, 0.4)",
  transform: 'translateY(-2px)'
};

const nameFont = {
  fontFamily: "Montserrat, Poppins, Inter, Segoe UI, Arial, sans-serif",
  fontWeight: 800,
  fontSize: 28,
  background: 'linear-gradient(135deg, #6eb5e8 0%, #8dc9f0 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  letterSpacing: 0.5,
  display: "inline-block",
  transition: 'transform 0.3s ease'
};

const sections = [
  { id: "hero", label: "Home" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

const Navbar = () => {
  const [active, setActive] = useState("hero");
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  const handleSmoothScroll = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      gsap.to(window, {
        duration: 1.4,
        scrollTo: {
          y: element,
          offsetY: 80
        },
        ease: "power3.inOut"
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const scrollPos = currentScrollPos + 120;
      
      // Update active section
      let found = "hero";
      for (const sec of sections) {
        const el = document.getElementById(sec.id);
        if (el && el.offsetTop <= scrollPos) {
          found = sec.id;
        }
      }
      setActive(found);

      // Show/hide navbar based on scroll direction
      if (currentScrollPos > prevScrollPos && currentScrollPos > 80) {
        setVisible(false); // Scrolling down
      } else {
        setVisible(true); // Scrolling up
      }
      
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{
        position: 'fixed',
        top: visible ? '0' : '-80px',
        left: 0,
        right: 0,
        minHeight: 70,
        zIndex: 1030,
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 2px 20px rgba(255, 152, 0, 0.08)',
        borderBottom: '1px solid rgba(255, 179, 0, 0.1)',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      <div className="container-fluid px-4" style={{ maxWidth: 1400 }}>

        {/* LEFT – PORTFOLIO */}
        <a 
          className="navbar-brand" 
          href="#hero"
          onClick={(e) => handleSmoothScroll(e, 'hero')}
          style={{
            fontFamily: "Montserrat, Poppins, Inter, sans-serif",
            fontWeight: 800,
            fontSize: 24,
            color: '#000',
            letterSpacing: 1.5,
            padding: '0 16px',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#6eb5e8';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#000';
          }}
        >
          PORTFOLIO
        </a>

        {/* MOBILE TOGGLER */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* NAV LINKS (Desktop + Mobile Collapsible) */}
        <div
          className="collapse navbar-collapse justify-content-center"
          id="navbarNav"
        >
          <ul
            className="navbar-nav align-items-center mx-auto"
            style={{ gap: "2rem" }}
          >
            {sections.map((sec) => (
              <li className="nav-item" key={sec.id}>
                <a
                  className="nav-link px-2"
                  href={`#${sec.id}`}
                  onClick={(e) => handleSmoothScroll(e, sec.id)}
                  style={active === sec.id ? navActiveBtn : navFont}
                >
                  {sec.label}
                </a>
              </li>
            ))}
          </ul>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
