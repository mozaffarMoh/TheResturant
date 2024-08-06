import { Controller } from 'react-hook-form';
import { TextField as MuiTextField, Grid, MenuItem } from '@mui/material';

interface SelectTextFieldProps {
  name: string;
  label: string;
  control: any;
  required: boolean;
  fieldData: { name: string; value: string; id: number }[];
  setFormData: any;
  formId: any;
  className?: string;
  value: any;
  onChange?: any;
  [key: string]: any;
}
function SelectTextField({
  name,
  control,
  label,
  required,
  fieldData,
  onChange,
  value,
  className = 'text-field-style',
}: SelectTextFieldProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <MuiTextField
          {...field}
          fullWidth
          id={name}
          label={label}
          select
          required={required}
          error={!!fieldState.error}
          helperText={fieldState.error ? fieldState.error.message : ''}
          value={value}
          onChange={(e) => {
            // Update the onChange handler
            field.onChange();
            if (onChange) {
              onChange(e.target.value); // Call the passed onChange function
            }
          }}
          variant="outlined"
          className={className}
          sx={{
            '& .MuiInputBase-root': {
              borderRadius: '50px',
              paddingLeft: '0.8rem',
            },
          }}
        >
          {fieldData?.map((option) => (
            <MenuItem
              key={option.value}
              value={option.value}
            >
              {option.name}
            </MenuItem>
          ))}
        </MuiTextField>
      )}
    />
  );
}

export default SelectTextField;
