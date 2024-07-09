import type { NextPage } from 'next';

import { Box, Button, Checkbox, Grid, Paper } from '@mui/material';
import Link from 'next/link';
import { Radio } from '@mui/joy';
import { ClosedEyeSVG, LockSVG, MessageSVG } from '../../../../assets/icons';
import InputV1 from '@/components/inputs/InputV1';
import { loginBgImage } from '@/constant/images';
import { buttonPrimaryColor } from '@/constant/color';
import styles from '../sign-in/page.module.css';

const SingUp: NextPage = () => {
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
            <Box
              className="main-box"
              sx={{ mt: 4 }}
            >
              <div className="mb-1">
                <img
                  src={loginBgImage}
                  alt="image"
                />
              </div>{' '}
              <div className="mb-2 ">
                <p className=" text-large-title m-0">Sign Up</p>
                <p className="text-med">
                  If you don’t have an account register
                </p>
                <p className="text-med ">
                  You can{' '}
                  <Link
                    href={'/sign-in'}
                    className="fw700 text-underline-none fc-black"
                  >
                    Login Here !
                  </Link>
                </p>
              </div>
              <div>
                <div className="mb-3">
                  <label className="fc-light-black">Email</label>
                  <InputV1 startIcon={<MessageSVG />} />
                </div>
                <div className="mb-1">
                  <label className="fc-light-black">Password</label>
                  <div className="mb-2">
                    <InputV1
                      label={'Enter Your Password'}
                      startIcon={<LockSVG />}
                      endIcon={<ClosedEyeSVG />}
                      isPassword
                    />
                  </div>

                  <InputV1
                    label={'Confirm Your Password'}
                    startIcon={<LockSVG />}
                    endIcon={<ClosedEyeSVG />}
                    isPassword
                  />
                </div>
                <div className="sm-flex-row-row-center-start mb-1">
                  <div>
                    {' '}
                    <Checkbox
                      defaultChecked
                      sx={{
                        display: 'inline-block',
                        color: buttonPrimaryColor,
                        '&.Mui-checked': {
                          color: 'orange',
                        },
                      }}
                    />
                  </div>

                  <p>Terms Condition and Privacy Policy</p>
                </div>
                <div>
                  <Button
                    variant="contained"
                    sx={{
                      borderRadius: '50px',
                      backgroundColor: buttonPrimaryColor,
                      marginBottom: '4rem',
                    }}
                  >
                    Next &gt; &gt;
                  </Button>
                </div>
              </div>
            </Box>
          </Grid>
          <Grid
            item
            xs={false}
            sm={4}
            md={6}
            sx={{
              backgroundImage: 'url("/register-bg.png")',
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

export default SingUp;
