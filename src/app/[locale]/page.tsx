'use client';
import type { NextPage } from 'next';
import {
  Footer,
  Header,
  HeroSection,
} from '@/sections';

const HomePage: NextPage = () => {
  return (
    <>
      <Header />
      <HeroSection />
      <Footer />
    </>
  );
};

export default HomePage;
