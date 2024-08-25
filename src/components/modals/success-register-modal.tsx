'use client';

import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import {
  DialogActions,
  IconButton,
  Stack,
  TextField,
  useMediaQuery,
} from '@mui/material';
import Image from 'next/image';
import { successCheckMark } from '@/constant/images';
import { LoadingButton } from '@mui/lab';
import OTPInput from 'react-otp-input';
import { CustomInput } from '../inputs/CustomInput';
import { useTranslations } from 'next-intl';
import CloseIcon from '@mui/icons-material/Close';

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
  handleClose: any;
  OTPValue: string;
  userID: string;
  setOTPValue: React.Dispatch<React.SetStateAction<string>>;
  loadingForSubmit: boolean;
  loadingForFinishSubmit: boolean;
  loadingForFilesSubmit: boolean;
  handlePostForSubmit: any;
  handlePostForFinishSubmit: any;
}

const SuccessRegisterModal = ({
  open = false,
  handleClose,
  OTPValue,
  userID,
  setOTPValue,
  loadingForSubmit,
  loadingForFinishSubmit,
  loadingForFilesSubmit,
  handlePostForSubmit,
  handlePostForFinishSubmit,
}: SuccessRegisterModalProps) => {
  const t = useTranslations();
  const isScreen550 = useMediaQuery('(max-width:550px)');
  const handleConfirm = () => {
    userID ? handlePostForFinishSubmit() : handlePostForSubmit();
  };

  return (
    <BootstrapDialog
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle
        sx={{ m: 0, padding: '50px' }}
        className="sm-flex-col-col-center-center"
        id="customized-dialog-title"
      >
        {' '}
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <Image
          src={successCheckMark}
          width={120}
          height={120}
          alt="success register"
        />
      </DialogTitle>
      <DialogContent dividers>
        <Typography className="fw500">{t('messages.otp-sent')}</Typography>
      </DialogContent>
      <DialogActions>
        <Stack
          width={'100%'}
          gap={2}
          alignItems={'center'}
        >
          <OTPInput
            renderInput={(props) => <CustomInput {...props} />}
            value={OTPValue}
            onChange={(value) => {
              setOTPValue(value);
              if (value.length < 5) {
                const allInputs: any = document.querySelectorAll('input');
                const otpInputs = [...allInputs].slice(-5);

                if (otpInputs[value.length]) {
                  otpInputs[value.length].focus();
                }
              }
            }}
            shouldAutoFocus={true}
            numInputs={5}
            renderSeparator={<p style={{ width: '8px' }}>-</p>}
            inputStyle={{
              width: !isScreen550 ? '60px' : '35px',
              height: !isScreen550 ? '60px' : '40px',
              margin: !isScreen550 ? '0 8px' : '0 4px',
              fontSize: !isScreen550 ? '30px' : '22px',
              borderRadius: '10px',
              border: '1px solid grey',
            }}
          />
          <LoadingButton
            variant="contained"
            color="success"
            onClick={handleConfirm}
            fullWidth
            loading={
              loadingForFinishSubmit ||
              loadingForSubmit ||
              loadingForFilesSubmit
            }
          >
            {t('buttons.confirm')}
          </LoadingButton>
        </Stack>
      </DialogActions>
    </BootstrapDialog>
  );
};

export default SuccessRegisterModal;
