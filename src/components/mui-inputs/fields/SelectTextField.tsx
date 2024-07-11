import { Controller } from 'react-hook-form';
import { TextField as MuiTextField, Grid, MenuItem } from '@mui/material';

interface SelectTextFieldProps {
  name: string;
  label: string;
  control: any;
  required: boolean;
  fieldData: { label: string; value: string }[];
  defaultValue: string;
  [key: string]: any;
}
function SelectTextField({
  name,
  control,
  label,
  required,
  fieldData,
  defaultValue,
}: SelectTextFieldProps) {
  // console.log(fieldData);

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <MuiTextField
          {...field}
          id={name}
          label={label}
          select
          required={required}
          // helperText={apiErrors ? apiErrors : null}
          // error={apiErrors && apiErrors ? true : false}
          variant="outlined"
          className="text-field-style "
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
              {option.label}
            </MenuItem>
          ))}
        </MuiTextField>
      )}
    />
  );
}

export default SelectTextField;
