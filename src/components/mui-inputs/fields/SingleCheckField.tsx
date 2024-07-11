import { useController } from 'react-hook-form';
import {
  FormControlLabel,
  Checkbox,
  FormControl,
  FormHelperText,
} from '@mui/material';
import { buttonPrimaryColor } from '@/constant/color';

interface CheckboxFieldProps {
  name: string;
  control: any;
  label: string;
  required?: boolean;
  [key: string]: any;
}

const SingleCheckboxField = ({
  name,
  control,
  label,
  required = false,
}: CheckboxFieldProps) => {
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
      error={!!error}
      className="input-form-control"
    >
      <FormControlLabel
        control={
          <Checkbox
            {...field}
            checked={field.value}
            sx={{
              display: 'inline-block',
              color: buttonPrimaryColor,
              '&.Mui-checked': {
                color: 'orange',
              },
            }}
          />
        }
        label={label}
        labelPlacement="end"
      />
      {error && <FormHelperText>{error.message}</FormHelperText>}
    </FormControl>
  );
};

export default SingleCheckboxField;
