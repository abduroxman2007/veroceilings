import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/home-faq-section.css';

const HomeFAQSection = () => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    { questionKey: 'faq.q1.question', answerKey: 'faq.q1.answer' },
    { questionKey: 'faq.q2.question', answerKey: 'faq.q2.answer' },
    { questionKey: 'faq.q3.question', answerKey: 'faq.q3.answer' },
    { questionKey: 'faq.q4.question', answerKey: 'faq.q4.answer' },
    { questionKey: 'faq.q5.question', answerKey: 'faq.q5.answer' },
    { questionKey: 'faq.q6.question', answerKey: 'faq.q6.answer' },
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="home-faq-section">
      <div className="container">
        <h2 className="home-faq-title">{t('faq.title')}</h2>
        <div className="faq-accordion">
          {faqs.map((faq, index) => (
            <div className="faq-item" key={index}>
              <button
                className="faq-question"
                onClick={() => toggleAccordion(index)}
                aria-expanded={activeIndex === index}
              >
                {t(faq.questionKey)}
                <span className="faq-icon">{activeIndex === index ? '-' : '+' }</span>
              </button>
              <div
                className={`faq-answer-container ${activeIndex === index ? 'active' : ''}`}
                style={{ maxHeight: activeIndex === index ? '200px' : '0px' }}
              >
                <p className="faq-answer">{t(faq.answerKey)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeFAQSection;
