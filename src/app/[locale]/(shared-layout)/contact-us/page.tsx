'use client';
import ContactUsSection from '@/sections/guest-home/contact-us/contactUsSection';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';

const ContactUsPage: NextPage = () => {
  const [isClientSide, setIsClientSide] = useState(false);

  useEffect(() => {
    setIsClientSide(true);
  }, []);

  return (
    <>
      {isClientSide && (
        <head>
          <title>The Platform | Contact-US</title>
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
