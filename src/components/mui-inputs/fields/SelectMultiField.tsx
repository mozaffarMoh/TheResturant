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
  Stack,
} from '@mui/material';
import { usePathname } from 'next/navigation';

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
  const pathname = usePathname();
  let isArabic = pathname.startsWith('/ar');
  return (
    <Controller
      key={key}
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        return (
          <FormControl
            variant="outlined"
            className="input-form-control-multi-check"
            error={!!fieldState.error}
            style={{ width: '100%' }}
            sx={{
              '& .MuiInputBase-root': {
                borderRadius: '50px',
                paddingLeft: '0.8rem',
              },
              '& .MuiFormLabel-root': {
                right: isArabic ? 25 : '',
                left: isArabic ? 'auto' : '',
                transformOrigin: isArabic ? 'top right' : '',
                textAlign: isArabic ? 'right' : 'left',
              },
              '& .MuiFormHelperText-root': {
                textAlign: isArabic ? 'right' : 'left', // Align helper text to the right
              },
              '& .MuiOutlinedInput-notchedOutline legend': {
                textAlign: isArabic ? 'right' : 'left',
              },
              '& .MuiSvgIcon-root': {
                position: 'absolute',
                right: isArabic ? 'auto' : '0.5rem', // Position to the left if not Arabic
                left: isArabic ? '0.5rem' : 'auto', // Position to the right if Arabic
              },
            }}
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
                  ?.slice(0, 4)
                  ?.map((value: string) => {
                    const item = fieldData?.find(
                      (option: any) => option.id === value,
                    );

                    return item ? item.name : value;
                  })
                  ?.join(' || ')
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
              <Stack direction={'row'}>
                <FormHelperText>{fieldState.error.message}</FormHelperText>
              </Stack>
            )}
          </FormControl>
        );
      }}
    />
  );
}

export default SelectMultiField;
