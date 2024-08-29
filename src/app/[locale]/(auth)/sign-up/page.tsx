'use client';
import type { NextPage } from 'next';
import {
  Box,
  CircularProgress,
  Grid,
  MenuItem,
  Paper,
  Select,
  Stack,
  useMediaQuery,
} from '@mui/material';
import Link from 'next/link';
import {
  ClosedEyeSVG,
  LocationSVG,
  LockSVG,
  MessageSVG,
  PersonSVG,
} from '../../../../../assets/icons';
import { loginBgImage } from '@/constant/images';
import styles from '../sign-in/page.module.css';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import { useEffect, useState } from 'react';
import TermsConditionsModal from '@/components/modals/terms-condition-modal';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Cookies from 'js-cookie';
import { endPoints } from '@/base-api/endPoints';
import useGet from '@/custom-hooks/useGet';
import CustomAlert from '@/components/alerts/CustomAlert';
import { signupSchema } from './schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import SignUpInput from '@/components/inputs/signUpInput';
import { LoadingButton } from '@mui/lab';
import usePost from '@/custom-hooks/usePost';

const SingUp: NextPage = () => {
  const t = useTranslations();
  const router = useRouter();
  const isScreen500 = useMediaQuery('(max-width:500px)');
  const [showModal, setShowModal] = useState(false);
  const [governorateArray, setGovernorateArray] = useState([]);
  const [email, setEmail] = useState('');
  const pathname = usePathname();
  let isArabic = pathname.startsWith('/ar');
  const langCurrent = pathname.slice(1, 3) || 'en';
  const [fullFormData, setFullFormData] = useState([]);
  const [isClientSide, setIsClientSide] = useState(false);
  const [
    governorateData,
    governorateLoading,
    getGovernorateData,
    ,
    ,
    errorStatusGovernorate,
  ] = useGet(endPoints.getGovernorate);

  const signUpArray = [
    {
      name: t('auth.first-name-title'),
      placeholder: t('auth.first-name-placeholder'),
      slug: 'first_name',
      type: 'text',
      startIcon: <PersonSVG />,
    },
    {
      name: t('auth.last-name-title'),
      placeholder: t('auth.last-name-placeholder'),
      slug: 'last_name',
      type: 'text',
      startIcon: <PersonSVG />,
    },
    {
      name: t('auth.email-title'),
      placeholder: t('auth.email-placeholder'),
      slug: 'email',
      type: 'text',
      startIcon: <MessageSVG />,
    },
    {
      name: t('auth.phone-title'),
      placeholder: t('auth.phone-placeholder'),
      slug: 'phone',
      type: 'text',
      startIcon: (
        <Select
          value="+962"
          variant="standard"
          sx={{
            '&::before': { borderBottom: 'none' }, // Removes the line before interaction
            '&::after': { borderBottom: 'none' }, // Removes the line after interaction
            '&:hover:not(.Mui-disabled)::before': {
              borderBottom: 'none', // Removes the line when hovering over the input
            },
          }}
          style={{
            direction: 'ltr',
            unicodeBidi: 'bidi-override',
            border: 'none',
          }}
        >
          <MenuItem
            value={'+962'}
            style={{ direction: 'ltr', unicodeBidi: 'bidi-override' }}
          >
            +962
          </MenuItem>
        </Select>
      ),
    },
    {
      name: t('auth.password-title'),
      placeholder: t('auth.password-placeholder'),
      slug: 'password',
      type: 'password',
      startIcon: <LockSVG />,
      endIcon: <ClosedEyeSVG />,
    },
    {
      name: t('auth.password-confirm-title'),
      placeholder: t('auth.password-confirm-placeholder'),
      slug: 'password_confirmation',
      type: 'password',
      startIcon: <LockSVG />,
      endIcon: <ClosedEyeSVG />,
    },
    {
      name: t('auth.gender'),
      slug: 'gender',
      type: 'select',
      placeholder: t('auth.gender'),
      fieldData: [
        { name: t('select.male'), slug: 'male' },
        { name: t('select.female'), slug: 'female' },
      ],
      startIcon: <PersonSVG />,
    },
    {
      name: t('auth.governorate'),
      placeholder: t('auth.governorate'),
      slug: 'governorate',
      type: 'select',
      fieldData: governorateArray,
      startIcon: governorateLoading ? (
        <CircularProgress size={18} />
      ) : (
        <LocationSVG />
      ),
    },
    {
      name: t('auth.terms'),
      slug: 'terms',
      type: 'checkbox',
    },
  ];

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema(signUpArray, t)),
    mode: 'onChange',
  });
  const [data, loading, getData, success, , errorMessage] = useGet(
    endPoints.whoAreYou,
  );
  const [
    ,
    loadingCheckEmail,
    handleCheckEmail,
    ,
    ,
    errorMessageCheckEmail,
    ,
    fullErrors,
  ] = usePost(endPoints.createUser, { email });

  /* get the governorate data and store it in state array */
  useEffect(() => {
    getGovernorateData();
    setIsClientSide(true);
  }, []);
  useEffect(() => {
    if (errorStatusGovernorate) {
      getGovernorateData();
    }
  }, [errorStatusGovernorate]);
  useEffect(() => {
    if (governorateData?.children) {
      const array = governorateData?.children;
      setGovernorateArray(array);
    }
  }, [governorateData]);

  /* if success getting date navigate to who-are-you page nad store formData in cookies */
  useEffect(() => {
    if (success) {
      localStorage.setItem('formData', JSON.stringify(data));
      router.push(`/${langCurrent}/who-are-you`);
    }
  }, [success]);

  const onSubmit = () => {
    handleCheckEmail();
  };

  useEffect(() => {
    if (errorMessageCheckEmail) {
      if (!fullErrors?.errors?.email) {
        getData();
        Cookies.set('signUpData', JSON.stringify(fullFormData));
      }
    }
  }, [errorMessageCheckEmail]);

  /* Handle changing fields values */
  const handleChangeValue = (value: any, slug: string) => {
    if (slug == 'email') {
      setEmail(value);
    }
    if (slug !== 'terms') {
      setFullFormData((prevObj): any => {
        let checkPhone = slug == 'phone' ? '+962' + value : value;
        return { ...prevObj, [slug]: checkPhone };
      });
    }
  };

  return (
    <div className={styles.signInContainer}>
      {' '}
      {isClientSide && (
        <head>
          <title>The Platform | Sign-up</title>
          <meta
            name="description"
            content="Welcome to the Sign-up page of The Platform Website"
          />
        </head>
      )}
      <CustomAlert
        openAlert={errorMessage || fullErrors?.errors?.email}
        setOpenAlert={() => {}}
        message={errorMessage || fullErrors?.errors?.email}
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
            sm={8.5}
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
                    href={`/${langCurrent}/sign-in`}
                    className="fw700 text-underline-none fc-black"
                  >
                    {t('auth.login-here')}
                  </Link>
                </p>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Stack
                  height={400}
                  sx={{
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    paddingX: 1,
                  }}
                  width={isScreen500 ? 300 : 410}
                  gap={2}
                >
                  {signUpArray.map((item: any) => {
                    return (
                      <SignUpInput
                        slug={item.slug}
                        name={item.slug}
                        title={item.name}
                        label={item.placeholder}
                        type={item.type}
                        fieldData={item.fieldData}
                        control={control}
                        errors={errors}
                        startIcon={item.startIcon}
                        endIcon={item.endIcon}
                        onChange={(e: any) => handleChangeValue(e, item.slug)}
                        handleShowTerms={() => setShowModal(true)}
                      />
                    );
                  })}
                </Stack>
                <Stack alignItems={'flex-end'}>
                  <LoadingButton
                    loading={loadingCheckEmail || loading}
                    variant="outlined"
                    type="submit"
                    sx={{
                      border: 'none',
                      margin: '15px 0px',
                      textDecoration: 'underline',
                      textTransform: 'none',
                      fontSize: '1.2rem',
                      gap: isArabic ? '10px' : '',
                      '&:hover': {
                        border: 'none',
                        backgroundColor: 'transparent',
                      },
                    }}
                    endIcon={
                      isArabic ? (
                        <KeyboardDoubleArrowLeftIcon />
                      ) : (
                        <KeyboardDoubleArrowRightIcon />
                      )
                    }
                  >
                    {t('auth.next')}
                  </LoadingButton>
                </Stack>{' '}
              </form>
            </Box>
          </Grid>
          <Grid
            item
            xs={false}
            sm={3.5}
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
