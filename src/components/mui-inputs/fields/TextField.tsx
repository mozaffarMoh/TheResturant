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
  key: string;
}
function TextField({
  name,
  control,
  label,
  required,
  className = 'text-field-style',
  onChange,
  value,
  key,
}: TextFieldProps) {
  return (
    <Controller
      key={key}
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
        );
      }}
    />
  );
}

export default TextField;
