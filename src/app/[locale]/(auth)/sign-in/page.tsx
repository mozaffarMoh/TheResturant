'use client';
import type { NextPage } from 'next';

import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { ClosedEyeSVG, LockSVG, MessageSVG } from '../../../../../assets/icons';
import InputV1 from '@/components/inputs/InputV1';
import { loginBgImage, logoImage } from '@/constant/images';
import { buttonPrimaryColor } from '@/constant/color';
import styles from './page.module.css';
import { useEffect, useState } from 'react';
import CustomAlert from '@/components/alerts/CustomAlert';
import { useTranslations } from 'next-intl';
import Cookies from 'js-cookie';
import { endPoints } from '@/base-api/endPoints';
import { signinSchema } from './schema';
import { z } from 'zod';
import usePost from '@/custom-hooks/usePost';
import { LoadingButton } from '@mui/lab';
import { usePathname, useRouter } from 'next/navigation';
import axios from 'axios';
import ForgetPasswordModal from '@/components/modals/ForgetPasswordModal';

const SignIn: NextPage = () => {
  const pathname = usePathname();
  const langCurrent = pathname.slice(1, 3) || 'en';
  const t = useTranslations();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [deviceIp, setDeviceIp] = useState('');
  const [retryGettingIp, setRetryGettingIp] = useState(false);
  const [isRememberMe, setIsRememberMe] = useState(false);
  const [showForgetPassword, setShowForgetPassword] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [isClientSide, setIsClientSide] = useState(false);
  const body = { login: email, password, device_ip: deviceIp };
  const [data, loading, handleLoginPost, success, , errorMessage] = usePost(
    endPoints.login,
    body,
  );

  /* get ip address */
  useEffect(() => {
    if (!deviceIp) {
      axios
        .get('https://api.ipify.org?format=json')
        .then((res: any) => {
          setDeviceIp(res.data.ip);
        })
        .catch(() => {
          setDeviceIp('127.0.0.1');
          setRetryGettingIp(!retryGettingIp);
        });
    }
  }, [retryGettingIp]);

  /* Handle login process */
  const handleLogin = (e: any) => {
    setErrors({ email: '', password: '' });
    e.preventDefault();
    const checkForm = { email, password };
    try {
      signinSchema(t).parse(checkForm);
      handleLoginPost();
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.errors.reduce((acc: any, err: any) => {
          acc[err.path[0]] = err.message;
          return acc;
        }, {});
        setErrors(fieldErrors);
      }
    }
  };

  useEffect(() => {
    setIsClientSide(true);
  }, []);

  /* success status */
  useEffect(() => {
    if (success) {
      const expiresDuration = isRememberMe
        ? new Date('9999-12-31T23:59:59')
        : undefined;
      Cookies.set('token', data.token.token, {
        expires: new Date('9999-12-31T23:59:59'),
      });
      setTimeout(() => {
        router.push(`/${langCurrent}/home`);
      }, 2000);
    }
  }, [success]);

  return (
    <div className={styles.signInContainer}>
      {isClientSide && (
        <head>
          <title>{t('metadata.sign_in')}</title>
          <meta
            name="description"
            content="Welcome to the Sign-in page of The Platform Website"
          />
        </head>
      )}
      <CustomAlert
        openAlert={errorMessage}
        setOpenAlert={() => {}}
        message={errorMessage}
      />
      <CustomAlert
        openAlert={success}
        setOpenAlert={() => {}}
        type="success"
        message={t('messages.login')}
      />

      <ForgetPasswordModal
        open={showForgetPassword}
        onClose={() => setShowForgetPassword(false)}
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
              <div className="mb-1 mt-2">
                <img
                  src={logoImage}
                  alt="image"
                />
              </div>{' '}
              <div className="mb-2 ">
                <p className=" text-large-title m-0">
                  {t('auth.signin-title')}
                </p>
                <p className="text-med">{t('auth.signin-subtitle')}</p>
                <p className="text-med mb-4">
                  <Link
                    href={`/${langCurrent}/sign-up`}
                    className="fw700 text-underline-none fc-black"
                  >
                    {t('auth.register-here')}
                  </Link>
                </p>
              </div>
              <div>
                <div className="mb-3">
                  <label className="fc-light-black">
                    {' '}
                    {t('auth.email-title')}
                  </label>
                  <InputV1
                    label={t('auth.email-placeholder')}
                    startIcon={<MessageSVG />}
                    onChange={(e: any) => {
                      setEmail(e.target.value);
                    }}
                    value={email}
                  />
                  {errors.email && (
                    <Typography
                      variant="caption"
                      color={'red'}
                    >
                      {errors.email}
                    </Typography>
                  )}
                </div>
                <div className="mb-1">
                  <label className="fc-light-black">
                    {' '}
                    {t('auth.password-title')}
                  </label>
                  <InputV1
                    startIcon={<LockSVG />}
                    endIcon={<ClosedEyeSVG />}
                    isPassword
                    onChange={(e: any) => {
                      setPassword(e.target.value);
                    }}
                    value={password}
                    label={t('auth.password-placeholder')}
                  />
                  {errors.password && (
                    <Typography
                      variant="caption"
                      color={'red'}
                    >
                      {errors.password}
                    </Typography>
                  )}
                </div>
                <div className="sm-flex-row-row-center-between mb-3">
                  {/*          <FormControlLabel
                    label={t('auth.remember-me')}
                    control={
                      <Checkbox
                        checked={isRememberMe}
                        onChange={() => {
                          setIsRememberMe(!isRememberMe);
                        }}
                      />
                    }
                  /> */}
                  <div>
                    <Typography
                      variant="body2"
                      onClick={() => setShowForgetPassword(true)}
                      sx={{ cursor: 'pointer', ':hover': { color: '#EB6B2A' } }}
                    >
                      {t('auth.forget-password')}
                    </Typography>
                  </div>
                </div>
                <div>
                  <LoadingButton
                    variant="contained"
                    color="inherit"
                    className="general-button-primary mt-1"
                    loading={loading}
                    sx={{
                      width: '100%',
                      borderRadius: '50px',
                      backgroundColor: buttonPrimaryColor,
                      marginBottom: '4rem',
                    }}
                    onClick={handleLogin}
                  >
                    {t('auth.signin-button')}
                  </LoadingButton>
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
              backgroundImage: `url(${loginBgImage})`,
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
