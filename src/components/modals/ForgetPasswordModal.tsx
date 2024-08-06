import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  Stack,
  Typography,
} from '@mui/material';
import { primaryColor } from '@/constant/color';
import InputV1 from '../inputs/InputV1';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Cookies from 'js-cookie';
import { MessageSVG } from '../../../assets/icons';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

interface TermsModalProps {
  open: boolean;
  onClose: () => void;
}

const emailSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Invalid email address' }),
});

const ForgetPasswordModal = ({ open, onClose }: TermsModalProps) => {
  const langCookie = Cookies.get('NEXT_LOCALE') || 'en';
  const router = useRouter();
  const t = useTranslations();
  const [email, setEmail] = useState('');
  const [error, setError] = useState({ email: ' ' });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setError({ email: '' });

    try {
      emailSchema.parse({ email });
      Cookies.set('verify-email', email);
      router.push(`/${langCookie}/verify-password`);
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
    <Dialog
      open={open}
      onClose={onClose}
    >
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
            Enter Your Email
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

          <Button
            autoFocus
            onClick={handleSubmit}
            className="general-button-primary"
            fullWidth
          >
            Submit
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default ForgetPasswordModal;
