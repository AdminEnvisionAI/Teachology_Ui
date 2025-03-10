import React from 'react';

function Contact() {
    return (
        <section id="contact" className="contact section light-background">
            <div className="container" data-aos="fade-up" data-aos-delay="100">
                <div className="row g-5">
                    <div className="col-lg-6">
                        <div className="content" data-aos="fade-up" data-aos-delay="200">
                            <div className="section-category mb-3">Contact</div>
                            <h2 className="display-5 mb-4">Ready to Transform Your Future with AI?</h2>
                            <p className="lead mb-4">Have questions about our AI courses, personalized learning paths, or corporate training programs? Get in touch!</p>

                            <div className="contact-info mt-5">
                                <div className="info-item d-flex mb-3">
                                    <i className="bi bi-envelope-at me-3"></i>
                                    <span>ai.learning@example.com</span>
                                </div>

                                <div className="info-item d-flex mb-3">
                                    <i className="bi bi-telephone me-3"></i>
                                    <span>+1 5589 55488 558</span>
                                </div>

                                <div className="info-item d-flex mb-4">
                                    <i className="bi bi-geo-alt me-3"></i>
                                    <span>Online Learning Platform - Accessible Worldwide</span>
                                </div>

                                <a href="#" className="map-link d-inline-flex align-items-center">
                                    View Virtual Campus
                                    <i className="bi bi-arrow-right ms-2"></i>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <div className="contact-form card" data-aos="fade-up" data-aos-delay="300">
                            <div className="card-body p-4 p-lg-5">
                                <form action="forms/contact.php" method="post" className="php-email-form">
                                    <div className="row gy-4">
                                        <div className="col-12">
                                            <input type="text" name="name" className="form-control" placeholder="Your Name" required="" />
                                        </div>

                                        <div className="col-12 ">
                                            <input type="email" className="form-control" name="email" placeholder="Your Email" required="" />
                                        </div>

                                        <div className="col-12">
                                            <input type="text" className="form-control" name="subject" placeholder="Subject (e.g., Course Inquiry, Corporate Training)" required="" />
                                        </div>

                                        <div className="col-12">
                                            <textarea className="form-control" name="message" rows="6" placeholder="Message" required=""></textarea>
                                        </div>

                                        <div className="col-12 text-center">
                                            <div className="loading">Loading</div>
                                            <div className="error-message"></div>
                                            <div className="sent-message">Your message has been sent. Thank you! We'll be in touch soon.</div>

                                            <button type="submit" className="btn btn-submit w-100">Submit Message</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Contact;