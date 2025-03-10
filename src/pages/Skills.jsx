import React from 'react';

function Skills() {
  return (
    <section id="skills" className="skills section">
      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row g-4 skills-animation">
          <div className="col-md-6 col-lg-3" data-aos="fade-up" data-aos-delay="100">
            <div className="skill-box">
              <h3>HTML</h3>
              <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem.</p>
              <span className="text-end d-block">90%</span>
              <div className="progress">
                <div className="progress-bar" role="progressbar" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-3" data-aos="fade-up" data-aos-delay="200">
            <div className="skill-box">
              <h3>CSS</h3>
              <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur.</p>
              <span className="text-end d-block">90%</span>
              <div className="progress">
                <div className="progress-bar" role="progressbar" aria-valuenow="95" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-3" data-aos="fade-up" data-aos-delay="300">
            <div className="skill-box">
              <h3>JavaScript</h3>
              <p>Neque porro quisquam est qui dolorem ipsum quia dolor.</p>
              <span className="text-end d-block">80%</span>
              <div className="progress">
                <div className="progress-bar" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-3" data-aos="fade-up" data-aos-delay="400">
            <div className="skill-box">
              <h3>Photoshop</h3>
              <p>Quis autem vel eum iure reprehenderit qui in ea voluptate.</p>
              <span className="text-end d-block">55%</span>
              <div className="progress">
                <div className="progress-bar" role="progressbar" aria-valuenow="55" aria-valuemin="0" aria-valuemax="100">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;