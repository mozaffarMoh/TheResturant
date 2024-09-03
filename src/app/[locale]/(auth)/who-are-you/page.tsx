'use client';
import type { NextPage } from 'next';
import { Box, Button, Grid, Paper, Stack } from '@mui/material';
import { logoImage, whoAreYouBgImage } from '@/constant/images';
import styles from '../sign-in/page.module.css';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import { useEffect, useState } from 'react';
import { ToggleButtonGroup, Button as JoyButton } from '@mui/joy';
import whoAreStyles from './page.module.css';
import { useTranslations } from 'next-intl';
import Cookies from 'js-cookie';
import { usePathname, useRouter } from 'next/navigation';

const WhoAreYouPage: NextPage = () => {
  const router = useRouter();
  const formData: any = localStorage.getItem('formData');
  const pathname = usePathname();
  let isArabic = pathname.startsWith('/ar');
  const langCurrent = pathname.slice(1, 3) || 'en';
  const t = useTranslations();
  const [type, setType] = useState('');
  const [typesArray, setTypesArray] = useState([]);

  useEffect(() => {
    if (!formData) {
      router.push(`/${langCurrent}/sign-up`);
    } else {
      let parsedTypes = JSON.parse(formData);
      setTypesArray(parsedTypes?.inputs?.[0]?.input_options);
    }
  }, [formData]);

  const handleChooseType = () => {
    router.push(`/${langCurrent}/details/${type}`);
    Cookies.set('userType', type);
  };

  return formData ? (
    <div className={styles.signInContainer}>
      <head>
        <title>{t('metadata.who_are_you')}</title>
        <meta
          name="description"
          content="Welcome to the Who Are You page of The Platform Website"
        />
      </head>

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
              <div className="mb-1 sm-flex-row-row-center-center mt-2">
                <img
                  src={logoImage}
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
              <Box className="sm-flex-col-col-center-center">
                <ToggleButtonGroup
                  orientation="vertical"
                  variant="plain"
                  value={type}
                  onChange={(_, newType) => {
                    setType(newType as string);
                  }}
                  aria-label="text alignment"
                >
                  {typesArray.map((item: any) => {
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
                  })}
                </ToggleButtonGroup>
                <p className="fc-secondary"> {t('who-are-you.select')}</p>
              </Box>
              <Stack
                direction={'row'}
                justifyContent={'space-between'}
              >
                <Button
                  variant="outlined"
                  sx={{
                    border: 'none',
                    marginBottom: '4rem',
                    textDecoration: 'underline',
                    textTransform: 'none',
                    fontSize: '1.2rem',
                    gap: isArabic ? '10px' : '',
                    '&:hover': {
                      border: 'none',
                      backgroundColor: 'transparent',
                    },
                  }}
                  startIcon={
                    isArabic ? (
                      <KeyboardDoubleArrowRightIcon />
                    ) : (
                      <KeyboardDoubleArrowLeftIcon />
                    )
                  }
                  onClick={() => {
                    router.push(`/${langCurrent}/sign-up`);
                  }}
                >
                  {t('who-are-you.back')}
                </Button>

                <Button
                  variant="outlined"
                  sx={{
                    border: 'none',
                    marginBottom: '4rem',
                    marginLeft: !isArabic ? '10rem' : '',
                    textDecoration: 'underline',
                    textTransform: 'none',
                    fontSize: '1.2rem',
                    gap: isArabic ? '10px' : '',
                    '&:hover': {
                      border: 'none',
                      backgroundColor: 'transparent',
                    },
                  }}
                  disabled={!type ? true : false}
                  onClick={handleChooseType}
                  endIcon={
                    isArabic ? (
                      <KeyboardDoubleArrowLeftIcon />
                    ) : (
                      <KeyboardDoubleArrowRightIcon />
                    )
                  }
                >
                  {t('who-are-you.next')}
                </Button>
              </Stack>
            </Box>
          </Grid>
          <Grid
            item
            xs={false}
            sm={4}
            md={6}
            sx={{
              backgroundImage: `url(${whoAreYouBgImage})`,
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
