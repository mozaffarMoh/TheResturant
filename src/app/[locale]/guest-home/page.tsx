'use client';
import type { NextPage } from 'next';
import './page.css';
import { HeroSection } from '@/sections/guest-home';
import AboutUsSection from '@/sections/guest-home/about-us/aboutUsSection';
import ServicesSection from '@/sections/guest-home/services-section/servicesSection';
import AuthFooter from '@/components/auth-footer/AuthFooter';
import CardsSection from '@/components/home-page/cards-section/cardsSection';
import PartnerSection from '@/sections/guest-home/partner/PartnerSection';
import ContactUsSection from '@/sections/guest-home/contact-us/contactUsSection';
import GuestHeader from '@/sections/guest-home/guest-header/guest-header';
import useGet from '@/custom-hooks/useGet';
import { endPoints } from '@/base-api/endPoints';
import Loading from '@/components/Loading/Loading';
import { useEffect, useState } from 'react';

const PublicHomePage: NextPage = () => {
  const [data, loading, getData] = useGet(endPoints.ladningPage);
  const [heroData, setHeroData] = useState({});
  const [cardsData, setCardsData] = useState({});
  const [partnersData, setPartnersData]: any = useState({});
  const [aboutData, setAboutData] = useState({});
  const [servicesData, setServicesData] = useState({});

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (data?.children) {
      data?.children.forEach((item: any) => {
        item.slug == 'welcome' && setHeroData(item);
        item.slug == 'four-boxes' && setCardsData(item);
        item.slug == 'about-us' && setAboutData(item);
        item.slug == 'services' && setServicesData(item);
        item.slug == 'partners' && setPartnersData(item);
      });
    }
  }, [data]);

  return (
    <>
      {loading && <Loading />}
      <GuestHeader />
      <HeroSection data={heroData} />
      <CardsSection data={cardsData} />
      <AboutUsSection data={aboutData} />
      <ServicesSection data={servicesData} />
      <PartnerSection data={partnersData} />
      <ContactUsSection />
      <AuthFooter />
    </>
  );
};

export default PublicHomePage;
