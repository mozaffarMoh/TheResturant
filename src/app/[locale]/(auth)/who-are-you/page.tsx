'use client';
import type { NextPage } from 'next';
import { Box, Button, Grid, Paper } from '@mui/material';
import Link from 'next/link';
import { loginBgImage } from '@/constant/images';
import styles from '../sign-in/page.module.css';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import { useEffect, useState } from 'react';
import { ToggleButtonGroup, Button as JoyButton } from '@mui/joy';
import whoAreStyles from './page.module.css';
import { useTranslations } from 'next-intl';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const WhoAreYouPage: NextPage = () => {
  const router = useRouter();
  const langCookie = Cookies.get('NEXT_LOCALE') || 'en';
  const formData: any = localStorage.getItem('formData');
  const t = useTranslations();
  const [type, setType] = useState('');

  useEffect(() => {
    !formData && router.push(`/${langCookie}/sign-up`);
  }, []);

  const handleChooseType = () => {
    router.push(`/${langCookie}/details/${type}`);
    Cookies.set('userType', type);
  };


  return formData ? (
    <div className={styles.signInContainer}>
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
            <Box className="main-box">
              <div className="mb-1 sm-flex-row-row-center-center">
                <img
                  src={loginBgImage}
                  alt="image"
                />
              </div>{' '}
              <div className=" sm-flex-row-row-center-center">
                <p className=" text-large-title m-1">
                  {t('who-are-you.title1')}{' '}
                  <span className="fc-secondary">
                    {' '}
                    {t('who-are-you.title2')}
                  </span>
                </p>
              </div>
              <div className="sm-flex-col-col-center-center">
                <ToggleButtonGroup
                  orientation="vertical"
                  variant="plain"
                  value={type}
                  onChange={(_, newType) => {
                    setType(newType as string);
                  }}
                  aria-label="text alignment"
                >
                  {JSON.parse(formData).inputs[0].input_options.map(
                    (item: any) => {
                      return (
                        <JoyButton
                          key={item.id}
                          value={item.value}
                          aria-label={item.name}
                          className={whoAreStyles.singleButtonGroup}
                          style={{
                            backgroundColor:
                              type === item.name ? 'orange' : 'transparent',
                            color: type === item.name ? 'white' : 'black',
                          }}
                          disabled={type === item.name}
                        >
                          {item.name}
                        </JoyButton>
                      );
                    },
                  )}
                </ToggleButtonGroup>
                <p className="fc-secondary"> {t('who-are-you.select')}</p>
              </div>
              <div
                className=" sm-flex-row-row-center-between  w-full mt-2 "
                dir="ltr"
              >
                <Link href={`/${langCookie}/sign-up`}>
                  <Button
                    variant="outlined"
                    sx={{
                      border: 'none',
                      marginBottom: '4rem',
                      textDecoration: 'underline',
                      textTransform: 'none',
                      fontSize: '1.2rem',
                      '&:hover': {
                        border: 'none',
                        backgroundColor: 'transparent',
                      },
                    }}
                    startIcon={<KeyboardDoubleArrowLeftIcon />}
                  >
                    {t('who-are-you.back')}
                  </Button>
                </Link>

                <Button
                  variant="outlined"
                  sx={{
                    border: 'none',
                    marginBottom: '4rem',
                    marginLeft: '10rem',
                    textDecoration: 'underline',
                    textTransform: 'none',
                    fontSize: '1.2rem',
                    '&:hover': {
                      border: 'none',
                      backgroundColor: 'transparent',
                    },
                  }}
                  disabled={!type ? true : false}
                  onClick={handleChooseType}
                  endIcon={<KeyboardDoubleArrowRightIcon />}
                >
                  {t('who-are-you.next')}
                </Button>
              </div>
            </Box>
          </Grid>
          <Grid
            item
            xs={false}
            sm={4}
            md={6}
            sx={{
              backgroundImage: 'url("/who-are-you-bg.png")',
              backgroundColor: 'gray',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </Grid>
      </div>
    </div>
  ) : (
    <div></div>
  );
};

export default WhoAreYouPage;