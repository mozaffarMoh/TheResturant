import { buttonPrimaryColor } from '@/constant/color';
import { Button, Grid, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import styles from '../contact-us.module.css';
import { useTranslations } from 'next-intl';
import FormField from '@/components/mui-inputs/FormField';

const ContactUsForm = () => {
  const t = useTranslations();
  const typeInputField: any = {
    id: 0,
    type: 1,
    name: 'type',
    label: t('contact-us.type'),
    required: true,
    defaultValue: '',
    fieldData: [
      { name: t('contact-us.complain'), value: 'complain' },
      { name: t('contact-us.reach-out'), value: 'reach_out' },
    ],
  };
  const emailInputField = {
    id: 1,
    type: 0,
    name: 'email',
    label: t('contact-us.email'),
    required: true,
  };
  const nameInputField = {
    id: 3,
    type: 0,
    name: 'name',
    label: t('contact-us.name'),
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
    <div className="w-full ">
      <Grid container>
        <Grid
          item
          xs={12}
        >
          <FormField
            key={typeInputField.id}
            name={typeInputField.name}
            label={typeInputField.label}
            control={control}
            type={'Select'}
            required={false}
            fieldData={typeInputField.fieldData}
            defaultValue={typeInputField.defaultValue}
            className={styles.inputsFieldStyle}
          />
        </Grid>

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
            type={'Text'}
            required={false}
            className={styles.inputsFieldStyle}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={5.5}
        >
          <FormField
            key={emailInputField.id}
            name={emailInputField.name}
            label={emailInputField.label}
            control={control}
            type={'Text'}
            required={false}
            className={styles.inputsFieldStyle}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={12}
        >
          <TextField
            id="outlined-multiline-static"
            label={t('contact-us.message')}
            multiline
            rows={6}
            className={styles.inputsFieldStyle}
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
              marginTop: '3rem',
              height: '3rem',
            }}
          >
            {t('contact-us.send')}
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default ContactUsForm;
