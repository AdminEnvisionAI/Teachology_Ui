import React, { useState } from 'react';

function Faq() {
    const [activeFaq, setActiveFaq] = useState(null);

    const toggleFaq = (index) => {
        setActiveFaq(activeFaq === index ? null : index);
    };

    return (
        <section id="faq" className="faq section">
            {/* Section Title */}
            <div className="container section-title" data-aos="fade-up">
                <h2>Frequently Asked Questions About AI Learning</h2>
                <div className="title-shape">
                    <svg viewBox="0 0 200 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M 0,10 C 40,0 60,20 100,10 C 140,0 160,20 200,10" fill="none" stroke="currentColor" strokeWidth="2"></path>
                    </svg>
                </div>
                <p>Get answers to common questions about our AI courses, learning paths, and how we can help you master the world of Artificial Intelligence.</p>
            </div>{/* End Section Title */}

            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-10" data-aos="fade-up" data-aos-delay="100">
                        <div className="faq-container">
                            <div className={`faq-item ${activeFaq === 0 ? 'faq-active' : ''}`} onClick={() => toggleFaq(0)}>
                                <h3>What is Artificial Intelligence, and why should I learn it?</h3>
                                <div className="faq-content">
                                    <p>Artificial Intelligence (AI) is the simulation of human intelligence in machines programmed to think and learn like humans. Learning AI opens doors to exciting career opportunities, empowers you to build innovative solutions, and helps you understand the technology shaping the future.</p>
                                </div>
                                <i className="faq-toggle bi bi-chevron-right"></i>
                            </div>{/* End Faq item*/}

                            <div className={`faq-item ${activeFaq === 1 ? 'faq-active' : ''}`} onClick={() => toggleFaq(1)}>
                                <h3>What are the prerequisites for your AI courses?</h3>
                                <div className="faq-content">
                                    <p>Some of our advanced courses may require basic programming knowledge (e.g., Python). However, we also offer introductory courses designed for beginners with no prior experience. Check the course description for specific prerequisites.</p>
                                </div>
                                <i className="faq-toggle bi bi-chevron-right"></i>
                            </div>{/* End Faq item*/}

                            <div className={`faq-item ${activeFaq === 2 ? 'faq-active' : ''}`} onClick={() => toggleFaq(2)}>
                                <h3>What kind of AI skills will I learn in your courses?</h3>
                                <div className="faq-content">
                                    <p>Our courses cover a wide range of AI skills, including Machine Learning, Deep Learning, Natural Language Processing (NLP), Computer Vision, and more. You'll learn practical techniques and tools for building real-world AI applications.</p>
                                </div>
                                <i className="faq-toggle bi bi-chevron-right"></i>
                            </div>{/* End Faq item*/}

                            <div className={`faq-item ${activeFaq === 3 ? 'faq-active' : ''}`} onClick={() => toggleFaq(3)}>
                                <h3>How long does it take to complete an AI course?</h3>
                                <div className="faq-content">
                                    <p>The duration of our AI courses varies depending on the complexity and depth of the material. Most courses range from a few weeks to several months. Check the course syllabus for the estimated completion time.</p>
                                </div>
                                <i className="faq-toggle bi bi-chevron-right"></i>
                            </div>{/* End Faq item*/}

                            <div className={`faq-item ${activeFaq === 4 ? 'faq-active' : ''}`} onClick={() => toggleFaq(4)}>
                                <h3>Do you offer certificates upon completion of your AI courses?</h3>
                                <div className="faq-content">
                                    <p>Yes, we offer certificates of completion for all our AI courses. These certificates can be used to demonstrate your skills to potential employers and enhance your professional profile.</p>
                                </div>
                                <i className="faq-toggle bi bi-chevron-right"></i>
                            </div>{/* End Faq item*/}

                            <div className={`faq-item ${activeFaq === 5 ? 'faq-active' : ''}`} onClick={() => toggleFaq(5)}>
                                <h3>What support is available to students taking your AI courses?</h3>
                                <div className="faq-content">
                                    <p>We provide comprehensive support to our students, including access to online forums, Q&A sessions with instructors, and dedicated support staff to answer your questions and provide guidance throughout your learning journey.</p>
                                </div>
                                <i className="faq-toggle bi bi-chevron-right"></i>
                            </div>{/* End Faq item*/}
                        </div>
                    </div>{/* End Faq Column*/}
                </div>
            </div>
        </section>
    );
}

export default Faq;