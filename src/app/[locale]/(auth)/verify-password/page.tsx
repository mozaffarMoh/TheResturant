'use client';
import type { NextPage } from 'next';

import { Grid, Paper, Stack } from '@mui/material';
import { loginBgImage } from '@/constant/images';
import styles from './page.module.css';
import { useTranslations } from 'next-intl';
import OtpForgetPassword from '@/sections/sign-in/OtpForgetPassword';
import UpdatePassword from '@/sections/sign-in/UpdatePassword';
import { useEffect, useState } from 'react';

const SignIn: NextPage = () => {
  const t = useTranslations();
  const [isNextStep, setIsNextStep] = useState(false);
  const [isClientSide, setIsClientSide] = useState(false);

  useEffect(() => {
    setIsClientSide(true);
  }, []);
  return (
    <div className={styles.signInContainer}>
      {isClientSide && (
        <head>
          <title>The Platform | Verify-Password</title>
          <meta
            name="description"
            content="Welcome to the Verify-Password page of The Platform Website"
          />
        </head>
      )}
      <div className="w-full ">
        <Grid
          container
          component="main"
          className={styles.TwoSideContainer}
        >
          <Grid
            item
            xs={12}
            sm={8}
            md={6}
            component={Paper}
            elevation={6}
            square
            className="sm-flex-row-row-center-center"
          >
            <Stack sx={{ mt: 4 }}>
              <div className="mb-1">
                <img
                  src={loginBgImage}
                  alt="image"
                />
              </div>{' '}
              {!isNextStep ? (
                <OtpForgetPassword handleNextStep={() => setIsNextStep(true)} />
              ) : (
                <UpdatePassword />
              )}
            </Stack>
          </Grid>
          <Grid
            item
            xs={false}
            sm={4}
            md={6}
            sx={{
              backgroundImage: !isNextStep
                ? 'url("/code.jpg")'
                : 'url("/key.jpg")',
              backgroundColor: 'gray',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </Grid>
      </div>
    </div>
  );
};

export default SignIn;
