import React from 'react';
import { Link } from 'react-router-dom';
import Isotope from 'isotope-layout';
import imagesLoaded from 'imagesloaded';
import portfolioData from '../assets/data/portfolioData';

function Portfolio() {
  const [isotope, setIsotope] = React.useState(null);
  const [filterKey, setFilterKey] = React.useState('*');

  React.useEffect(() => {
    if (portfolioData.length > 0) {
      const grid = document.querySelector('.isotope-container');
      imagesLoaded(grid, function () {
        const iso = new Isotope(grid, {
          itemSelector: '.isotope-item',
          layoutMode: 'masonry',
          percentPosition: true,
        });

        setIsotope(iso);
      });
    }
  }, [portfolioData]); // Dependency on portfolioData


  React.useEffect(() => {
    if (isotope) {
      filterKey === '*'
        ? isotope.arrange({ filter: `*` })
        : isotope.arrange({ filter: `.${filterKey}` });
    }
  }, [isotope, filterKey]);



  const handleFilterKeyChange = (key) => {
    setFilterKey(key);
  };

  return (
    <section id="portfolio" className="portfolio section">
      {/* Section Title */}
      <div className="container section-title" data-aos="fade-up">
        <h2>AI Teaching Portfolio</h2>
        <div className="title-shape">
          <svg viewBox="0 0 200 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M 0,10 C 40,0 60,20 100,10 C 140,0 160,20 200,10" fill="none" stroke="currentColor" strokeWidth="2"></path>
          </svg>
        </div>
        <p>Explore a showcase of our AI-powered teaching initiatives and seamless integrations with your existing tools.</p>
      </div>{/* End Section Title */}

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="isotope-layout" data-default-filter="*" data-layout="masonry" data-sort="original-order">
          <div className="portfolio-filters-container" data-aos="fade-up" data-aos-delay="200">
            <ul className="portfolio-filters isotope-filters">
              <li onClick={() => handleFilterKeyChange('*')} className={filterKey === '*' ? 'filter-active' : ''} data-filter="*">All Projects</li>
              <li onClick={() => handleFilterKeyChange('filter-ai-tutor')} className={filterKey === 'filter-ai-tutor' ? 'filter-active' : ''} data-filter=".filter-ai-tutor">AI Tutors</li>
              <li onClick={() => handleFilterKeyChange('filter-personalized-learning')} className={filterKey === 'filter-personalized-learning' ? 'filter-active' : ''} data-filter=".filter-personalized-learning">Personalized Learning</li>
              <li onClick={() => handleFilterKeyChange('filter-content-generation')} className={filterKey === 'filter-content-generation' ? 'filter-active' : ''} data-filter=".filter-content-generation">Content Generation</li>
              <li onClick={() => handleFilterKeyChange('filter-assessment')} className={filterKey === 'filter-assessment' ? 'filter-active' : ''} data-filter=".filter-assessment">AI-Powered Assessment</li>
              <li onClick={() => handleFilterKeyChange('filter-integrations')} className={filterKey === 'filter-integrations' ? 'filter-active' : ''} data-filter=".filter-integrations">Integrations</li>
            </ul>
          </div>

          <div className="row g-4 isotope-container" data-aos="fade-up" data-aos-delay="300">
            {portfolioData.map((item) => (
              <div key={item.id} className={`col-lg-6 col-md-6 portfolio-item isotope-item filter-${item.category.toLowerCase().replace(/ /g, '-')}`}>
                <div className="portfolio-card">
                  <div className="portfolio-image">
                    <img src={item.image} className="img-fluid" alt={item.title} loading="lazy" />
                    <div className="portfolio-overlay">
                      <div className="portfolio-actions">
                        <a href={item.image} className="glightbox preview-link" data-gallery={`portfolio-gallery-${item.category.toLowerCase().replace(/ /g, '-')}`}><i className="bi bi-eye"></i></a>
                        <Link to={`/portfolio-details/${item.id}`} className="details-link"><i className="bi bi-arrow-right"></i></Link>
                      </div>
                    </div>
                  </div>
                  <div className="portfolio-content">
                    <span className="category">{item.category}</span>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Portfolio;