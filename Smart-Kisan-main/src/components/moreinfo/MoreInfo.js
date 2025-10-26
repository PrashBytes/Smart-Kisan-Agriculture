import React, { useState } from 'react';
import { FaBook, FaNewspaper, FaHandsHelping, FaUniversity, FaCalendarAlt } from 'react-icons/fa';
import { useLanguage } from '../../context/LanguageContext';
import './MoreInfo.css';

const MoreInfo = () => {
  const { translate } = useLanguage();
  const [activeTab, setActiveTab] = useState('tips');
  
  // Sample data for farming tips
  const farmingTips = [
    {
      id: 1,
      title: 'Soil Testing',
      content: 'Regular soil testing helps determine nutrient levels and pH balance. Test your soil at least once every two years to optimize fertilizer application.',
      image: 'soil-testing.svg'
    },
    {
      id: 2,
      title: 'Crop Rotation',
      content: 'Implement crop rotation to break pest cycles, improve soil health, and reduce the need for synthetic fertilizers. Rotate between legumes and non-legumes.',
      image: 'crop-rotation.svg'
    },
    {
      id: 3,
      title: 'Water Conservation',
      content: 'Use drip irrigation or micro-sprinklers to reduce water usage. Water early in the morning to minimize evaporation and fungal diseases.',
      image: 'water-conservation.svg'
    },
    {
      id: 4,
      title: 'Integrated Pest Management',
      content: 'Adopt IPM practices to control pests with minimal environmental impact. Use biological controls when possible before resorting to chemical pesticides.',
      image: 'pest-management.svg'
    }
  ];
  
  // Sample data for government schemes
  const govSchemes = [
    {
      id: 1,
      title: 'PM-KISAN',
      description: 'Provides income support of ₹6,000 per year to all farmer families in three equal installments.',
      eligibility: 'All landholding farmers with cultivable land',
      link: 'https://pmkisan.gov.in'
    },
    {
      id: 2,
      title: 'Pradhan Mantri Fasal Bima Yojana',
      description: 'Crop insurance scheme to provide financial support to farmers suffering crop loss/damage due to unforeseen events.',
      eligibility: 'All farmers growing notified crops',
      link: 'https://pmfby.gov.in'
    },
    {
      id: 3,
      title: 'Soil Health Card Scheme',
      description: 'Provides information on soil nutrient status and recommendations on appropriate dosage of nutrients for improving soil health and fertility.',
      eligibility: 'All farmers',
      link: 'https://soilhealth.dac.gov.in'
    }
  ];
  
  // Sample data for agricultural news
  const agNews = [
    {
      id: 1,
      title: 'New Drought-Resistant Wheat Variety Released',
      date: 'June 15, 2023',
      summary: 'Agricultural scientists have developed a new wheat variety that can withstand prolonged drought conditions while maintaining yield.',
      source: 'Agricultural Research Journal'
    },
    {
      id: 2,
      title: 'Government Increases MSP for Kharif Crops',
      date: 'May 28, 2023',
      summary: 'The cabinet has approved an increase in the minimum support prices for kharif crops for the 2023-24 marketing season.',
      source: 'Ministry of Agriculture'
    },
    {
      id: 3,
      title: 'New Mobile App Launched for Pest Identification',
      date: 'April 10, 2023',
      summary: 'A new mobile application using AI technology helps farmers identify crop pests and diseases through smartphone cameras.',
      source: 'Tech for Agriculture'
    }
  ];
  
  // Sample data for expert consultation
  const experts = [
    {
      id: 1,
      name: 'Dr. Rajesh Kumar',
      specialty: 'Soil Science',
      experience: '15 years',
      availability: 'Mon, Wed, Fri (10 AM - 12 PM)',
      contact: 'rajesh.kumar@agriexpert.com'
    },
    {
      id: 2,
      name: 'Dr. Priya Singh',
      specialty: 'Plant Pathology',
      experience: '12 years',
      availability: 'Tue, Thu (2 PM - 4 PM)',
      contact: 'priya.singh@agriexpert.com'
    },
    {
      id: 3,
      name: 'Dr. Amit Verma',
      specialty: 'Agricultural Economics',
      experience: '10 years',
      availability: 'Mon, Fri (3 PM - 5 PM)',
      contact: 'amit.verma@agriexpert.com'
    }
  ];
  
  // Sample data for upcoming events
  const events = [
    {
      id: 1,
      title: 'National Agricultural Fair',
      date: 'July 15-17, 2023',
      location: 'Delhi Exhibition Center',
      description: 'Annual agricultural exhibition showcasing latest farming technologies and innovations.'
    },
    {
      id: 2,
      title: 'Organic Farming Workshop',
      date: 'August 5, 2023',
      location: 'Agricultural University, Pune',
      description: 'Hands-on workshop on organic farming practices and certification process.'
    },
    {
      id: 3,
      title: 'Irrigation Technology Seminar',
      date: 'August 20, 2023',
      location: 'Virtual (Online)',
      description: 'Learn about the latest irrigation technologies and water conservation methods.'
    }
  ];
  
  return (
    <div className="moreinfo-container">
      <h1 className="moreinfo-title">{translate('agriculturalResources')}</h1>
      
      <div className="tabs-container">
        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'tips' ? 'active' : ''}`}
            onClick={() => setActiveTab('tips')}
          >
            <FaBook /> {translate('farmingTips')}
          </button>
          <button 
            className={`tab ${activeTab === 'schemes' ? 'active' : ''}`}
            onClick={() => setActiveTab('schemes')}
          >
            <FaUniversity /> {translate('governmentSchemes')}
          </button>
          <button 
            className={`tab ${activeTab === 'news' ? 'active' : ''}`}
            onClick={() => setActiveTab('news')}
          >
            <FaNewspaper /> {translate('agriculturalNews')}
          </button>
          <button 
            className={`tab ${activeTab === 'experts' ? 'active' : ''}`}
            onClick={() => setActiveTab('experts')}
          >
            <FaHandsHelping /> {translate('expertConsultation')}
          </button>
          <button 
            className={`tab ${activeTab === 'events' ? 'active' : ''}`}
            onClick={() => setActiveTab('events')}
          >
            <FaCalendarAlt /> {translate('upcomingEvents')}
          </button>
        </div>
        
        <div className="tab-content">
          {activeTab === 'tips' && (
            <div className="tips-container">
              <h2>{translate('farmingTipsBestPractices')}</h2>
              <div className="tips-grid">
                {farmingTips.map(tip => (
                  <div key={tip.id} className="tip-card">
                    <h3 className="tip-title">{tip.title}</h3>
                    <p className="tip-content">{tip.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'schemes' && (
            <div className="schemes-container">
              <h2>{translate('governmentAgriculturalSchemes')}</h2>
              <div className="schemes-list">
                {govSchemes.map(scheme => (
                  <div key={scheme.id} className="scheme-card">
                    <h3 className="scheme-title">{scheme.title}</h3>
                    <p className="scheme-description">{scheme.description}</p>
                    <div className="scheme-eligibility">
                      <strong>{translate('eligibility')}</strong> {scheme.eligibility}
                    </div>
                    <a href={scheme.link} target="_blank" rel="noopener noreferrer" className="scheme-link">
                      {translate('learnMoreApply')}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'news' && (
            <div className="news-container">
              <h2>{translate('agriculturalNewsUpdates')}</h2>
              <div className="news-list">
                {agNews.map(news => (
                  <div key={news.id} className="news-card">
                    <div className="news-date">{news.date}</div>
                    <h3 className="news-title">{news.title}</h3>
                    <p className="news-summary">{news.summary}</p>
                    <div className="news-source">{translate('source')} {news.source}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'experts' && (
            <div className="experts-container">
              <h2>{translate('expertConsultation')}</h2>
              <p className="experts-intro">
                {translate('connectWithExperts')}
              </p>
              <div className="experts-list">
                {experts.map(expert => (
                  <div key={expert.id} className="expert-card">
                    <h3 className="expert-name">{expert.name}</h3>
                    <div className="expert-specialty">
                      <strong>{translate('specialty')}</strong> {expert.specialty}
                    </div>
                    <div className="expert-experience">
                      <strong>{translate('experience')}</strong> {expert.experience}
                    </div>
                    <div className="expert-availability">
                      <strong>{translate('availability')}</strong> {expert.availability}
                    </div>
                    <div className="expert-contact">
                      <strong>{translate('contact')}</strong> {expert.contact}
                    </div>
                    <button className="btn btn-primary mt-3">{translate('scheduleConsultation')}</button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'events' && (
            <div className="events-container">
              <h2>{translate('upcomingAgriculturalEvents')}</h2>
              <div className="events-list">
                {events.map(event => (
                  <div key={event.id} className="event-card">
                    <div className="event-date">{event.date}</div>
                    <h3 className="event-title">{event.title}</h3>
                    <div className="event-location">
                      <strong>{translate('location')}</strong> {event.location}
                    </div>
                    <p className="event-description">{event.description}</p>
                    <button className="btn btn-outline-primary mt-2">{translate('addToCalendar')}</button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="feedback-section">
        <h3>{translate('haveQuestionSuggestion')}</h3>
        <p>{translate('contactUsText')}</p>
        <button className="btn btn-success">{translate('contactUs')}</button>
      </div>
    </div>
  );
};

export default MoreInfo;