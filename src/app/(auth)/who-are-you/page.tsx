'use client';
import type { NextPage } from 'next';

import { Box, Button, Grid, Paper } from '@mui/material';
import Link from 'next/link';
import { loginBgImage, whoAreYouBgImage } from '@/constant/images';
import styles from '../sign-in/page.module.css';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import { useEffect, useState } from 'react';
import { ToggleButtonGroup, Button as JoyButton } from '@mui/joy';
import whoAreStyles from './page.module.css';

const WhoAreYouPage: NextPage = () => {
  const [type, setType] = useState('student');
  return (
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
                  Who Are <span className="fc-secondary">You</span>
                </p>
              </div>
              <div className="sm-flex-col-col-center-center">
                <ToggleButtonGroup
                  orientation="vertical"
                  variant="plain"
                  value={type}
                  onChange={(event, newType) => {
                    setType(newType as string);
                  }}
                  aria-label="text alignment"
                >
                  <JoyButton
                    value="student"
                    aria-label="student"
                    className={whoAreStyles.singleButtonGroup}
                    style={{
                      backgroundColor:
                        type === 'student' ? 'orange' : 'transparent',
                      color: type === 'student' ? 'white' : 'black',
                    }}
                  >
                    Student
                  </JoyButton>
                  <JoyButton
                    value="mentor"
                    aria-label="mentor"
                    className={whoAreStyles.singleButtonGroup}
                    style={{
                      backgroundColor:
                        type === 'mentor' ? 'orange' : 'transparent',
                      color: type === 'mentor' ? 'white' : 'black',
                    }}
                  >
                    Mentor
                  </JoyButton>
                  <JoyButton
                    value="entrepreneurs"
                    aria-label="entrepreneurs"
                    className={whoAreStyles.singleButtonGroup}
                    style={{
                      backgroundColor:
                        type === 'entrepreneurs' ? 'orange' : 'transparent',
                      color: type === 'entrepreneurs' ? 'white' : 'black',
                    }}
                  >
                    Entrepreneurs
                  </JoyButton>
                </ToggleButtonGroup>
                <p className="fc-secondary">Please select only one</p>
              </div>
              <div className=" sm-flex-row-row-center-between  w-full mt-2 ">
                <Link href={'/sign-up'}>
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
                    Back
                  </Button>
                </Link>
                <Link href={`/details/${type ? type : 'student'}`}>
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
                    endIcon={<KeyboardDoubleArrowRightIcon />}
                  >
                    Next
                  </Button>
                </Link>
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
  );
};

export default WhoAreYouPage;
