'use client';
import type { NextPage } from 'next';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Button, Grid, Paper, TextField } from '@mui/material';
import Link from 'next/link';
import { loginBgImage } from '@/constant/images';
import styles from '../../sign-in/page.module.css';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import userTypeSchema from './schema';
import { useEffect, useRef, useState } from 'react';
import SuccessRegisterModal from '@/components/modals/success-register-modal';
import CustomAlert from '@/components/alerts/CustomAlert';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import FormFieldUserType from '@/components/mui-inputs/FormDataUserType';
import usePost from '@/custom-hooks/usePost';
import { endPoints } from '@/base-api/endPoints';

const UserDetailsPage: NextPage = () => {
  const router = useRouter();
  const langCookie = Cookies.get('NEXT_LOCALE') || 'en';
  const emailCookie = Cookies.get('email');
  const passwordCookie = Cookies.get('password');
  const formData: any = localStorage.getItem('formData');
  const userType = Cookies.get('userType');
  const [typeDetails, setTypeDetails]: any = useState({});
  const [fullFormData, setFullFormData]: any = useState([]);
  const [fullFormID, setFullFormID]: any = useState(0);
  const [userID, setUserID]: any = useState('');
  const [OTPValue, setOTPValue]: any = useState('');
  const headersObj = {
    Accept: 'application/json',
    Language: langCookie,
    Token: 'z9abe71334aea8236dwell811077c7cb768f7e816290f1',
  };
  const bodyWithoutOTP = {
    email: emailCookie,
    password: passwordCookie,
    password_confirmation: passwordCookie,
    place_slug: 'jordan',
  };
  const bodyWithOTP = {
    email: emailCookie,
    password: passwordCookie,
    password_confirmation: passwordCookie,
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
  const {
    handleSubmit,
    formState: { errors },
    control,
    trigger,
    setError,
  } = useForm({
    resolver: zodResolver(userTypeSchema),
    mode: 'onChange',
    defaultValues: fullFormData,
  });

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

      setTypeDetails(formDataParsed.children[typeIndex]);
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
      Cookies.remove('email');
      Cookies.remove('password');
      Cookies.remove('userType');
      localStorage.removeItem('formData');
      Cookies.set('token', dataForSubmit.token.token, {expires : new Date('9999-12-31T23:59:59')});
      setTimeout(() => {
        router.push(`/${langCookie}/home`);
      }, 2000);
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

    // Clear the error for the field when the value changes
    setError(formId.toString(), { type: 'manual', message: '' });
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
        message={'User creation process completed successfully.'}
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
            sm={8}
            md={6}
            component={Paper}
            elevation={6}
            square
            className="sm-flex-row-row-center-center"
          >
            <Box className="main-box">
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
              <div className="sm-flex-col-col-center scrollable-container  ">
                {typeDetails?.inputs &&
                  typeDetails?.inputs.map((item: any) => {
                    return (
                      <FormFieldUserType
                        key={item.id}
                        name={item.name}
                        label={item.name}
                        value={
                          fullFormData.find(
                            (field: any) =>
                              field.form_field_id === item.form_field_id,
                          )?.value || ''
                        }
                        type={item.input_type.name}
                        control={control}
                        required={Boolean(item.is_required)}
                        fieldData={item.input_options}
                        defaultValue={item.defaultValue}
                        apiErrors={
                          item.is_required
                            ? errors[item.slug.replace('-', '_')]?.message
                            : 'not_required'
                        }
                        onChange={(e: any) =>
                          handleChangeValue(e, item.form_field_id)
                        }
                        setFormData={setFullFormData}
                        formId={item.form_field_id}
                      />
                    );
                  })}
              </div>
              <div className=" sm-flex-row-row-center-between  w-full mt-2 ">
                <Link href={`/${langCookie}/who-are-you`}>
                  <Button
                    variant="outlined"
                    sx={{
                      border: 'none',
                      marginBottom: '4rem',
                      textDecoration: 'underline',
                      textTransform: 'none',
                      fontSize: '1.2rem',
                      '&:hover': {
                        border: 'none',
                        backgroundColor: 'transparent',
                      },
                    }}
                    startIcon={<KeyboardDoubleArrowLeftIcon />}
                  >
                    Back
                  </Button>
                </Link>

                <LoadingButton
                  type="submit"
                  variant="outlined"
                  onClick={handlePostForOTP}
                  loading={loadingForOTP}
                  loadingPosition="center"
                  sx={{
                    border: 'none',
                    marginBottom: '4rem',
                    marginLeft: '10rem',
                    textDecoration: 'underline',
                    textTransform: 'none',
                    fontSize: '1.2rem',
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
                  endIcon={<KeyboardDoubleArrowRightIcon />}
                  disabled={false}
                >
                  Submit
                </LoadingButton>
              </div>
            </Box>
          </Grid>
          <Grid
            item
            xs={false}
            sm={4}
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
