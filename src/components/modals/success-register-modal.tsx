'use client';

import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Button, DialogActions } from '@mui/material';
import Image from 'next/image';
import { successCheckMark } from '@/constant/images';
import { useRouter } from 'next/navigation';

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
}
const SuccessRegisterModal = ({ open = false }: SuccessRegisterModalProps) => {
  const { push, replace } = useRouter();
  return (
    <BootstrapDialog
      onClose={() => replace('/home')}
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
      <IconButton
        aria-label="close"
        onClick={() => replace('/home')}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <Typography className="fw500">
          Your Request Sent Successfully, The Platform Team Shall Review the
          Information, You Shall be Notified Via Email of The Feedback
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          onClick={() => replace('/home')}
        >
          Home
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
};

export default SuccessRegisterModal;
