'use client';
import { primaryColor, secondaryColor } from '@/constant/color';
import { LoadingButton } from '@mui/lab';
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

const ReviewAccountModal = ({ open, handleGoToHome }: any) => {
  const t = useTranslations();
  const router = useRouter();
  return (
    <Dialog open={open}>
      <DialogTitle>
      {t('dialog.review-account')}
      </DialogTitle>
      <DialogActions sx={{ justifyContent: 'center', gap: 2 }}>
        <Button
          variant="contained"
          onClick={handleGoToHome}
          sx={{
            background: primaryColor,
            '&:hover': { background: primaryColor },
          }}
        >
          {t('dialog.go-to-home')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReviewAccountModal;
