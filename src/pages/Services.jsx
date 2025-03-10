import React from 'react';
import { Link } from 'react-router-dom';

function Services() {
    return (
        <section id="services" className="services section">
            {/* Section Title */}
            <div className="container section-title" data-aos="fade-up">
                <h2>AI Learning Services</h2>
                <div className="title-shape">
                    <svg viewBox="0 0 200 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M 0,10 C 40,0 60,20 100,10 C 140,0 160,20 200,10" fill="none" stroke="currentColor" strokeWidth="2"></path>
                    </svg>
                </div>
                <p>Explore our comprehensive range of AI training services designed to empower individuals and organizations with the skills they need to thrive in the age of AI.</p>
            </div>{/* End Section Title */}

            <div className="container" data-aos="fade-up" data-aos-delay="100">
                <div className="row align-items-center">
                    <div className="col-lg-4 mb-5 mb-lg-0">
                        <h2 className="fw-bold mb-4 servies-title">Transforming Aspiring Minds into AI Innovators</h2>
                        <p className="mb-4">We offer a variety of flexible AI learning options, from introductory courses to advanced specialization programs, all designed to fit your unique learning style and career goals.</p>
                        <Link to="/courses" className="btn btn-outline-primary">View Learning Options</Link>
                    </div>
                    <div className="col-lg-8">
                        <div className="row g-4">
                            <div className="col-md-6" data-aos="fade-up" data-aos-delay="200">
                                <div className="service-item">
                                    <i className="bi bi-person-video3 icon"></i>
                                    <h3><Link to="/service-details/live-online-courses">Live Online AI Training</Link></h3>
                                    <p>Engage in interactive live sessions with expert instructors, collaborate with peers, and get real-time feedback on your AI projects.</p>
                                </div>
                            </div>{/* End Service Item */}

                            <div className="col-md-6" data-aos="fade-up" data-aos-delay="300">
                                <div className="service-item">
                                    <i className="bi bi-book icon"></i>
                                    <h3><Link to="/service-details/self-paced-learning">Self-Paced AI Courses</Link></h3>
                                    <p>Learn at your own pace with our comprehensive library of on-demand video lectures, coding exercises, and interactive quizzes.</p>
                                </div>
                            </div>{/* End Service Item */}

                            <div className="col-md-6" data-aos="fade-up" data-aos-delay="400">
                                <div className="service-item">
                                    <i className="bi bi-people icon"></i>
                                    <h3><Link to="/service-details/corporate-ai-training">Corporate AI Training Programs</Link></h3>
                                    <p>Upskill your workforce with customized AI training solutions designed to meet your specific business needs and objectives.</p>
                                </div>
                            </div>{/* End Service Item */}

                            <div className="col-md-6" data-aos="fade-up" data-aos-delay="500">
                                <div className="service-item">
                                    <i className="bi bi-person icon"></i>
                                    <h3><Link to="/service-details/personalized-mentoring">Personalized AI Mentoring</Link></h3>
                                    <p>Receive one-on-one guidance from experienced AI mentors who can help you achieve your individual learning and career goals.</p>
                                </div>
                            </div>{/* End Service Item */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Services;