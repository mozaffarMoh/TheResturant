import { Alert, Snackbar } from '@mui/material';

interface IProps {
  openAlert: boolean;
  setOpenAlert: (open: boolean) => void;
  message: string;
}
const CustomAlert = ({ openAlert, setOpenAlert, message }: IProps) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={openAlert}
      onClose={() => setOpenAlert(false)}
      autoHideDuration={6000}
    >
      <Alert
        onClose={() => setOpenAlert(false)}
        severity="error"
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