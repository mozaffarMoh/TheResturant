'use client';
import type { NextPage } from 'next';
import {
  Box,
  Button,
  Checkbox,
  Grid,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { ClosedEyeSVG, LockSVG, MessageSVG } from '../../../../../assets/icons';
import InputV1 from '@/components/inputs/InputV1';
import { loginBgImage } from '@/constant/images';
import { buttonPrimaryColor } from '@/constant/color';
import styles from '../sign-in/page.module.css';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { useEffect, useState } from 'react';
import TermsConditionsModal from '@/components/modals/terms-condition-modal';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Cookies from 'js-cookie';
import { endPoints } from '@/base-api/endPoints';
import useGet from '@/custom-hooks/useGet';
import Loading from '@/components/Loading/Loading';
import { z } from 'zod';
import CustomAlert from '@/components/alerts/CustomAlert';
import { signupSchema } from './schema';

const SingUp: NextPage = () => {
  const t = useTranslations();
  const router = useRouter();
  const langCookie = Cookies.get('NEXT_LOCALE') || 'en';
  let emailCookies = Cookies.get('email') || '';
  let passwordCookies = Cookies.get('password') || '';
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  });

  const [data, loading, getData, success, successMessage, errorMessage] =
    useGet(endPoints.whoAreYou);

  const handleChangePassword = (e: any) => {
    setFormData((prev: any) => {
      return { ...prev, password: e?.target?.value };
    });
  };

  const handleChangeConfirmPassword = (e: any) => {
    setFormData((prev: any) => {
      return { ...prev, confirmPassword: e?.target?.value };
    });
  };

  const handleAcceptTerms = (e: any) => {
    setFormData((prev: any) => {
      return { ...prev, acceptTerms: !formData.acceptTerms };
    });
  };

  const handleChangeEmail = (e: any) => {
    setFormData((prev: any) => {
      return { ...prev, email: e?.target?.value };
    });
  };

  const handleTermsModal = () => {
    setShowModal((prv) => !prv);
  };

  /* in first render : if email and password are exist in cookies store it in states values */
  useEffect(() => {
    if (emailCookies && passwordCookies) {
      setFormData((prev: any) => {
        return { ...prev, email: emailCookies, password: passwordCookies };
      });
    }
  }, []);

  /* if success getting date navigate to who-are-you page nad store formData in cookies */
  useEffect(() => {
    if (success) {
      localStorage.setItem('formData', JSON.stringify(data));
      router.push(`/${langCookie}/who-are-you`);
    }
  }, [success]);

  const handleNextStep = (e: any) => {
    e.preventDefault();

    try {
      signupSchema.parse(formData);
      Cookies.set('email', formData.email);
      Cookies.set('password', formData.password);
      getData();
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

  return (
    <div className={styles.signInContainer}>
      {loading && <Loading />}
      <CustomAlert
        openAlert={errorMessage}
        setOpenAlert={() => {}}
        message={errorMessage}
      />
      {/* Terms Modal when check the terms and condition it appears  */}
      <TermsConditionsModal
        open={showModal}
        handleClose={() => setShowModal(false)}
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
                <p className=" text-large-title m-0">
                  {t('auth.signup-title')}
                </p>
                <p className="text-med">{t('auth.signup-subtitle')}</p>
                <p className="text-med ">
                  <Link
                    href={`/${langCookie}/sign-in`}
                    className="fw700 text-underline-none fc-black"
                  >
                    {t('auth.login-here')}
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
                    onChange={handleChangeEmail}
                    value={formData.email}
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
                    {t('auth.password-title')}
                  </label>
                  <div className="mb-2">
                    <InputV1
                      label={t('auth.password-placeholder')}
                      startIcon={<LockSVG />}
                      endIcon={<ClosedEyeSVG />}
                      isPassword
                      onChange={handleChangePassword}
                      value={formData.password}
                    />{' '}
                    {errors.password && (
                      <Typography
                        variant="caption"
                        color={'red'}
                      >
                        {errors.password}
                      </Typography>
                    )}
                  </div>
                  <InputV1
                    label={t('auth.password-confirm-placeholder')}
                    startIcon={<LockSVG />}
                    endIcon={<ClosedEyeSVG />}
                    isPassword
                    onChange={handleChangeConfirmPassword}
                    value={formData.confirmPassword}
                  />{' '}
                  {errors.confirmPassword && (
                    <Typography
                      variant="caption"
                      color={'red'}
                    >
                      {errors.confirmPassword}
                    </Typography>
                  )}
                </div>
                <div className="sm-flex-row-row-center-start">
                  <Checkbox
                    size="small"
                    sx={{
                      display: 'inline-block',
                      color: buttonPrimaryColor,
                      '&.Mui-checked': {
                        color: 'orange',
                      },
                    }}
                    onChange={handleAcceptTerms}
                  />
                  <p
                    onClick={handleTermsModal}
                    className="cursor-pointer"
                  >
                    {t('auth.terms')}
                  </p>
                </div>
                {errors.acceptTerms && (
                  <Typography
                    variant="caption"
                    color={'red'}
                  >
                    {errors.acceptTerms}
                  </Typography>
                )}
                <Stack
                  alignItems={'flex-end'}
                  style={{ direction: 'ltr' }}
                >
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
                    onClick={handleNextStep}
                  >
                    {t('auth.next')}
                  </Button>
                </Stack>
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
