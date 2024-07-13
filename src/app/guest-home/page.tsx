'use client';

import type { NextPage } from 'next';
import { Container } from '@mui/material';
import styles from './page.module.css';
import Header from './components/header/page';

const GuestHome: NextPage = () => {
  return (
    <>
      <Header />
      
      <Container>
        <div>
          <h1>Home Page</h1>
        </div>
      </Container>
    </>
  );
};

export default GuestHome;
