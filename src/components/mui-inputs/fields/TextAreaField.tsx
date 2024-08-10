import { Controller } from 'react-hook-form';
import { TextField as MuiTextField } from '@mui/material';

interface TextAreaFieldProps {
  name: string;
  label: string;
  control: any;
  className?: string;
  value: any;
  onChange?: any;
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
}: TextAreaFieldProps) {
  return (
    <Controller
      key={key}
      name={name}
      control={control}
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
          rows={6}
          multiline
          className={className}
          sx={{
            '& .MuiInputBase-root': {
              borderRadius: '12px',
              paddingLeft: '0.8rem',
            },
          }}
        />
      )}
    />
  );
}

export default TextField;
