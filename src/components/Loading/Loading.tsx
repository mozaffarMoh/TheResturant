import { CircularProgress, Stack } from '@mui/material';
import './Loading.css';

const Loading = () => {
  return (
    <Stack
      className="loading-container"
      justifyContent={'center'}
      alignItems={'center'}
    >
      <CircularProgress
        className="spinner-animation"
        size={70}
      />
    </Stack>
  );
};

export default Loading;
