'use client';
import { endPoints } from '@/base-api/endPoints';
import { primaryColor } from '@/constant/color';
import usePost from '@/custom-hooks/usePost';
import { passwordSchema } from '@/sections/sign-in/passwordSchema';
import { LoadingButton } from '@mui/lab';
import {
  CircularProgress,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { z } from 'zod';
import Cookies from 'js-cookie';
import CustomAlert from '@/components/alerts/CustomAlert';

const ChangePassword = () => {
  const router = useRouter();
  const t = useTranslations();
  const token = Cookies.get('token') || '';
  const pathname = usePathname();
  const isScreen700 = useMediaQuery('(max-width:700px)');
  const langCurrent = pathname.slice(1, 3) || 'en';
  let isArabic = pathname.startsWith('/ar');
  const [password, setPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isClientSide, setIsClientSide] = useState(false);
  const [, loading, handleChangePassword, success, , errorMessage] = usePost(
    endPoints.changePassword,
    {
      old_password: oldPassword,
      password: password,
      password_confirmation: confirmPassword,
    },
    token,
  );
  const [error, setError] = useState({
    oldPassword: '',
    password: '',
    confirmPassword: '',
  });
  const fieldsArray = [
    {
      title: t('auth.old-password-title'),
      placeholder: t('auth.old-password-placeholder'),
      value: oldPassword,
      setValue: setOldPassword,
      error: error.oldPassword,
    },
    {
      title: t('auth.new-password-title'),
      placeholder: t('auth.password-placeholder'),
      value: password,
      setValue: setPassword,
      error: error.password,
    },
    {
      title: t('auth.password-confirm-title'),
      placeholder: t('auth.password-confirm-placeholder'),
      value: confirmPassword,
      setValue: setConfirmPassword,
      error: error.confirmPassword,
    },
  ];

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setError({ oldPassword: '', password: '', confirmPassword: '' });

    try {
      passwordSchema(t, true).parse({
        oldPassword,
        password,
        confirmPassword,
      });
      handleChangePassword();
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.errors.reduce((acc: any, err: any) => {
          acc[err.path[0]] = err.message;
          return acc;
        }, {});
        setError(fieldErrors);
      }
    }
  };
  useEffect(() => {
    setIsClientSide(true);
  }, []);
  useEffect(() => {
    if (success) {
      setSuccessMessage(t('messages.password-update'));
      setPassword('');
      setOldPassword('');
      setConfirmPassword('');
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    }
  }, [success]);

  return (
    <Stack
      alignItems={'center'}
      paddingY={5}
      gap={3}
    >
      {' '}
      {isClientSide && (
        <head>
          <title>{t('metadata.change_password')}</title>
          <meta
            name="description"
            content="Welcome to the Change-Password page of The Platform Website"
          />
        </head>
      )}{' '}
      <CustomAlert
        openAlert={errorMessage}
        setOpenAlert={() => {}}
        message={errorMessage}
      />
      <CustomAlert
        openAlert={Boolean(successMessage)}
        setOpenAlert={() => setSuccessMessage('')}
        type="success"
        message={successMessage}
      />{' '}
      <Typography
        fontWeight={600}
        variant="h4"
        color={primaryColor}
        marginX={2}
      >
        {t('header.change-password')}
      </Typography>
      <Stack
        width={isScreen700 ? '90%' : '50%'}
        gap={2}
      >
        {fieldsArray.map((item) => {
          return (
            <Stack gap={1}>
              <Typography
                fontWeight={600}
                color={primaryColor}
                marginX={2}
              >
                {item.title}
              </Typography>
              <TextField
                fullWidth
                label={item.placeholder}
                error={!!item.error}
                helperText={item.error}
                value={item.value}
                onChange={(e) => item.setValue(e.target.value)}
                InputLabelProps={{
                  sx: {
                    right: isArabic ? 25 : '',
                    left: isArabic ? 'auto' : '',
                    transformOrigin: isArabic ? 'top right' : '',
                    textAlign: isArabic ? 'right' : 'left',
                  },
                }}
                sx={{
                  '& .MuiInputBase-root': {
                    borderRadius: '50px',
                    paddingLeft: '0.8rem',
                    paddingRight: '0.8rem', // Ensure the text does not hit the border
                  },
                  '& .MuiFormHelperText-root': {
                    textAlign: isArabic ? 'right' : 'left',
                  },
                  '& .MuiOutlinedInput-notchedOutline legend': {
                    textAlign: isArabic ? 'right' : 'left',
                  },
                }}
              />
            </Stack>
          );
        })}
        <LoadingButton
          onClick={handleSubmit}
          loading={loading}
          variant="contained"
          style={{
            marginTop: '16px',
            background: '#3F485E',
            borderRadius: '20px',
            fontFamily: 'Poppins',
            height: '50px',
            textTransform: 'capitalize',
          }}
          loadingIndicator={
            <CircularProgress
              color="warning"
              size={18}
            />
          }
          fullWidth
        >
          {t('header.change-password')}
        </LoadingButton>
      </Stack>
    </Stack>
  );
};

export default ChangePassword;
