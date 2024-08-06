import { Input } from '@mui/material';
import { InputProps } from 'react-otp-input';

export const CustomInput: React.FC<InputProps> = (props: any) => {
  return (
    <Input
      {...props}
      inputProps={{
        ...props.inputProps,
        maxLength: 1,
        style: {
          textAlign: 'center',
          width: '80px',
          height: '80px',
          fontSize: '40px',
          border: 'white 1px solid',
        },
      }}
      disableUnderline
    />
  );
};
