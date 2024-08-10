import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogContentText,
  Stack,
  Typography,
} from '@mui/material';
import { primaryColor } from '@/constant/color';
import InputV1 from '../inputs/InputV1';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import Cookies from 'js-cookie';
import { MessageSVG } from '../../../assets/icons';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import usePost from '@/custom-hooks/usePost';
import { endPoints } from '@/base-api/endPoints';
import { LoadingButton } from '@mui/lab';
import CustomAlert from '../alerts/CustomAlert';

interface TermsModalProps {
  open: boolean;
  onClose: () => void;
}
export const emailSchema = (t: any) => {
  return z.object({
    email: z
      .string()
      .email({ message: t('validation.invalid-email') })
      .regex(/^[^\d]/, { message: t('validation.email-start-with-char') })
      .regex(/^.{3,}@/, { message: t('validation.invalid-email') })
      .min(1, { message: t('validation.email') }),
  });
};

const ForgetPasswordModal = ({ open, onClose }: TermsModalProps) => {
  const langCookie = Cookies.get('NEXT_LOCALE') || 'en';
  const router = useRouter();
  const t = useTranslations();
  const [email, setEmail] = useState('');
  const [error, setError] = useState({ email: ' ' });
  const [, loading, handleSendEmail, success, , errorMessage] = usePost(
    endPoints.forgotPassword,
    { email },
  );
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setError({ email: '' });

    try {
      emailSchema(t).parse({ email });
      Cookies.set('verify-email', email);
      handleSendEmail();
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
      router.push(`/${langCookie}/verify-password`);
    }
  }, [success]);
  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <CustomAlert
        openAlert={errorMessage}
        setOpenAlert={() => {}}
        message={errorMessage}
      />
      <DialogContent>
        <Stack
          padding={2}
          alignItems={'center'}
          gap={5}
        >
          <Typography
            variant="h6"
            fontFamily={'Nobile'}
            color={primaryColor}
            textTransform={'capitalize'}
            fontWeight={600}
          >
            {t('verify-password.enter-email')}
          </Typography>

          <DialogContentText>
            <Typography
              color={'#999999'}
              fontFamily={'Poppins'}
              marginBottom={1}
            >
              {' '}
              {t('auth.email-title')}
            </Typography>
            <InputV1
              startIcon={<MessageSVG />}
              onChange={(e: any) => {
                setEmail(e.target.value);
              }}
              value={email}
              label={t('auth.email-placeholder')}
            />{' '}
            {error.email && (
              <Typography
                variant="caption"
                color={'red'}
              >
                {error.email}
              </Typography>
            )}
          </DialogContentText>

          <LoadingButton
            loading={loading}
            autoFocus
            onClick={handleSubmit}
            className="general-button-primary"
            fullWidth
            loadingIndicator={
              <CircularProgress
                color="warning"
                size={18}
              />
            }
          >
            {t('buttons.submit')}
          </LoadingButton>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default ForgetPasswordModal;
