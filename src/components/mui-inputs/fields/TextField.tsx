import { Controller } from 'react-hook-form';
import { TextField as MuiTextField, Grid } from '@mui/material';

interface TextFieldProps {
  name: string;
  label: string;
  control: any;
  required: boolean;
  className?: string;
  value: any;
  onChange?: any;
  setFormData: any;
  formId: any;
  [key: string]: any;
}
function TextField({
  name,
  control,
  label,
  required,
  className = 'text-field-style',
  onChange,
  value,
}: TextFieldProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        return (
          <MuiTextField
            fullWidth
            {...field}
            value={value}
            onChange={(e) => {
              // Update the onChange handler
              field.onChange();
              if (onChange) {
                onChange(e.target.value); // Call the passed onChange function
              }
            }}
            id={name}
            label={label}
            required={required}
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
        );
      }}
    />
  );
}

export default TextField;
