'use client';
import { Input } from '@mui/joy';
import styles from './inputv1.module.css';
import { ReactElement, useState } from 'react';
import { useMediaQuery } from '@mui/material';
import { usePathname } from 'next/navigation';
import { OpenEyeSVG } from '../../../assets/icons';

interface inputV1Props {
  startIcon?: ReactElement | null;
  endIcon?: ReactElement | null;
  isPassword?: boolean;
  label?: string;
  onChange?: any;
  value?: any;
}

const InputV1 = ({
  startIcon = null,
  endIcon = null,
  isPassword = false,
  label = 'Enter Your Email',
  onChange,
  value,
}: inputV1Props) => {
  const isScreen570 = useMediaQuery('(max-width:570px)');
  const [showPassword, setShowPassword] = useState(false);
  const pathname = usePathname();
  let isArabic = pathname.startsWith('/ar');

  return (
    <Input
      type={isPassword ? (showPassword ? 'text' : 'password') : 'text'}
      placeholder={label}
      startDecorator={startIcon}
      endDecorator={
        <div
          onClick={() => setShowPassword((prv) => !prv)}
          style={{ marginTop: '10px' }}
        >
          {showPassword ? <OpenEyeSVG /> : endIcon}
        </div>
      }
      className={`${styles.generalInput} ${isArabic && styles.passwordARdirection}`}
      sx={{
        '&.MuiInput-root': {
          width: isScreen570 ? '100%' : '25rem',
        },

        '--Input-focusedThickness': '0rem',
        '--Input-focusedHighlight': 'white',
        '&::before': {
          transition: 'box-shadow .15s ease-in-out',
        },
        '&:focus-within': {
          borderColor: '#86b7fe',
        },
      }}
      onChange={onChange}
      value={value}
    />
  );
};

export default InputV1;
