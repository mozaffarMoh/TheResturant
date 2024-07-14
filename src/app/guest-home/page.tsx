'use client';

import type { NextPage } from 'next';
import { Container } from '@mui/material';
import styles from './page.module.css';
import { Header, HeroSection } from '@/components/home-page';

const GuestHome: NextPage = () => {
  return (
    <>
      <Header />

      <HeroSection />
    </>
  );
};

export default GuestHome;
