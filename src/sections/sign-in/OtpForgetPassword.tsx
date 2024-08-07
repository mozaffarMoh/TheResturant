import React, { useState, useEffect } from 'react';
import OtpInput from 'react-otp-input';
import { LoadingButton } from '@mui/lab';
import { Box, CircularProgress, Stack, Typography } from '@mui/material';
import { primaryColor } from '@/constant/color';
import { CustomInput } from '@/components/inputs/CustomInput';
import Cookies from 'js-cookie';
import CustomAlert from '@/components/alerts/CustomAlert';
import { endPoints } from '@/base-api/endPoints';
import usePost from '@/custom-hooks/usePost';
import { useTranslations } from 'next-intl';

const OtpForgetPassword = ({ handleNextStep }: any) => {
  const t = useTranslations();
  const emailCookie = Cookies.get('verify-email') || '';
  const [otp, setOtp] = useState('');
  const [seconds, setSeconds] = useState(20);
  const [errorMessageOTP, setErrorMessageOTP] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [data, loadingCheckOtp, handleCheckOTP, success, , errorMessage] =
    usePost(endPoints.forgotPassword, { email: emailCookie, OTP: otp });
  const [
    ,
    loadingRequestOtp,
    handleRequestOTP,
    successRequestOtp,
    ,
    errorMessageRequestOtp,
  ] = usePost(endPoints.forgotPassword, { email: emailCookie });
  useEffect(() => {
    if (seconds > 0) {
      const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [seconds]);

  const handleSubmit = () => {
    setErrorMessageOTP('');
    if (otp.length == 5) {
      handleCheckOTP();
    } else {
      setErrorMessageOTP(t('messages-full-otp'));
    }
  };

  useEffect(() => {
    if (success) {
      handleNextStep();
      Cookies.set('verify-token', data?.token);
    }
  }, [success]);

  useEffect(() => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  }, [successRequestOtp]);
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={5}
    >
      <CustomAlert
        openAlert={errorMessage || errorMessageOTP || errorMessageRequestOtp}
        setOpenAlert={() => setErrorMessageOTP('')}
        message={errorMessage || errorMessageOTP || errorMessageRequestOtp}
      />
      <CustomAlert
        openAlert={successRequestOtp && showSuccess}
        type="success"
        setOpenAlert={() => setShowSuccess(false)}
        message={t('messages.otp-sent')}
      />

      <Stack
        width={'100%'}
        alignItems={'flex-start'}
      >
        <Typography
          variant="h4"
          fontWeight={600}
          color={'#FFA000'}
        >
          {t('verify-password.enter-code')}
        </Typography>
        <Typography
          variant="body2"
          fontWeight={600}
        >
          {t('verify-password.enter-code-subtitle')} {emailCookie}
        </Typography>
      </Stack>
      <OtpInput
        renderInput={(props) => <CustomInput {...props} />}
        value={otp}
        onChange={setOtp}
        numInputs={5}
        renderSeparator={<p style={{ width: '8px' }}></p>}
        inputStyle={{
          width: '60px',
          height: '60px',
          margin: '0 8px',
          justifyContent: 'center',
          fontSize: '30px',
          borderRadius: '10px',
          border: '1px solid grey',
        }}
      />
      <Stack
        direction={'row'}
        justifyContent={'center'}
        gap={1}
      >
        <Typography
          variant="h6"
          fontWeight={600}
          color={primaryColor}
          sx={{ cursor: 'pointer', ':hover': { textDecoration: 'underline' } }}
          onClick={handleRequestOTP}
        >
          {t('verify-password.send-again')}
        </Typography>
        <Typography
          variant="body2"
          fontWeight={300}
          sx={{ marginTop: '7px' }}
          fontSize={'16px'}
        >
          {seconds > 0
            ? `00:${seconds < 10 ? '0' : ''}${seconds}`
            : t('verify-password.time-is-up')}
        </Typography>
      </Stack>
      <LoadingButton
        onClick={handleSubmit}
        loading={loadingCheckOtp || loadingRequestOtp}
        variant="contained"
        style={{
          marginTop: '16px',
          background: '#3F485E',
          borderRadius: '20px',
          fontFamily: 'Poppins',
          height: '50px',
        }}
        loadingIndicator={
          <CircularProgress
            color="warning"
            size={18}
          />
        }
        fullWidth
      >
        Verify
      </LoadingButton>
    </Box>
  );
};

export default OtpForgetPassword;
