import React from 'react';

function Resume() {
  return (
    <section id="resume" className="resume section">
      {/* Section Title */}
      <div className="container section-title" data-aos="fade-up">
        <h2>Resume</h2>
        <div className="title-shape">
          <svg viewBox="0 0 200 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M 0,10 C 40,0 60,20 100,10 C 140,0 160,20 200,10" fill="none" stroke="currentColor" strokeWidth="2"></path>
          </svg>
        </div>
        <p>Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur vel illum qui dolorem</p>
      </div>{/* End Section Title */}

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row">
          <div className="col-12">
            <div className="resume-wrapper">
              <div className="resume-block" data-aos="fade-up">
                <h2>Work Experience</h2>
                <p className="lead">Maecenas tempus tellus eget condimentum rhoncus sem quam semper libero sit amet adipiscing sem neque sed ipsum.</p>

                <div className="timeline">
                  <div className="timeline-item" data-aos="fade-up" data-aos-delay="200">
                    <div className="timeline-left">
                      <h4 className="company">Etiam Industries</h4>
                      <span className="period">Jun, 2023 - Current</span>
                    </div>
                    <div className="timeline-dot"></div>
                    <div className="timeline-right">
                      <h3 className="position">Project Lead</h3>
                      <p className="description">Quia nobis sequi est occaecati aut. Repudiandae et iusto quae reiciendis et quis Eius vel ratione eius unde vitae rerum voluptates asperiores voluptatem Earum molestiae consequatur neque etlon sader mart dila</p>
                    </div>
                  </div>

                  <div className="timeline-item" data-aos="fade-up" data-aos-delay="300">
                    <div className="timeline-left">
                      <h4 className="company">Nullam Corp</h4>
                      <span className="period">2019 - 2023</span>
                    </div>
                    <div className="timeline-dot"></div>
                    <div className="timeline-right">
                      <h3 className="position">Senior graphic design specialist</h3>
                      <p className="description">
                        Curabitur ullamcorper ultricies nisi nam eget dui etiam rhoncus maecenas tempus.
                      </p>
                      <ul>
                        <li>Lead in the design, development, and implementation of the graphic, layout, and production communication materials</li>
                        <li>Delegate tasks to the 7 members of the design team and provide counsel on all aspects of the project. </li>
                        <li>Supervise the assessment of all graphic materials in order to ensure quality and accuracy of the design</li>
                        <li>Oversee the efficient use of production project budgets ranging from $2,000 - $25,000</li>
                      </ul>
                      <p></p>
                    </div>
                  </div>

                  <div className="timeline-item" data-aos="fade-up" data-aos-delay="400">
                    <div className="timeline-left">
                      <h4 className="company">Stepping Stone Ltd.</h4>
                      <span className="period">2015-2019</span>
                    </div>
                    <div className="timeline-dot"></div>
                    <div className="timeline-right">
                      <h3 className="position">Graphic design specialist</h3>
                      <p className="description">Curabitur ullamcorper ultricies nisi nam eget dui etiam rhoncus maecenas tempus.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="resume-block" data-aos="fade-up" data-aos-delay="100">
                <h2>My Education</h2>
                <p className="lead">Maecenas tempus tellus eget condimentum rhoncus sem quam semper libero sit amet adipiscing.</p>

                <div className="timeline">
                  <div className="timeline-item" data-aos="fade-up" data-aos-delay="200">
                    <div className="timeline-left">
                      <h4 className="company">Vestibulum University</h4>
                      <span className="period">2017-2019</span>
                    </div>
                    <div className="timeline-dot"></div>
                    <div className="timeline-right">
                      <h3 className="position">Diploma in Consequat</h3>
                      <p className="description">Curabitur ullamcorper ultricies nisi nam eget dui etiam rhoncus maecenas tempus.</p>
                    </div>
                  </div>

                  <div className="timeline-item" data-aos="fade-up" data-aos-delay="300">
                    <div className="timeline-left">
                      <h4 className="company">Nullam Corp</h4>
                      <span className="period">2019 - 2023</span>
                    </div>
                    <div className="timeline-dot"></div>
                    <div className="timeline-right">
                      <h3 className="position">Master of Fine Arts & Graphic Design</h3>
                      <p className="description">Curabitur ullamcorper ultricies nisi nam eget dui etiam rhoncus maecenas tempus.</p>
                    </div>
                  </div>

                  <div className="timeline-item" data-aos="fade-up" data-aos-delay="400">
                    <div className="timeline-left">
                      <h4 className="company">Vestibulum University</h4>
                      <span className="period">2015-2019</span>
                    </div>
                    <div className="timeline-dot"></div>
                    <div className="timeline-right">
                      <h3 className="position">Bachelor of Fine Arts & Graphic Design</h3>
                      <p className="description">Curabitur ullamcorper ultricies nisi nam eget dui etiam rhoncus maecenas tempus.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Resume;