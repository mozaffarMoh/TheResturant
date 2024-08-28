'use client';
import UpdatePassword from '@/sections/sign-in/UpdatePassword';
import { Stack, TextField } from '@mui/material';

const ChangePassword = () => {
  return (
    <Stack alignItems={'center'} paddingY={5}>
      <UpdatePassword withOldPassword={true} />
    </Stack>
  );
};

export default ChangePassword;
