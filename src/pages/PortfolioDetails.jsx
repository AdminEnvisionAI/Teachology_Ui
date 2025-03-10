import React from 'react';
import { useParams, Link } from 'react-router-dom';

function PortfolioDetails({ portfolioData }) {
  const { id } = useParams();
  const portfolioItem = portfolioData.find((item) => item.id === parseInt(id));

  if (!portfolioItem) {
    return (
      <div className="container">
        <h2>Portfolio Item Not Found</h2>
        <Link to="/portfolio">Back to Portfolio</Link>
      </div>
    );
  }

  return (
    <section id="portfolio-details" className="portfolio-details section">
      <div className="container">
        <h2>{portfolioItem.title}</h2>
        <img src={portfolioItem.image} alt={portfolioItem.title} className="img-fluid" />
        <p>{portfolioItem.details}</p>
        <Link to="/portfolio">Back to Portfolio</Link>
      </div>
    </section>
  );
}

export default PortfolioDetails;