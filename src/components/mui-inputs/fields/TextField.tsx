import { Controller } from 'react-hook-form';
import { TextField as MuiTextField } from '@mui/material';
import { usePathname } from 'next/navigation';

interface TextFieldProps {
  name: string;
  label: string;
  control: any;
  className?: string;
  value: any;
  onChange?: any;
  setFormData: any;
  formId: any;
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
}: TextFieldProps) {
  const pathname = usePathname();
  let isArabic = pathname.startsWith('/ar');

  return (
    <Controller
      key={key}
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <MuiTextField
          style={{ width: '100%' }}
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
          rows={name == 'Text Area' ? 6 : 1}
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
              paddingRight: '0.8rem', // Ensure the text does not hit the border
            },
            '& .MuiFormHelperText-root': {
              textAlign: isArabic ? 'right' : 'left',
            },
            '& .MuiOutlinedInput-notchedOutline legend': {
              textAlign: isArabic ? 'right' : 'left',
            },
          }}
        />
      )}
    />
  );
}

export default TextField;
