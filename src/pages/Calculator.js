import React from 'react';
import { useTranslation } from 'react-i18next';
import PageHeader from '../components/PageHeader';
import CeilingCalculator from '../components/CeilingCalculator';
import FAQ from '../components/FAQ';
import ContactForm from '../components/ContactForm';
import bgImg from '../assets/images/slider/slid5.jpg';

function Calculator() {
  const { t } = useTranslation();

  const breadcrumbs = [
    { text: t('navbar.calculator', { defaultValue: 'Калькулятор' }) },
  ];

  return (
    <>
      <PageHeader
        title={t('calculator.page_title', { defaultValue: 'Онлайн-калькулятор подвесных потолков' })}
        breadcrumbs={breadcrumbs}
        backgroundImage={bgImg}
      />
      <CeilingCalculator />
      <FAQ />
      <ContactForm />
    </>
  );
}

export default Calculator;
