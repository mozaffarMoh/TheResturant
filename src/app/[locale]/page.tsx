'use client';
import type { NextPage } from 'next';
import {
  Categories,
  Download,
  FAQs,
  Features,
  Footer,
  Header,
  HeroSection,
  Statistics,
  Testimonials,
  UIScreens,
} from '@/sections';

const HomePage: NextPage = () => {
  return (
    <>
      <Header />
      <HeroSection />
      <Statistics />
      <Features />
      <Categories order={0} />
      <Categories order={1} />
      <UIScreens />
      <Download />
      <Testimonials />
      <FAQs />
      <Footer />
    </>
  );
};

export default HomePage;
