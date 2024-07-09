'use client';
import { Input } from '@mui/joy';
import styles from './inputv1.module.css';
import { ReactElement, useState } from 'react';

interface inputV1Props {
  startIcon?: ReactElement | null;
  endIcon?: ReactElement | null;
  isPassword?: boolean;
  label?: string;
}

const InputV1 = ({
  startIcon = null,
  endIcon = null,
  isPassword = false,
  label = 'Enter Your Email',
}: inputV1Props) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Input
      type={isPassword ? (showPassword ? 'text' : 'password') : 'text'}
      placeholder={label}
      startDecorator={startIcon}
      endDecorator={
        <div onClick={() => setShowPassword((prv) => !prv)}>{endIcon}</div>
      }
      className={styles.generalInput}
      sx={{
        '--Input-focusedThickness': '0rem',
        '--Input-focusedHighlight': 'white',
        '&::before': {
          transition: 'box-shadow .15s ease-in-out',
        },
        '&:focus-within': {
          borderColor: '#86b7fe',
        },
      }}
    />
  );
};

export default InputV1;
