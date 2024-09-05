import { useController } from 'react-hook-form';
import {
  FormControlLabel,
  Checkbox,
  FormControl,
  FormHelperText,
  useMediaQuery,
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
  const isScreen450 = useMediaQuery('(max-width:450px)');
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
      style={{ width: '100%' }}
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
            }}
          />
        }
        sx={{
          '&.MuiFormControlLabel-labelPlacementEnd': {
            margin: 0,
          },
        }}
        label={
          <span
            style={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              fontSize: '15px',
            }}
          >
            {label}
          </span>
        }
        labelPlacement="end"
      />
      {error && (
        <FormHelperText sx={{ marginRight: isArabic ? '30px' : '' }}>
          {error.message}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default SingleCheckboxField;
