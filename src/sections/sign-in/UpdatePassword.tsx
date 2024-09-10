import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogContentText,
  Stack,
  Typography,
} from '@mui/material';
import { primaryColor } from '@/constant/color';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import Cookies from 'js-cookie';
import { ClosedEyeSVG, LockSVG, MessageSVG } from '../../../assets/icons';
import { usePathname, useRouter } from 'next/navigation';
import { z } from 'zod';
import InputV1 from '@/components/inputs/InputV1';
import { passwordSchema } from './passwordSchema';
import { LoadingButton } from '@mui/lab';
import CustomAlert from '@/components/alerts/CustomAlert';
import { endPoints } from '@/base-api/endPoints';
import usePost from '@/custom-hooks/usePost';

const UpdatePassword = () => {
  const authToken = Cookies.get('verify-token');
  const router = useRouter();
  const t = useTranslations();
  const pathname = usePathname();
  const langCurrent = pathname?.slice(1, 3) || 'en';
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState({ password: '', confirmPassword: '' });
  const [, loading, handleCreateNewPassword, success, , errorMessage] = usePost(
    endPoints.updatePassword,
    { password, password_confirmation: confirmPassword },
    authToken,
  );
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setError({ password: '', confirmPassword: '' });

    try {
      passwordSchema(t, false).parse({ password, confirmPassword });
      handleCreateNewPassword();
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
    if (success) {
      Cookies.remove('verify-email');
      Cookies.remove('verify-token');
      setTimeout(() => {
        router.push(`/${langCurrent}/sign-in`);
      }, 2000);
    }
  }, [success]);

  const fieldsArray = [
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

  return (
    <Stack>
      <CustomAlert
        openAlert={success}
        setOpenAlert={() => {}}
        type="success"
        message={t('messages.password-update')}
      />{' '}
      <CustomAlert
        openAlert={errorMessage}
        setOpenAlert={() => {}}
        message={errorMessage}
      />
      <Stack
        padding={2}
        alignItems={'flex-start'}
        gap={5}
      >
        <Typography
          variant="h6"
          fontFamily={'Nobile'}
          color={primaryColor}
          textTransform={'capitalize'}
          fontWeight={600}
        >
          {t('verify-password.create-password')}
        </Typography>

        <Stack gap={4}>
          {fieldsArray.map((item: any, i: number) => {
            return (
              <Box>
                <Typography
                  color={'#999999'}
                  fontFamily={'Poppins'}
                  marginBottom={1}
                >
                  {' '}
                  {item.title}
                </Typography>
                <InputV1
                  startIcon={<LockSVG />}
                  endIcon={<ClosedEyeSVG />}
                  isPassword
                  onChange={(e: any) => {
                    {
                      item.setValue(e.target.value);
                    }
                  }}
                  value={item.value}
                  label={item.placeholder}
                />{' '}
                {item.error && (
                  <Typography
                    variant="caption"
                    color={'red'}
                  >
                    {item.error}
                  </Typography>
                )}
              </Box>
            );
          })}
        </Stack>

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
          {t('buttons.reset-password')}
        </LoadingButton>
      </Stack>
    </Stack>
  );
};

export default UpdatePassword;
