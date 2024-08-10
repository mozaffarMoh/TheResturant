import { buttonPrimaryColor } from '@/constant/color';
import { Button, Grid, TextField, useMediaQuery } from '@mui/material';
import { useForm } from 'react-hook-form';
import styles from '../contact-us.module.css';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import useGet from '@/custom-hooks/useGet';
import { endPoints } from '@/base-api/endPoints';
import FormContactUSField from '@/components/mui-inputs/FormContactUSField';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactUsSchema } from './schema';

const ContactUsForm = () => {
  const t = useTranslations();
  const isScreen900 = useMediaQuery('(max-width:900px)');
  const [fullFormData, setFullFormData]: any = useState([]);
  const [fullFormID, setFullFormID]: any = useState(0);
  const [userID, setUserID]: any = useState('');
  const [data, , getData] = useGet(endPoints.contactUsForm);
  useEffect(() => {
    getData();
  }, []);

  const { handleSubmit, control } = useForm({
    resolver: zodResolver(contactUsSchema(data, t)),
  });

  useEffect(() => {
    if (data) {
      setFullFormID(data.id);
    }
  }, [data]);

  /* Handle changing fields values */
  const handleChangeValue = (value: any, formId: number) => {
    setFullFormData((prevArray: any) => {
      const index = prevArray.findIndex(
        (item: any) => item.form_field_id === formId,
      );

      if (index !== -1) {
        // Update existing element
        const updatedArray = [...prevArray];
        updatedArray[index].value = value;
        return updatedArray;
      } else {
        // Add new element
        return [...prevArray, { form_field_id: formId, value: value }];
      }
    });
  };

  /*   useEffect(() => {
    console.log(fullFormData);
  }, [fullFormData]); */

  const onSubmit = () => {
    console.log('submit is success');
  };

  return (
    <form
      className="w-full "
      onSubmit={handleSubmit(onSubmit)}
    >
      {data && data?.children && (
        <Grid
          container
          direction={'column'}
        >
          <Grid
            item
            container
            direction={isScreen900 ? 'column' : 'row'}
          >
            {data?.children[0]?.inputs &&
              data?.children[0]?.inputs.map((item: any, i: number) => {
                return (
                  <Grid
                    key={item.id}
                    item
                    xs={6}
                    md={i == 1 || i == 2 ? 5.7 : 12}
                  >
                    <FormContactUSField
                      key={item.id}
                      name={item.slug}
                      label={item.name}
                      control={control}
                      value={
                        fullFormData.find(
                          (field: any) =>
                            field.form_field_id === item.form_field_id,
                        )?.value
                      }
                      onChange={(e: any) =>
                        handleChangeValue(e, item.form_field_id)
                      }
                      type={item.input_type.slug}
                      fieldData={item.input_options}
                      className={styles.inputsFieldStyle}
                    />
                  </Grid>
                );
              })}
          </Grid>

          <Grid
            item
            width={'40%'}
          >
            <Button
              variant="contained"
              color="inherit"
              type="submit"
              className="general-button-primary mt-1"
              sx={{
                width: '100%',
                borderRadius: '50px',
                marginBottom: '4rem',
                marginTop: '3rem',
                height: '3rem',
              }}
            >
              {t('contact-us.send')}
            </Button>
          </Grid>
        </Grid>
      )}
    </form>
  );
};

export default ContactUsForm;
