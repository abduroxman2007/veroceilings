import React from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/accessories.css';

import { FaWrench, FaBolt, FaCogs, FaPlug, FaRulerCombined, FaLightbulb } from "react-icons/fa";

const AccessoriesSection = () => {
  const { t } = useTranslation();

  const accessories = [
    { icon: <FaWrench />, title: t('accessories.wrench_set.title'), description: t('accessories.wrench_set.description') },
    { icon: <FaBolt />, title: t('accessories.bolt_kit.title'), description: t('accessories.bolt_kit.description') },
    { icon: <FaCogs />, title: t('accessories.mounting_gear.title'), description: t('accessories.mounting_gear.description') },
    { icon: <FaPlug />, title: t('accessories.connectors.title'), description: t('accessories.connectors.description') },
    { icon: <FaRulerCombined />, title: t('accessories.measuring_tools.title'), description: t('accessories.measuring_tools.description') },
    { icon: <FaLightbulb />, title: t('accessories.led_indicators.title'), description: t('accessories.led_indicators.description') },
  ];

  return (
    <section className="accessories-section">
      <h2 className="accessories-title">{t('accessories.title')}</h2>
      <div className="accessory-grid">
        {accessories.map((item, index) => (
          <div key={index} className="accessory-card">
            <div className="accessory-icon">{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AccessoriesSection;