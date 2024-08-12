'use client';
import type { NextPage } from 'next';
import LoadingButton from '@mui/lab/LoadingButton';
import { Button, Grid, Paper, Stack } from '@mui/material';
import Link from 'next/link';
import { loginBgImage } from '@/constant/images';
import styles from '../../sign-in/page.module.css';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import SuccessRegisterModal from '@/components/modals/success-register-modal';
import CustomAlert from '@/components/alerts/CustomAlert';
import Cookies from 'js-cookie';
import { usePathname, useRouter } from 'next/navigation';
import FormField from '@/components/mui-inputs/FormField';
import usePost from '@/custom-hooks/usePost';
import { endPoints } from '@/base-api/endPoints';
import { typeSchema } from './schema';
import { useTranslations } from 'next-intl';

const UserDetailsPage: NextPage = () => {
  const router = useRouter();
  const t = useTranslations();
  const pathname = usePathname();
  let isArabic = pathname.startsWith('/ar');
  const langCookie = Cookies.get('NEXT_LOCALE') || 'en';
  const signupData: any = Cookies.get('signUpData') || '';
  const signupDataParsed = signupData ? JSON.parse(signupData) : null;
  const formData: any = localStorage.getItem('formData');
  const userType = Cookies.get('userType');
  const [typeDetails, setTypeDetails]: any = useState({ inputs: [] });
  const [fullFormData, setFullFormData]: any = useState([]);
  const [fullFormID, setFullFormID]: any = useState(0);
  const [userID, setUserID]: any = useState('');
  const [OTPValue, setOTPValue]: any = useState('');
  const { handleSubmit, control } = useForm({
    resolver: zodResolver(typeSchema(typeDetails.inputs, t)),
  });
  const bodyWithoutOTP = {
    ...signupDataParsed,
    place_slug: 'jordan',
  };
  const bodyWithOTP = {
    ...signupDataParsed,
    place_slug: 'jordan',
    otp: OTPValue,
  };
  const bodyForFinsihSubmit = {
    form_id: fullFormID,
    user_id: userID,
    data: fullFormData,
  };
  const [
    ,
    loadingForOTP,
    handlePostForOTP,
    successForOTP,
    ,
    errorMessageForOTP,
  ] = usePost(endPoints.createUser, bodyWithoutOTP);

  const [
    dataForSubmit,
    loadingForSubmit,
    handlePostForSubmit,
    successForSubmit,
    ,
    errorMessageForSubmit,
  ] = usePost(endPoints.createUser, bodyWithOTP);

  const [
    ,
    loadingForFinishSubmit,
    handlePostForFinishSubmit,
    successForFinishSubmit,
    ,
    errorMessageForFinishSubmit,
  ] = usePost(endPoints.formSubmit, bodyForFinsihSubmit);

  /* Check if formData comes from localStorage is exist to continue if not redirect to sign-up */
  /* if continue extract typeDetail object from children array */
  useEffect(() => {
    if (!formData) {
      router.push(`/${langCookie}/sign-up`);
    } else {
      let formDataParsed: any = JSON.parse(formData);
      let typeIndex: number = 0;
      formDataParsed.children.forEach((item: any, index: number) => {
        if (item.name.includes(userType?.slice(0, -1))) {
          typeIndex = index;
        }
      });
      if (formDataParsed.children[typeIndex]?.slug) {
        setTypeDetails(formDataParsed.children[typeIndex]);
      }
      setFullFormID(formDataParsed.id);
    }
  }, []);

  /* When success second request set user id for submit */
  useEffect(() => {
    if (successForSubmit) {
      setUserID(dataForSubmit.id);
    }
  }, [successForSubmit]);

  /* When userId filled start submit if error empty the values for make user recall second request again */
  useEffect(() => {
    userID && handlePostForFinishSubmit();
  }, [userID]);

  /* finally if submit success store token in cookies then navigate to home */
  useEffect(() => {
    if (successForFinishSubmit) {
      const finishProcess = async () => {
        await Cookies.set('token', dataForSubmit.token.token, {
          expires: new Date('9999-12-31T23:59:59'),
        });
        await setTimeout(() => {
          router.push(`/${langCookie}/home`);
          localStorage.removeItem('formData');
          Cookies.remove('signUpData');
          Cookies.remove('userType');
        }, 2000);
      };
      finishProcess();
    }
  }, [successForFinishSubmit]);

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

  const onSubmit = () => {
    handlePostForOTP();
  };

  return formData ? (
    <div className={styles.signInContainer}>
      {/* Success Modal when user Success register */}
      <SuccessRegisterModal
        open={successForOTP}
        OTPValue={OTPValue}
        userID={userID}
        setOTPValue={setOTPValue}
        loadingForSubmit={loadingForSubmit}
        loadingForFinishSubmit={loadingForFinishSubmit}
        handlePostForSubmit={handlePostForSubmit}
        handlePostForFinishSubmit={handlePostForFinishSubmit}
      />
      {/* This alert when some fields are error from the server */}
      <CustomAlert
        openAlert={
          errorMessageForOTP ||
          errorMessageForSubmit ||
          errorMessageForFinishSubmit
        }
        setOpenAlert={() => {}}
        message={
          errorMessageForOTP ||
          errorMessageForSubmit ||
          errorMessageForFinishSubmit
        }
      />

      <CustomAlert
        openAlert={successForFinishSubmit}
        setOpenAlert={() => {}}
        type="success"
        message={t('messages.success-create-user')}
      />
      <div className="w-full ">
        <Grid
          container
          component="main"
          className={styles.TwoSideContainer}
        >
          <Grid
            item
            xs={12}
            sm={10}
            md={6}
            component={Paper}
            elevation={6}
            square
            className="sm-flex-row-row-center-center"
          >
            <Stack width={'70%'}>
              <div className="mb-1 sm-flex-row-row-center-center">
                <img
                  src={loginBgImage}
                  alt="image"
                />
              </div>{' '}
              <div className=" sm-flex-row-row-center-center">
                {typeDetails?.name && (
                  <p className=" text-large-title m-1">
                    <span className="fc-secondary">
                      {typeDetails?.name.split(' ')[0]}
                    </span>{' '}
                    {typeDetails?.name.split(' ')[1]}
                  </p>
                )}
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Stack
                  height={400}
                  overflow={'auto'}
                  gap={2}
                >
                  {typeDetails?.inputs &&
                    typeDetails?.inputs.map((item: any) => {
                      return (
                        <FormField
                          key={item.id}
                          name={item.slug}
                          label={item.name}
                          value={
                            fullFormData.find(
                              (field: any) =>
                                field.form_field_id === item.form_field_id,
                            )?.value
                          }
                          type={item.input_type.name}
                          control={control}
                          required={false}
                          fieldData={item.input_options}
                          onChange={(e: any) =>
                            handleChangeValue(e, item.form_field_id)
                          }
                          setFormData={setFullFormData}
                          formId={item.form_field_id}
                        />
                      );
                    })}
                </Stack>
                <Stack
                  direction={'row'}
                  justifyContent={'space-between'}
                  marginTop={4}
                >
                  <Link href={`/${langCookie}/who-are-you`}>
                    <Button
                      variant="outlined"
                      sx={{
                        border: 'none',
                        marginBottom: '4rem',
                        textDecoration: 'underline',
                        textTransform: 'none',
                        fontSize: '1.2rem',
                        gap: isArabic ? '10px' : '',
                        '&:hover': {
                          border: 'none',
                          backgroundColor: 'transparent',
                        },
                      }}
                      startIcon={
                        isArabic ? (
                          <KeyboardDoubleArrowRightIcon />
                        ) : (
                          <KeyboardDoubleArrowLeftIcon />
                        )
                      }
                    >
                      {t('who-are-you.back')}
                    </Button>
                  </Link>

                  <LoadingButton
                    type="submit"
                    variant="outlined"
                    loading={loadingForOTP}
                    loadingPosition="center"
                    sx={{
                      border: 'none',
                      marginBottom: '4rem',
                      textDecoration: 'underline',
                      textTransform: 'none',
                      fontSize: '1.2rem',
                      gap: isArabic ? '10px' : '',
                      '&:hover': {
                        border: 'none',
                        backgroundColor: 'transparent',
                      },
                      '&.MuiButtonBase-root:disabled': {
                        border: 'inherit',
                        cursor: 'not-allowed',
                        pointerEvents: 'auto',
                      },
                    }}
                    endIcon={
                      isArabic ? (
                        <KeyboardDoubleArrowLeftIcon />
                      ) : (
                        <KeyboardDoubleArrowRightIcon />
                      )
                    }
                    disabled={false}
                  >
                    {t('buttons.submit')}
                  </LoadingButton>
                </Stack>
              </form>
            </Stack>
          </Grid>
          <Grid
            item
            xs={false}
            sm={2}
            md={6}
            sx={{
              backgroundImage: 'url("/details.png")',
              backgroundColor: 'gray',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </Grid>
      </div>
    </div>
  ) : (
    <div></div>
  );
};

export default UserDetailsPage;
