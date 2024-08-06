import React, { useState, useEffect } from 'react';
import OtpInput from 'react-otp-input';
import { LoadingButton } from '@mui/lab';
import { Box, CircularProgress, Stack, Typography } from '@mui/material';
import { primaryColor } from '@/constant/color';
import { CustomInput } from '@/components/inputs/CustomInput';
import Cookies from 'js-cookie';

const OtpForgetPassword = ({ handleNextStep }: any) => {
  const emailCookie = Cookies.get('verify-email') || '';
  const [otp, setOtp] = useState('');
  const [seconds, setSeconds] = useState(20);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (seconds > 0) {
      const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [seconds]);

  const handleSubmit = () => {
    setLoading(true);
    // Simulate an async action
    setTimeout(() => {
      setLoading(false);
      handleNextStep();
    }, 2000);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={5}
    >
      <Stack
        width={'100%'}
        alignItems={'flex-start'}
      >
        <Typography
          variant="h4"
          fontWeight={600}
          color={'#FFA000'}
        >
          Enter Code
        </Typography>
        <Typography
          variant="body2"
          fontWeight={600}
        >
          We’ve sent an EMAIL with an activation code
          <br /> to your email {emailCookie}
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
        >
          Send code again{' '}
        </Typography>
        <Typography
          variant="body2"
          fontWeight={300}
          sx={{ marginTop: '7px' }}
          fontSize={'16px'}
        >
          {seconds > 0
            ? `00:${seconds < 10 ? '0' : ''}${seconds}`
            : 'Time is up!'}
        </Typography>
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
        }}
        loadingIndicator={
          <CircularProgress
            color="warning"
            size={16}
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
