'use client';
import type { NextPage } from 'next';

import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
} from '@mui/material';
import Link from 'next/link';
import { ClosedEyeSVG, LockSVG, MessageSVG } from '../../../../assets/icons';
import InputV1 from '@/components/inputs/InputV1';
import { loginBgImage } from '@/constant/images';
import { buttonPrimaryColor, textLightColor } from '@/constant/color';
import styles from '../sign-in/page.module.css';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { useEffect, useState } from 'react';
import TermsConditionsModal from '@/components/modals/terms-condition-modal';
import { useRouter } from 'next/navigation';

const SingUp: NextPage = () => {
  const { push } = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const handleTermsModal = () => {
    setShowModal((prv) => !prv);
  };
  const handleTermsCloseModal = () => {
    setShowModal(false);
  };

  const handlePasswordChange = (event: any) => {
    setPassword(() => event?.target?.value);
  };

  const handlePasswordConfirmChange = (event: any) => {
    setPasswordConfirm(() => event?.target?.value);
  };
  useEffect(() => {
    // just for temporary event
    localStorage.setItem('password', password);
  }, [password]);

  return (
    <div className={styles.signInContainer}>
      {/* Terms Modal when check the terms and condition it appears  */}
      <TermsConditionsModal
        open={showModal}
        handleClose={handleTermsCloseModal}
      />

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
                      onChange={handlePasswordChange}
                      value={password}
                    />
                  </div>

                  <InputV1
                    label={'Confirm Your Password'}
                    startIcon={<LockSVG />}
                    endIcon={<ClosedEyeSVG />}
                    isPassword
                    onChange={handlePasswordConfirmChange}
                    value={passwordConfirm}
                  />
                </div>
                <div>
                  <FormControlLabel
                    sx={{
                      '& .MuiFormControlLabel-label': {
                        fontSize: '0.8rem',
                        paddingBottom: '0.2rem',
                        color: textLightColor,
                      },
                    }}
                    control={
                      <Checkbox
                        onChange={handleTermsModal}
                        size="small"
                        sx={{
                          display: 'inline-block',
                          color: buttonPrimaryColor,
                          '&.Mui-checked': {
                            color: 'orange',
                          },
                        }}
                      />
                    }
                    label="Terms condition and privacy policy"
                  />
                </div>
                <div className="auth-submit-btn sm-flex-row-row-center-end w-full ">
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
                    endIcon={<KeyboardDoubleArrowRightIcon />}
                    disabled={
                      passwordConfirm !== password ||
                      passwordConfirm === '' ||
                      password.length < 8
                    }
                    onClick={() => push('/who-are-you')}
                  >
                    Next
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
