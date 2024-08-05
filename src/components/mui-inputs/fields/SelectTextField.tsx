import { Controller } from 'react-hook-form';
import { TextField as MuiTextField, Grid, MenuItem } from '@mui/material';

interface SelectTextFieldProps {
  name: string;
  label: string;
  control: any;
  required: boolean;
  fieldData: { name: string; value: string; id: number }[];
  apiErrors?: any;
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
  apiErrors,
  className = 'text-field-style',
}: SelectTextFieldProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <MuiTextField
          {...field}
          id={name}
          label={label}
          select
          required={required}
          helperText={apiErrors ? apiErrors : null}
          error={apiErrors && apiErrors ? true : false}
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
