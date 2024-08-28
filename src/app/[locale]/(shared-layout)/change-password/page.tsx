'use client';
import { primaryColor } from '@/constant/color';
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
import { useState } from 'react';
import { z } from 'zod';

const ChangePassword = () => {
  const router = useRouter();
  const t = useTranslations();
  const pathname = usePathname();
  const isScreen700 = useMediaQuery('(max-width:700px)');
  const langCurrent = pathname.slice(1, 3) || 'en';
  let isArabic = pathname.startsWith('/ar');
  const [password, setPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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
      console.log('success');
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
  return (
    <Stack
      alignItems={'center'}
      paddingY={5}
      gap={3}
    >
      {' '}
      <Typography
        fontWeight={600}
        variant="h5"
        color={primaryColor}
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
          loading={false}
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
