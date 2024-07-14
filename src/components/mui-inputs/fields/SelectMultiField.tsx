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
} from '@mui/material';

interface SelectTextFieldProps {
  name: string;
  label: string;
  control: any;
  required: boolean;
  fieldData: { label: string; value: string }[];
  defaultValue: string;
  [key: string]: any;
}
function SelectMultiField({
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
        <FormControl
          variant="outlined"
          className="input-form-control-multi-check"
        >
          <InputLabel required={required}>{label}</InputLabel>
          <Select
            {...field}
            label={label}
            multiple
            value={field.value || []}
            sx={{ borderRadius: '50px' }}
            renderValue={(selected) =>
              selected
                .slice(0, 4)
                .map((value: string) => {
                  const item = fieldData.find(
                    (option) => option.value === value,
                  );
                  return item ? item.label : value;
                })
                .join('...')
            }
          >
            {fieldData.map((option) => (
              <MenuItem
                key={option.value}
                value={option.value}
              >
                <Checkbox checked={field.value.indexOf(option.value) > -1} />
                <ListItemText primary={option.label} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    />
  );
}

export default SelectMultiField;
