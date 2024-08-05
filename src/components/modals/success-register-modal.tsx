'use client';

import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import { DialogActions, Stack, TextField } from '@mui/material';
import Image from 'next/image';
import { successCheckMark } from '@/constant/images';
import { LoadingButton } from '@mui/lab';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

interface SuccessRegisterModalProps {
  open: boolean;
  OTPValue: string;
  userID: string;
  setOTPValue: React.Dispatch<React.SetStateAction<string>>;
  loadingForSubmit: boolean;
  loadingForFinishSubmit: boolean;
  handlePostForSubmit: any;
  handlePostForFinishSubmit: any;
}

const SuccessRegisterModal = ({
  open = false,
  OTPValue,
  userID,
  setOTPValue,
  loadingForSubmit,
  loadingForFinishSubmit,
  handlePostForSubmit,
  handlePostForFinishSubmit,
}: SuccessRegisterModalProps) => {
  const handleConfirm = () => {
    userID ? handlePostForFinishSubmit() : handlePostForSubmit();
  };
  return (
    <BootstrapDialog
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle
        sx={{ m: 0 }}
        className="sm-flex-col-col-center-center"
        id="customized-dialog-title"
      >
        <Image
          src={successCheckMark}
          width={120}
          height={120}
          alt="success register"
        />
      </DialogTitle>
      {/*       <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton> */}
      <DialogContent dividers>
        <Typography className="fw500">
          {/*    Your Request Sent Successfully, The Platform Team Shall Review the
          Information, You Shall be Notified Via Email of The Feedback */}
          We sent to you OTP number via email please enter the number in this
          box below!
        </Typography>
      </DialogContent>
      <DialogActions>
        <Stack
          width={'100%'}
          gap={2}
        >
          <TextField
            label={'Enter OTP here'}
            value={OTPValue}
            onChange={(e: any) => setOTPValue(e?.target?.value)}
          />
          <LoadingButton
            variant="contained"
            color="success"
            onClick={handleConfirm}
            loading={loadingForFinishSubmit || loadingForSubmit}
          >
            Confirm
          </LoadingButton>
        </Stack>
      </DialogActions>
    </BootstrapDialog>
  );
};

export default SuccessRegisterModal;
