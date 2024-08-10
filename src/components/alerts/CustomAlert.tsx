import { Alert, Snackbar, SnackbarOrigin, Typography } from '@mui/material';
import Cookies from 'js-cookie';

interface IProps {
  openAlert: boolean;
  setOpenAlert: (open: boolean) => void;
  message: string;
  type?: 'error' | 'warning' | 'info' | 'success';
  position?: SnackbarOrigin;
}
const CustomAlert = ({
  openAlert,
  setOpenAlert,
  message,
  type = 'error',
  position = { vertical: 'top', horizontal: 'right' },
}: IProps) => {
  const langCookie = Cookies.get('NEXT_LOCALE') || 'en';
  const reverseDirection = langCookie == 'en' ? 'rtl' : 'ltr';

  return (
    <Snackbar
      anchorOrigin={position}
      open={openAlert}
      onClose={() => setOpenAlert(false)}
      autoHideDuration={6000}
    >
      <Alert
        onClose={() => setOpenAlert(false)}
        severity={type}
        variant="filled"
        sx={{
          width: '100%',
          minHeight: '4rem',
          fontSize: '1.1rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '10px',
          direction: reverseDirection,
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomAlert;
