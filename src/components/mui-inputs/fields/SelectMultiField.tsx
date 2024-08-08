import { Controller } from 'react-hook-form';
import {
  TextField as MuiTextField,
  Grid,
  MenuItem,
  Select,
  Checkbox,
  ListItemText,
  FormControl,
  InputLabel,
  FormHelperText,
} from '@mui/material';

interface SelectTextFieldProps {
  key: string;
  name: string;
  label: string;
  control: any;
  required: boolean;
  fieldData: { name: string; value: string; id: number }[];
  className?: string;
  onChange?: any;
  value: any;
}
function SelectMultiField({
  name,
  key,
  control,
  label,
  required,
  fieldData,
  onChange,
  value = [],
}: SelectTextFieldProps) {
  return (
    <Controller
      key={key}
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        return (
          <FormControl
            variant="outlined"
            fullWidth
            className="input-form-control-multi-check"
            error={!!fieldState.error}
          >
            <InputLabel required={required}>{label}</InputLabel>
            <Select
              {...field}
              label={label}
              multiple
              value={value || []}
              sx={{ borderRadius: '50px' }}
              renderValue={(selected) =>
                selected
                  .slice(0, 4)
                  .map((value: string) => {
                    const item = fieldData.find(
                      (option: any) => option.id === value,
                    );

                    return item ? item.name : value;
                  })
                  .join(' || ')
              }
              onChange={(e: any) => {
                // Update the onChange handler
                field.onChange(e);
                if (onChange) {
                  onChange(e.target.value);
                }
              }}
            >
              {fieldData.map((option: any) => (
                <MenuItem
                  key={option.value}
                  value={option.id}
                >
                  <Checkbox checked={value.indexOf(option.id) > -1} />
                  <ListItemText primary={option.name} />
                </MenuItem>
              ))}
            </Select>
            {fieldState.error && (
              <FormHelperText>{fieldState.error.message}</FormHelperText> // Display error message
            )}
          </FormControl>
        );
      }}
    />
  );
}

export default SelectMultiField;
