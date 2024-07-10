'use client';
import type { NextPage } from 'next';

import { Box, Button, Grid, Paper } from '@mui/material';
import Link from 'next/link';
import { loginBgImage } from '@/constant/images';
import styles from '../../sign-in/page.module.css';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';

const WhoAreYouPage: NextPage = () => {
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
                  <span className="fc-secondary">Student</span> Details!
                </p>
              </div>
              <div className="sm-flex-col-col scrollable-container ">
                lkjsdfldsn;
              </div>
              <div className=" sm-flex-row-row-center-between  w-full mt-2 ">
                <Link href={'/who-are-you'}>
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
                <Link href={'/who-are-you'}>
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
                    Submit
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
              backgroundImage: 'url("/details.png")',
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
