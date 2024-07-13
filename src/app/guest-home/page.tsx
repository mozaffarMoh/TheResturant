'use client';

import type { NextPage } from 'next';
import { Container } from '@mui/material';
import styles from './page.module.css';
import { Header, HeroSection } from './components';

const GuestHome: NextPage = () => {
  return (
    <>
      <Header />

      <HeroSection />
      
      <Container>
        <div>
          <h1>Home Page</h1>
        </div>
      </Container>
    </>
  );
};

export default GuestHome;
