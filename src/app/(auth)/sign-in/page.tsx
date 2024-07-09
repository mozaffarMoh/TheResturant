import type { NextPage } from 'next';

import { Box, Button, Grid, Paper } from '@mui/material';
import Link from 'next/link';
import { Radio } from '@mui/joy';
import { ClosedEyeSVG, LockSVG, MessageSVG } from '../../../../assets/icons';
import InputV1 from '@/components/inputs/InputV1';
import { loginBgImage } from '@/constant/images';
import { buttonPrimaryColor } from '@/constant/color';
import styles from './page.module.css';

const SignIn: NextPage = () => {
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
                <p className=" text-large-title m-0">Sign In</p>
                <p className="text-med">
                  If you don’t have an account register
                </p>
                <p className="text-med mb-4">
                  You can{' '}
                  <Link
                    href={'/sign-up'}
                    className="fw700 text-underline-none fc-black"
                  >
                    Register Here !
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
                  <InputV1
                    startIcon={<LockSVG />}
                    endIcon={<ClosedEyeSVG />}
                    isPassword
                  />
                </div>
                <div className="sm-flex-row-row-center-between mb-3">
                  <Radio
                    color="primary"
                    value="true"
                    label="Remember Me"
                    checked
                  />
                  <div>Forget Password?</div>
                </div>
                <div>
                  <Button
                    variant="contained"
                    sx={{
                      width: '100%',
                      borderRadius: '50px',
                      backgroundColor: buttonPrimaryColor,
                      marginBottom: '4rem',
                    }}
                  >
                    Login
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
              backgroundImage: 'url("/rectangle-7@2x.png")',
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
