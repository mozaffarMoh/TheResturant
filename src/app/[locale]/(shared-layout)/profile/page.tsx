'use client';
import { primaryColor } from '@/constant/color';
import {
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import CallMadeIcon from '@mui/icons-material/CallMade';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { avatarImage } from '@/constant/images';
import { useTranslations } from 'next-intl';
import FormField from '@/components/mui-inputs/FormField';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { signupSchema } from '../../(auth)/sign-up/schema';
import { useEffect, useState } from 'react';

const Profile = () => {
  const t = useTranslations();
  const [fullFormData, setFullFormData]: any = useState([]);
  const fieldsArray = [
    {
      name: t('auth.first-name-title'),
      placeholder: t('auth.first-name-placeholder'),
      slug: 'first_name',
      type: 'text',
    },
    {
      name: t('auth.last-name-title'),
      placeholder: t('auth.last-name-placeholder'),
      slug: 'last_name',
      type: 'text',
    },
    {
      name: t('auth.email-title'),
      placeholder: t('auth.email-placeholder'),
      slug: 'email',
      type: 'text',
    },
    {
      name: t('auth.phone-title'),
      placeholder: t('auth.phone-placeholder'),
      slug: 'phone',
      type: 'text',
    },
    {
      name: t('auth.gender'),
      slug: 'gender',
      type: 'Select',
      placeholder: t('auth.gender'),
      fieldData: [
        {
          name: t('select.male'),
          value: t('select.male'),
          id: 'male',
          slug: 'male',
        },
        {
          name: t('select.female'),
          value: t('select.female'),
          id: 'female',
          slug: 'female',
        },
      ],
    },
    {
      name: t('auth.governorate'),
      placeholder: t('auth.governorate'),
      slug: 'governorate',
      type: 'Select',
      fieldData: [
        {
          name: t('select.male'),
          value: t('select.male'),
          id: 'male',
          slug: 'male',
        },
        {
          name: t('select.female'),
          value: t('select.female'),
          id: 'female',
          slug: 'female',
        },
      ],
    },
  ];

  const { handleSubmit, control } = useForm({
    resolver: zodResolver(signupSchema(fieldsArray, t)),
  });

  const handleClick = () => {
    console.log('success');
  };

  const handleChangeValue = (value: any, slug: string) => {
    setFullFormData((prevArray: any) => {
      const index = prevArray.findIndex((item: any) => item.field === slug);

      if (index !== -1) {
        // Update existing element
        const updatedArray = [...prevArray];
        updatedArray[index].value = value;
        return updatedArray;
      } else {
        // Add new element
        return [...prevArray, { field: slug, value: value }];
      }
    });
  };

  useEffect(() => {
    console.log(fullFormData);
  }, [fullFormData]);

  return (
    <Container maxWidth="lg">
      <Stack
        paddingY={5}
        gap={3}
      >
        <Typography
          color={primaryColor}
          variant="h6"
          fontWeight={800}
        >
          {t('profile.title')}
        </Typography>

        <Divider sx={{ bgcolor: 'grey.200', width: '100%' }} />

        {/* Avatar section */}
        <Stack
          direction={'row'}
          gap={2}
          alignItems={'center'}
        >
          <img
            width={100}
            height={100}
            style={{ borderRadius: '50%' }}
            src={avatarImage}
            alt="avatar"
          />
          <IconButton
            sx={{
              background: '#a8d2d7',
              height: 'fit-content',
              borderRadius: '10px',
              color: primaryColor,
            }}
          >
            <DeleteOutlineIcon />
          </IconButton>
          <Button
            variant="contained"
            color="inherit"
            sx={{
              height: 'fit-content',
              bgcolor: '#a8d2d7',
              color: primaryColor,
              fontWeight: 600,
            }}
          >
            Upload Images
          </Button>
        </Stack>

        <form onSubmit={handleSubmit(handleClick)}>
          {/* Fields */}
          <Grid
            container
            spacing={2}
          >
            {fieldsArray.map((item: any, i: number) => {
              return (
                <Grid
                  key={i}
                  item
                  xs={12}
                  md={5.5}
                >
                  <Stack gap={2}>
                    <Typography
                      fontWeight={600}
                      color={primaryColor}
                    >
                      {item.name}
                    </Typography>
                    <FormField
                      key={`${i}`}
                      name={item.slug}
                      label={item.name}
                      type={item.type}
                      control={control}
                      required={false}
                      fieldData={item.fieldData}
                      onChange={(e: any) => handleChangeValue(e, item.slug)}
                    />
                  </Stack>
                </Grid>
              );
            })}
          </Grid>

          {/* Save Button */}
          <Stack marginTop={2}>
            <Button
              variant="contained"
              type="submit"
              sx={{
                width: 200,
                height: 50,
                background: primaryColor,
                '&:hover': { background: primaryColor },
              }}
            >
              {t('profile.save')} <CallMadeIcon />
            </Button>
          </Stack>
        </form>
      </Stack>
    </Container>
  );
};

export default Profile;
