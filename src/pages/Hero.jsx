import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion'; // Import AnimatePresence
import useAnimatedWords from '../utils/useAnimatedWords'; // Import the custom hook

function Hero() {
  const headingText = "Unlock the Power of AI with Expert Guidance";
  const { animatedWords, wordVariants } = useAnimatedWords(headingText);

  return (
    <section id="hero" className="hero section">
      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row align-items-center content">
          <div className="col-lg-6" data-aos="fade-up" data-aos-delay="200">
            <motion.h2 style={{display:"flex", flexWrap:"wrap"}}>
              {animatedWords.map((word, index) => (
                <AnimatePresence key={index}>
                  <motion.span
                    key={word}
                    variants={wordVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    style={{ display: "inline-block", marginRight: "5px" }}
                  >
                    {word}
                  </motion.span>
                </AnimatePresence>
              ))}
            </motion.h2>
            <p className="lead">
              Demystifying Artificial Intelligence and making it accessible to
              everyone through engaging and practical lessons.
            </p>
            <div className="cta-buttons" data-aos="fade-up" data-aos-delay="300">
              <Link to="/courses" className="btn btn-primary">
                Explore AI Courses
              </Link>
              <Link to="/contact" className="btn btn-outline">
                Get Personalized Learning Path
              </Link>
            </div>
            <div
              className="hero-stats"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <div className="stat-item">
                <span className="stat-number">5+</span>
                <span className="stat-label">Years Teaching AI</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">500+</span>
                <span className="stat-label">Students Empowered</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">95%</span>
                <span className="stat-label">Student Satisfaction</span>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="hero-image">
              <img
                src="./assets/img/hero/hero.png"
                alt="AI Learning Hero Image"
                className="img-fluid"
                data-aos="zoom-out"
                data-aos-delay="300"
              />
              <div className="shape-1"></div>
              <div className="shape-2"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;