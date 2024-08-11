import { useController } from 'react-hook-form';
import {
  FormControlLabel,
  Checkbox,
  FormControl,
  FormHelperText,
} from '@mui/material';
import { buttonPrimaryColor } from '@/constant/color';
import { usePathname } from 'next/navigation';

interface CheckboxFieldProps {
  key: string;
  name: string;
  control: any;
  label: string;
  required?: boolean;
  value: any;
  onChange?: any;
}

const SingleCheckboxField = ({
  key,
  name,
  control,
  label,
  required,
  value,
  onChange,
}: CheckboxFieldProps) => {
  const pathname = usePathname();
  let isArabic = pathname.startsWith('/ar');
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: {
      required: required ? 'This field is required' : false,
    },
    defaultValue: false,
  });

  return (
    <FormControl
      key={key}
      error={!!error}
      className="input-form-control"
      fullWidth
      sx={{ display: 'flex', alignItems: 'flex-start' }}
    >
      <FormControlLabel
        control={
          <Checkbox
            {...field}
            onChange={(e) => {
              // Update the onChange handler
              field.onChange(e);
              if (onChange) {
                onChange(e.target.checked); // Call the passed onChange function
              }
            }}
            checked={value}
            sx={{
              color: buttonPrimaryColor,
              '&.Mui-checked': {
                color: 'orange',
              },
              marginLeft : !isArabic ? '10px' : ''
            }}
          />
        }
        label={label}
        labelPlacement="end"
      />
      {error && (
        <FormHelperText sx={{ margin: isArabic ? '0px 30px' : '' }}>
          {error.message}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default SingleCheckboxField;
