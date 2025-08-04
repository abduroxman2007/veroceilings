import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/faq.css';

const FAQ = () => {
  const { t } = useTranslation();
  const [activeFAQ, setActiveFAQ] = useState(null);

  const faqData = [
    {
      id: 1,
      question: t('faq.q1.question'),
      answer: t('faq.q1.answer')
    },
    {
      id: 2,
      question: t('faq.q2.question'),
      answer: t('faq.q2.answer')
    },
    {
      id: 3,
      question: t('faq.q3.question'),
      answer: t('faq.q3.answer')
    },
    {
      id: 4,
      question: t('faq.q4.question'),
      answer: t('faq.q4.answer')
    },
    {
      id: 5,
      question: t('faq.q5.question'),
      answer: t('faq.q5.answer')
    },
    {
      id: 6,
      question: t('faq.q6.question'),
      answer: t('faq.q6.answer')
    }
  ];

  const toggleFAQ = (id) => {
    setActiveFAQ(activeFAQ === id ? null : id);
  };

  const leftColumnFAQs = faqData.slice(0, 3);
  const rightColumnFAQs = faqData.slice(3, 6);

  return (
    <section className="faq-section" id="faq">
      <div className="faq-container">
        <div className="faq-header">
          <h2>{t('faq.title')}</h2>
        </div>
        
        <div className="faq-grid">
          {/* Left Column */}
          <div className="faq-column">
            {leftColumnFAQs.map((faq) => (
              <div
                key={faq.id}
                className={`faq-item ${activeFAQ === faq.id ? 'active' : ''}`}
              >
                <button
                  className="faq-question"
                  onClick={() => toggleFAQ(faq.id)}
                  aria-expanded={activeFAQ === faq.id}
                  aria-controls={`faq-answer-${faq.id}`}
                >
                  <h3>{faq.question}</h3>
                  <div className="faq-toggle" aria-hidden="true"></div>
                </button>
                <div
                  id={`faq-answer-${faq.id}`}
                  className="faq-answer"
                  role="region"
                  aria-labelledby={`faq-question-${faq.id}`}
                >
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div className="faq-column">
            {rightColumnFAQs.map((faq) => (
              <div
                key={faq.id}
                className={`faq-item ${activeFAQ === faq.id ? 'active' : ''}`}
              >
                <button
                  className="faq-question"
                  onClick={() => toggleFAQ(faq.id)}
                  aria-expanded={activeFAQ === faq.id}
                  aria-controls={`faq-answer-${faq.id}`}
                >
                  <h3>{faq.question}</h3>
                  <div className="faq-toggle" aria-hidden="true"></div>
                </button>
                <div
                  id={`faq-answer-${faq.id}`}
                  className="faq-answer"
                  role="region"
                  aria-labelledby={`faq-question-${faq.id}`}
                >
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
