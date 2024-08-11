import { Controller } from 'react-hook-form';
import { TextField as MuiTextField, Grid, MenuItem } from '@mui/material';
import { usePathname } from 'next/navigation';

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
  key: string;
}
function SelectTextField({
  key,
  name,
  control,
  label,
  required,
  fieldData,
  onChange,
  value,
  className = 'text-field-style',
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
              field.onChange(e);
              if (onChange) {
                onChange([e.target.value]); // Call the passed onChange function
              }
            }}
            variant="outlined"
            className={className}
            InputLabelProps={{
              sx: {
                right: isArabic ? 25 : '',
                left: isArabic ? 'auto' : '',
                transformOrigin: isArabic ? 'top right' : '',
                textAlign: isArabic ? 'right' : 'left',
              },
            }}
            sx={{
              '& .MuiInputBase-root': {
                borderRadius: '50px',
                paddingLeft: '0.8rem',
              },
              '& .MuiFormHelperText-root': {
                textAlign: isArabic ? 'right' : 'left', // Align helper text to the right
              },
              '& .MuiOutlinedInput-notchedOutline legend': {
                textAlign: isArabic ? 'right' : 'left',
              },
              '& .MuiSvgIcon-root': {
                position: 'absolute',
                right: isArabic ? 'auto' : '0.5rem',  // Position to the left if not Arabic
                left: isArabic ? '0.5rem' : 'auto', // Position to the right if Arabic
              },
            }}
          >
            {fieldData?.map((option: any) => (
              <MenuItem
                key={option.value}
                value={option.id}
              >
                {option.name}
              </MenuItem>
            ))}
          </MuiTextField>
        );
      }}
    />
  );
}

export default SelectTextField;
