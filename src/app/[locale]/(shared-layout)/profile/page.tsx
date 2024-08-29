'use client';
import { primaryColor } from '@/constant/color';
import {
  Container,
  Grid,
  IconButton,
  MenuItem,
  Select,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';
import CallMadeIcon from '@mui/icons-material/CallMade';
import { avatarImage } from '@/constant/images';
import { useTranslations } from 'next-intl';
import FormField from '@/components/mui-inputs/FormField';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ChangeEvent, useEffect, useState } from 'react';
import { domain, endPoints } from '@/base-api/endPoints';
import usePost from '@/custom-hooks/usePost';
import Cookies from 'js-cookie';
import CustomAlert from '@/components/alerts/CustomAlert';
import { LoadingButton } from '@mui/lab';
import useGet from '@/custom-hooks/useGet';
import { ProfileSchema } from './schema';

const Profile = () => {
  const t = useTranslations();
  const token = Cookies.get('token') || '';
  const isScreen500 = useMediaQuery('(max-width:500px)');
  const [fullFormData, setFullFormData]: any = useState({});
  const [formDataImage, setFormDataImage] = useState<FormData | null>(null);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [governorateArray, setGovernorateArray] = useState([]);
  const [isClientSide, setIsClientSide] = useState(false);

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
      startDecorator: (
        <Select
          value="+962"
          variant="standard"
          sx={{
            '&::before': { borderBottom: 'none' }, // Removes the line before interaction
            '&::after': { borderBottom: 'none' }, // Removes the line after interaction
            '&:hover:not(.Mui-disabled)::before': {
              borderBottom: 'none', // Removes the line when hovering over the input
            },
          }}
          style={{
            direction: 'ltr',
            unicodeBidi: 'bidi-override',
            border: 'none',
          }}
        >
          <MenuItem
            value={'+962'}
            style={{ direction: 'ltr', unicodeBidi: 'bidi-override' }}
          >
            +962
          </MenuItem>
        </Select>
      ),
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
        },
        {
          name: t('select.female'),
          value: t('select.female'),
          id: 'female',
        },
      ],
    },
    {
      name: t('auth.governorate'),
      slug: 'place_id',
      type: 'Select',
      placeholder: t('auth.governorate'),
      fieldData: governorateArray,
    },
  ];
  const { handleSubmit, control, setValue } = useForm({
    resolver: zodResolver(ProfileSchema(fieldsArray, t)),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      gender: '',
      place_id: '',
    },
  });

  const [governorateData, , getGovernorateData, , , errorStatusGovernorate] =
    useGet(endPoints.getGovernorate);

  const [userData, , getUserData] = useGet(endPoints.getUserInformation, true);
  let imageURLUser =
    userData && userData?.media?.['User/media']?.[0]?.url
      ? domain + userData?.media?.['User/media']?.[0]?.url
      : avatarImage;

  const [
    dataImage,
    loadingImage,
    handleUpdateImage,
    successImage,
    ,
    errorMessageImage,
  ] = usePost(endPoints.uploadProfileImage, formDataImage, token);

  const [
    dataUpdateProfile,
    loadingUpdateProfile,
    handleUpdateProfile,
    successUpdateProfile,
    ,
    errorMessageUpdateProfile,
  ] = usePost(endPoints.updateProfile, fullFormData, token);

  /* Upload Image from input */
  const handleUploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const file = files[0];
      const newFormData = new FormData();
      newFormData.append('image', file); // Assuming your backend expects 'image' as the key
      setFormDataImage(newFormData);
    }
    e.target.value = '';
  };
  /* start process when formdata ready */
  useEffect(() => {
    if (formDataImage) {
      handleUpdateImage();
    }
  }, [formDataImage]);

  /* Show success message when sucesss status and store token  */
  useEffect(() => {
    if (successImage) {
      setSuccessMessage(t('messages.upload-image'));
      Cookies.set('token', dataImage?.token?.token);
      getUserData();
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    }
  }, [successImage]);

  /* Show success message when sucesss status and store token */
  useEffect(() => {
    if (successUpdateProfile) {
      setSuccessMessage(t('messages.update-profile'));
      Cookies.set('token', dataUpdateProfile?.token?.token);
    }
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  }, [successUpdateProfile]);

  /* get the governorate data and store it in state array */
  useEffect(() => {
    getGovernorateData();
    getUserData();
    setIsClientSide(true);
  }, []);

  useEffect(() => {
    if (errorStatusGovernorate) {
      getGovernorateData();
    }
  }, [errorStatusGovernorate]);

  useEffect(() => {
    if (governorateData?.children) {
      const array = governorateData?.children;
      setGovernorateArray(array);
    }
  }, [governorateData]);

  useEffect(() => {
    if (userData?.slug) {
      setFullFormData({
        first_name: userData?.first_name,
        last_name: userData?.last_name,
        gender: userData?.gender,
        phone: userData?.phone,
        email: userData?.email,
        place_id: userData?.place?.id,
      });

      setValue('first_name', userData?.first_name);
      setValue('last_name', userData?.last_name);
      setValue('gender', userData?.gender);
      setValue('phone', userData?.phone);
      setValue('email', userData?.email);
      setValue('place_id', userData?.place?.id);
    }
  }, [userData, setValue]);

  const handleChangeValue = (value: any, slug: string) => {
    setFullFormData((prevObject: any) => {
      const newValue = Array.isArray(value) ? value[0] : value;
      return {
        ...prevObject,
        [slug]: newValue,
      };
    });
  };

  const handleSubmitForm = () => {
    handleUpdateProfile();
  };

  return (
    <Container maxWidth="lg">
      {isClientSide && (
        <head>
          <title>The Platform | My-Profile</title>
          <meta
            name="description"
            content="Welcome to the My-Profile page of The Platform Website"
          />
        </head>
      )}
      <CustomAlert
        openAlert={errorMessageImage || errorMessageUpdateProfile}
        setOpenAlert={() => {}}
        message={errorMessageImage || errorMessageUpdateProfile}
      />
      <CustomAlert
        openAlert={Boolean(successMessage)}
        setOpenAlert={() => setSuccessMessage('')}
        type="success"
        message={successMessage}
      />{' '}
      <Stack
        paddingY={5}
        gap={3}
      >
        <Stack textAlign={'center'}>
          <Typography
            color={primaryColor}
            variant="h4"
            fontWeight={600}
          >
            {t('profile.title')}
          </Typography>
        </Stack>

        {/* Avatar section */}
        <Stack
          direction={'row'}
          gap={2}
          alignItems={'center'}
        >
          <img
            width={isScreen500 ? 80 : 100}
            height={isScreen500 ? 80 : 100}
            style={{ borderRadius: '50%' }}
            src={imageURLUser}
            alt="avatar"
          />
          {/*    <IconButton
            sx={{
              background: '#a8d2d7',
              height: 'fit-content',
              borderRadius: '10px',
              color: primaryColor,
            }}
          >
            <DeleteOutlineIcon />
          </IconButton> */}
          <input
            type="file"
            onChange={handleUploadImage}
            id="profile-input"
            hidden
            accept="image/*"
          />{' '}
          <label htmlFor="profile-input">
            <LoadingButton
              variant="contained"
              loading={loadingImage}
              component="span"
              color="inherit"
              sx={{
                height: 'fit-content',
                bgcolor: '#a8d2d7',
                color: primaryColor,
                fontWeight: 600,
              }}
            >
              {' '}
              {t('profile.upload-image')}
            </LoadingButton>
          </label>
        </Stack>

        <form onSubmit={handleSubmit(handleSubmitForm)}>
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
                      name={item?.slug}
                      label={item?.name}
                      type={item?.type}
                      control={control}
                      required={false}
                      fieldData={item?.fieldData}
                      value={fullFormData[item?.slug]}
                      startDecorator={item?.startDecorator}
                      onChange={(e: any) => handleChangeValue(e, item?.slug)}
                    />
                  </Stack>
                </Grid>
              );
            })}
          </Grid>

          {/* Save Button */}
          <Stack marginTop={2}>
            <LoadingButton
              variant="contained"
              type="submit"
              loading={loadingUpdateProfile}
              sx={{
                width: 200,
                height: 50,
                background: primaryColor,
                '&:hover': { background: primaryColor },
              }}
            >
              {t('profile.save')} <CallMadeIcon />
            </LoadingButton>
          </Stack>
        </form>
      </Stack>
    </Container>
  );
};

export default Profile;
