import { Input } from '@mui/material';
import { InputProps } from 'react-otp-input';

export const CustomInput: React.FC<InputProps> = (props: any) => {
  return (
    <Input
      {...props}
      inputProps={{
        ...props.inputProps,
        maxLength: 1,
        sx: {
          textAlign: 'center',
          border: 'white 1px solid',
        },
      }}
      disableUnderline
    />
  );
};
