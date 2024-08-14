'use client';

import { Input } from '@mui/joy';
import styles from './inputv1.module.css';
import { ReactElement, useState } from 'react';
import { Controller } from 'react-hook-form';
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  MenuItem,
  Select,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { usePathname } from 'next/navigation';
import { buttonPrimaryColor } from '@/constant/color';
import { OpenEyeSVG } from '../../../assets/icons';

interface SignUpInputProps {
  startIcon?: ReactElement | null;
  endIcon?: ReactElement | null;
  slug: string;
  type: string;
  label?: string;
  onChange?: any;
  fieldData?: any;
  value?: any;
  control: any;
  name: string;
  title: string;
  errors: any;
  handleShowTerms: any;
}

const SignUpInput = ({
  slug,
  startIcon = null,
  endIcon = null,
  type,
  label,
  onChange,
  fieldData,
  value,
  control,
  name,
  title,
  errors,
  handleShowTerms,
}: SignUpInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isScreen500 = useMediaQuery('(max-width:500px)');
  const renderInputField: any = ({ field, fieldState }: any) => {
    const error = errors[slug] ? errors[slug]?.message : '';
    const pathname = usePathname();
    let isArabic = pathname.startsWith('/ar');

    return (
      <Box>
        {type !== 'checkbox' && (
          <Typography variant="body2">{title}</Typography>
        )}
        {type === 'password' && (
          <FormControl error={!!error}  fullWidth>
            <Input
              error={!!error}
              type={showPassword ? 'text' : 'password'}
              style={{width:'100%'}}
              startDecorator={startIcon}
              endDecorator={
                <div
                  onClick={() => setShowPassword((prv) => !prv)}
                  style={{ marginTop: '10px' }}
                >
                  {showPassword ? <OpenEyeSVG /> : endIcon}
                </div>
              }
              placeholder={label}
              onChange={(e: any) => {
                field.onChange(e);
                if (onChange) {
                  onChange(e.target.value);
                }
              }}
              value={field.value}
              className={`${styles.generalInput} ${isArabic && styles.passwordARdirection}`}
            />

            {!!error && (
              <FormHelperText sx={{ textAlign: isArabic ? 'right' : 'left' }}>
                {error}
              </FormHelperText>
            )}
          </FormControl>
        )}

        {type === 'text' && (
          <FormControl
            error={!!error}
            fullWidth
          >
            <Input
              error={!!error}
              type={type}
              style={{ width: '100%' }}
              startDecorator={startIcon}
              endDecorator={endIcon}
              placeholder={label}
              onChange={(e: any) => {
                field.onChange(e);
                onChange(e.target.value);
              }}
              value={field.value}
              className={`${styles.generalInput} ${isArabic && styles.passwordARdirection}`}
            />{' '}
            {!!error && (
              <FormHelperText sx={{ textAlign: isArabic ? 'right' : 'left' }}>
                {error}
              </FormHelperText>
            )}
          </FormControl>
        )}

        {type === 'select' && (
          <FormControl
            fullWidth
            error={!!error}
          >
            <Box
              sx={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}
            >
              {startIcon && (
                <Box
                  sx={{
                    position: 'absolute',
                    right: isArabic ? '13px' : '',
                    left: !isArabic ? '13px' : '',
                    zIndex: '30',
                  }}
                  className={styles.svgIcon}
                >
                  {startIcon}
                </Box>
              )}
              <Select
                onChange={(e: any) => {
                  field.onChange(e);
                  onChange(e.target.value);
                }}
                value={field.value}
                label={label}
                className={styles.generalInput}
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                  },
                  '& .MuiSelect-select': {
                    background: '#f7f7f7',
                    padding: '5px 20px',
                    paddingRight: isArabic ? '40px' : '',
                    paddingLeft: !isArabic ? '40px' : '',
                  },
                  '& .MuiSelect-select.MuiSelect-select': {
                    paddingRight: isArabic ? '40px' : '',
                    paddingLeft: !isArabic ? '40px' : '',
                  },
                  '& .MuiSvgIcon-root': {
                    position: 'absolute',
                    right: !isArabic ? '10px' : '94%',
                  },

                  '& .MuiInputBase-root': {
                    height: '30px',
                    background: 'red',
                  },
                }}
              >
                {fieldData.map((item: any, i: number) => (
                  <MenuItem
                    key={i}
                    value={item.slug}
                  >
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </Box>{' '}
            {!!error && (
              <FormHelperText sx={{ textAlign: isArabic ? 'right' : 'left' }}>
                {error}
              </FormHelperText>
            )}
          </FormControl>
        )}

        {type === 'checkbox' && (
          <FormControl
            error={!!error}
            className="input-form-control"
            fullWidth
            sx={{ marginRight: -2 }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  {...field}
                  onChange={(e) => {
                    // Update the onChange handler
                    field.onChange(e);
                    if (onChange) {
                      onChange(e.target.checked); // Call the passed onChange function
                    }
                  }}
                  checked={field.value}
                  value={field.value}
                  sx={{
                    color: buttonPrimaryColor,
                    '&.Mui-checked': {
                      color: 'orange',
                    },
                    marginLeft: !isArabic ? '10px' : '',
                  }}
                />
              }
              label={
                <span
                  onClick={(e) => {
                    // Prevent checkbox click event when clicking the label
                    e.preventDefault();
                    handleShowTerms();
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  {title}
                </span>
              }
              labelPlacement="end"
            />
            {!!error && (
              <FormHelperText
                sx={{
                  margin: isArabic ? '0px 30px' : '',
                  textAlign: isArabic ? 'right' : 'left',
                }}
              >
                {error}
              </FormHelperText>
            )}
          </FormControl>
        )}
      </Box>
    );
  };

  return (
    <Controller
      key={slug}
      name={name}
      control={control}
      defaultValue={value}
      render={renderInputField}
    />
  );
};

export default SignUpInput;
