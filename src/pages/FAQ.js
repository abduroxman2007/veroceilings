import React from 'react';
import { useTranslation } from 'react-i18next';
import PageHeader from '../components/PageHeader';
import FAQSection from '../components/FAQ';
import ContactForm from '../components/ContactForm';
import bgImg from '../assets/images/slider/slid4.jpg';

/**
 * The /faq route previously carried its own copy of the accordion markup, but
 * that copy built its data as { questionKey, answerKey } while rendering
 * {faq.question} / {faq.answer} — so every question and answer rendered empty,
 * and each item's React key was undefined. It also had no <h1>.
 *
 * Reusing the working <FAQ /> component removes the duplicated markup and the
 * bug with it; PageHeader supplies the single <h1> the route was missing.
 */
const FAQPage = () => {
  const { t } = useTranslation();

  const breadcrumbs = [
    { text: t('faq.title') },
  ];

  return (
    <>
      <PageHeader
        title={t('faq.page_title')}
        breadcrumbs={breadcrumbs}
        backgroundImage={bgImg}
      />
      <FAQSection />
      <ContactForm />
    </>
  );
};

export default FAQPage;
