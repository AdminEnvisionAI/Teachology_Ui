import React from 'react';

function About() {
    return (
        <section id="about" className="about section light-background">
            {/* Section Title */}
            <div className="container section-title" data-aos="fade-up">
                <h2>About</h2>
                <div className="title-shape">
                    <svg viewBox="0 0 200 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M 0,10 C 40,0 60,20 100,10 C 140,0 160,20 200,10" fill="none" stroke="currentColor" strokeWidth="2"></path>
                    </svg>
                </div>
                <p>Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur vel illum qui dolorem</p>
            </div>{/* End Section Title */}

            <div className="container" data-aos="fade-up" data-aos-delay="100">

                <div className="row align-items-center">
                    <div className="col-lg-6 position-relative" data-aos="fade-right" data-aos-delay="200">
                        <div className="about-image">
                            <img src="./assets/img/profile/profile-square-2.webp" alt="Profile Image" className="img-fluid rounded-4" />
                        </div>
                    </div>

                    <div className="col-lg-6" data-aos="fade-left" data-aos-delay="300">
                        <div className="about-content">
                            <span className="subtitle">About Me</span>

                            <h2>UI/UX Designer & Web Developer</h2>

                            <p className="lead mb-4">Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>

                            <p className="mb-4">Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet</p>

                            <div className="personal-info">
                                <div className="row g-4">
                                    <div className="col-6">
                                        <div className="info-item">
                                            <span className="label">Name</span>
                                            <span className="value">Eliot Johnson</span>
                                        </div>
                                    </div>

                                    <div className="col-6">
                                        <div className="info-item">
                                            <span className="label">Phone</span>
                                            <span className="value">+123 456 7890</span>
                                        </div>
                                    </div>

                                    <div className="col-6">
                                        <div className="info-item">
                                            <span className="label">Age</span>
                                            <span className="value">26 Years</span>
                                        </div>
                                    </div>

                                    <div className="col-6">
                                        <div className="info-item">
                                            <span className="label">Email</span>
                                            <span className="value">email@example.com</span>
                                        </div>
                                    </div>

                                    <div className="col-6">
                                        <div className="info-item">
                                            <span className="label">Occupation</span>
                                            <span className="value">Lorem Engineer</span>
                                        </div>
                                    </div>

                                    <div className="col-6">
                                        <div className="info-item">
                                            <span className="label">Nationality</span>
                                            <span className="value">Ipsum</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="signature mt-4">
                                <div className="signature-image">
                                    <img src="./assets/img/misc/signature-1.webp" alt="" className="img-fluid" />
                                </div>
                                <div className="signature-info">
                                    <h4>Eliot Johnson</h4>
                                    <p>Adipiscing Elit, Lorem Ipsum</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </section>
    );
}

export default About;