'use client';
import type { NextPage } from 'next';
import './page.css';
import { HeroSection } from '@/sections/guest-home';
import AboutUsSection from '@/sections/guest-home/about-us/aboutUsSection';
import ServicesSection from '@/sections/guest-home/services-section/servicesSection';
import AuthFooter from '@/components/auth-footer/AuthFooter';
import PartnerSection from '@/sections/guest-home/partner/PartnerSection';
import ContactUsSection from '@/sections/guest-home/contact-us/contactUsSection';
import GuestHeader from '@/sections/guest-home/guest-header/guest-header';
import useGet from '@/custom-hooks/useGet';
import { endPoints } from '@/base-api/endPoints';
import { useEffect, useState } from 'react';
import CardsSection from '@/sections/guest-home/cards-section/cardsSection';
import VideoSection from '@/sections/guest-home/VideoSection/VideoSection';

const PublicHomePage: NextPage = () => {
  const [data, loading, getData] = useGet(endPoints.ladningPage);
  const [heroData, setHeroData] = useState({});
  const [cardsData, setCardsData] = useState({});
  const [videoData, setVideoData]: any = useState({});
  const [partnersData, setPartnersData]: any = useState({});
  const [aboutData, setAboutData] = useState({});
  const [servicesData, setServicesData] = useState({});
  const [isClientSide, setIsClientSide] = useState(false);

  useEffect(() => {
    getData();
    setIsClientSide(true);
  }, []);

  useEffect(() => {
    if (data?.children) {
      data?.children.forEach((item: any) => {
        item.slug == 'welcome' && setHeroData(item);
        item.slug == 'four-boxes' && setCardsData(item);
        item.slug == 'explanatory-video' && setVideoData(item);
        item.slug == 'about-us' && setAboutData(item);
        item.slug == 'services' && setServicesData(item);
        item.slug == 'partners' && setPartnersData(item);
      });
    }
  }, [data]);

  return (
    <>
      {isClientSide && (
        <head>
          <title>The Platform | Guest-Page</title>
          <meta
            name="description"
            content="Welcome to the Guest-Page page of The Platform Website"
          />
        </head>
      )}
      <GuestHeader partnersData={partnersData} />
      <HeroSection
        data={heroData}
        loading={loading}
      />
      <CardsSection
        data={cardsData}
        loading={loading}
      />
      {videoData?.value && (
        <VideoSection
          data={videoData}
          loading={loading}
        />
      )}
      <AboutUsSection
        data={aboutData}
        loading={loading}
      />
      <ServicesSection
        data={servicesData}
        loading={loading}
      />
      <PartnerSection
        data={partnersData}
        loading={loading}
      />
      <ContactUsSection />
      <AuthFooter />
    </>
  );
};

export default PublicHomePage;
