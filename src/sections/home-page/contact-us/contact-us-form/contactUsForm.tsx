import FormField from '@/components/mui-inputs/FormField';
import { buttonPrimaryColor } from '@/constant/color';
import { Button, Grid, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';

const ContactUsForm = () => {
  const typeInputField = {
    id: 0,
    type: 1,
    name: 'type',
    label: 'Type',
    required: true,
    defaultValue: '',
    fieldData: [
      { label: 'Complain', value: 'complain' },
      { label: 'Reach Out', value: 'reach_out' },
    ],
  };
  const emailInputField = {
    id: 1,
    type: 0,
    name: 'email',
    label: 'Email',
    required: true,
  };
  const nameInputField = {
    id: 3,
    type: 0,
    name: 'name',
    label: 'Name',
    required: true,
  };
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    clearErrors,
    setError,
    reset,
    control,
    watch,
    setValue,
  } = useForm();

  return (
    <div className="w-full">
      <FormField
        key={typeInputField.id}
        name={typeInputField.name}
        label={typeInputField.label}
        control={control}
        type={typeInputField.type}
        required={false}
        fieldData={typeInputField.fieldData}
        defaultValue={typeInputField.defaultValue}
        apiErrors={errors[typeInputField.name]?.message}
      />
      <Grid container>
        <Grid
          item
          xs={12}
          md={6}
        >
          <FormField
            key={nameInputField.id}
            name={nameInputField.name}
            label={nameInputField.label}
            control={control}
            type={nameInputField.type}
            required={false}
            apiErrors={errors[nameInputField.name]?.message}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
        >
          <FormField
            key={emailInputField.id}
            name={emailInputField.name}
            label={emailInputField.label}
            control={control}
            type={emailInputField.type}
            required={false}
            apiErrors={errors[emailInputField.name]?.message}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={12}
        >
          <TextField
            id="outlined-multiline-static"
            label="Message"
            multiline
            rows={6}
            className="text-field-style"
            sx={{
              '& .MuiInputBase-root': {
                borderRadius: '12px',
                paddingLeft: '0.8rem',
              },
            }}
          />
        </Grid>
        <Grid
          item
          xs={5}
        >
          <Button
            variant="contained"
            sx={{
              width: '100%',
              borderRadius: '50px',
              backgroundColor: buttonPrimaryColor,
              marginBottom: '4rem',
              marginTop: '2rem',
              height: '3rem',
            }}
          >
            Send
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default ContactUsForm;
