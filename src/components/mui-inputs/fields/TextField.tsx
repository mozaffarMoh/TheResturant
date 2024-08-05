import { Controller } from 'react-hook-form';
import { TextField as MuiTextField, Grid } from '@mui/material';

interface TextFieldProps {
  name: string;
  label: string;
  control: any;
  required: boolean;
  apiErrors?: any;
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
  apiErrors,
  className = 'text-field-style',
  onChange,
  value,
}: TextFieldProps) {

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <MuiTextField
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
            helperText={apiErrors ? apiErrors : null}
            error={apiErrors && apiErrors ? true : false}
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
