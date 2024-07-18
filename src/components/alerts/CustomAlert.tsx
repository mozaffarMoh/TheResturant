import { Alert, Snackbar, SnackbarOrigin } from '@mui/material';

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
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomAlert;
