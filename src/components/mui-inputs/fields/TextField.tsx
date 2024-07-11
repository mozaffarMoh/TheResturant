import { Controller } from 'react-hook-form';
import { TextField as MuiTextField, Grid } from '@mui/material';

interface TextFieldProps {
  name: string;
  label: string;
  control: any;
  required: boolean;
  [key: string]: any;
}
function TextField({ name, control, label, required }: TextFieldProps) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field }) => (
        <MuiTextField
          {...field}
          id={name}
          label={label}
          required={required}
          // helperText={apiErrors ? apiErrors : null}
          // error={apiErrors && apiErrors ? true : false}
          variant="outlined"
          className="text-field-style"
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
