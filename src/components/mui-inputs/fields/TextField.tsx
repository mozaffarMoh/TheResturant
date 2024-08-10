import { Controller } from 'react-hook-form';
import { TextField as MuiTextField } from '@mui/material';
import Cookies from 'js-cookie';

interface TextFieldProps {
  name: string;
  label: string;
  control: any;
  className?: string;
  value: any;
  onChange?: any;
  setFormData: any;
  formId: any;
  key: string;
}

function TextField({
  name,
  control,
  label,
  className = 'text-field-style',
  onChange,
  value,
  key,
}: TextFieldProps) {
  const emailCookie = Cookies.get('email') || '';

  return (
    <Controller
      key={key}
      name={name}
      control={control}
      defaultValue={name === 'email-1' ? emailCookie : ''}
      render={({ field, fieldState }) => (
        <MuiTextField
          fullWidth
          {...field}
          value={field.value || value}
          onChange={(e) => {
            // Update the onChange handler
            field.onChange(e);
            if (onChange) {
              onChange(e.target.value); // Call the passed onChange function
            }
          }}
          label={label}
          error={!!fieldState.error}
          helperText={fieldState.error ? fieldState.error.message : ''}
          variant="outlined"
          className={className}
          sx={{
            '& .MuiInputBase-root': {
              borderRadius: '50px',
              paddingLeft: '0.8rem',
            },
          }}
        />
      )}
    />
  );
}

export default TextField;
