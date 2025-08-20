import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import '../styles/whyus.css';
import { FaChalkboardTeacher, FaCertificate, FaBookOpen } from "react-icons/fa";

const countersData = [
  { icon: <FaChalkboardTeacher />, text: "whyus.features.experience.title", number: 120 },
  { icon: <FaCertificate />, text: "whyus.features.quality.title", number: 80 },
  { icon: <FaBookOpen />, text: "whyus.features.guarantee.title", number: 100 },
];

const Counter = ({ icon, text, number }) => {
  const { t } = useTranslation();
  const [count, setCount] = useState(0);
  const [hasViewed, setHasViewed] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasViewed) {
          let start = 0;
          const end = number;
          let totalMilSecDur = 2000;
          let incrementTime = Math.floor(totalMilSecDur / end);
          let timer = setInterval(() => {
            start += 1;
            setCount(start);
            if (start === end) clearInterval(timer);
          }, incrementTime);
          setHasViewed(true);
        }
      },
      { threshold: 0.6 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [number, hasViewed]);

  return (
    <div className="counter-box" ref={ref}>
      <div className="counter-icon">{icon}</div>
      <div className="counter-number">{count}</div>
      <div className="counter-text">{t(text)}</div>
    </div>
  );
};

const ExpertSection = () => {
  const { t } = useTranslation();

  return (
    <section className="expert-section">
      <h2>
        {t('whyus.title')} <span className="highlight">Vero</span>
      </h2>
      <div className="features">
        <div className="feature">
          <h3>{t('whyus.features.experience.title')}</h3>
          <p>{t('whyus.features.experience.description')}</p>
        </div>
        <div className="feature">
          <h3>{t('whyus.features.quality.title')}</h3>
          <p>{t('whyus.features.quality.description')}</p>
        </div>
        <div className="feature highlight-box tall-box">
          <h3>{t('whyus.features.guarantee.title')}</h3>
          <p>{t('whyus.features.guarantee.description')}</p>
          <button className="start-trial">{t('whyus.start_trial_button')}</button>
        </div>
      </div>
      <div className="counters">
        {countersData.map((item, index) => (
          <Counter key={index} icon={item.icon} text={item.text} number={item.number} />
        ))}
      </div>
    </section>
  );
};

export default ExpertSection;
