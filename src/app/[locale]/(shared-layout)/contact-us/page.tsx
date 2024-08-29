'use client';
import ContactUsSection from '@/sections/guest-home/contact-us/contactUsSection';
import type { NextPage } from 'next';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

const ContactUsPage: NextPage = () => {
  const [isClientSide, setIsClientSide] = useState(false);
  const t = useTranslations();

  useEffect(() => {
    setIsClientSide(true);
  }, []);

  return (
    <>
      {isClientSide && (
        <head>
          <title>{t('metadata.contact_us')}</title>
          <meta
            name="description"
            content="Welcome to the Contact-US page of The Platform Website"
          />
        </head>
      )}
      <ContactUsSection />
    </>
  );
};

export default ContactUsPage;
