'use client';
import type { NextPage } from 'next';

import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Button, Grid, Paper } from '@mui/material';
import Link from 'next/link';
import { loginBgImage } from '@/constant/images';
import styles from '../../sign-in/page.module.css';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import FormField from '@/components/mui-inputs/FormField';
import { fieldsInputs } from './entrepreneur-inputs-data';
import { zodResolver } from '@hookform/resolvers/zod';
import entrepreneurSchema from './schema';
import { useEffect, useRef, useState } from 'react';
import SuccessRegisterModal from '@/components/modals/success-register-modal';
import CustomMultiFiles from '@/components/inputs/general-mullti-files';

const EntrepreneurDetailsPage: NextPage = () => {
  const [showSuccessModal, setSuccessModal] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const {
    register: registerStudent,
    handleSubmit: handleMentorSubmit,
    formState: { errors: addMentorErrors, isValid },
    clearErrors: clearStudentErrors,
    setError: setMentorError,
    reset,
    control,
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(entrepreneurSchema),
    mode: 'all',
  });

  const onSubmit = async (data: any) => {
    setLoadingSubmit(true);
    const formdata = new FormData();

    formdata.append('email', data?.email);
    formdata.append('password', localStorage.getItem('password') as string);
    formdata.append('user_type', 'entrepreneur');
    formdata.append('full_name', data?.full_name);
    formdata.append('phone_number', data.phone_number);
    formdata.append('national_number', data?.national_number);
    formdata.append('nationality', data?.nationality);

    formdata.append('gender', data?.gender);
    formdata.append('age', data?.age);
    formdata.append(
      'educational_qualification',
      data?.educational_qualification,
    );
    formdata.append('governorate', data?.governorate);
    formdata.append('linkedin_link', data?.linkedin_link);
    formdata.append('portfolio_link', data?.website_portfolio);
    formdata.append('social_media_links', data?.social_media_links);
    formdata.append('current_company', data?.current_company);
    formdata.append('years_experience', data?.years_experience);
    formdata.append('areas_of_expertise', data?.areas_of_expertise);
    formdata.append(
      'is_interested_providing_mentorship',
      data?.is_interested_providing_mentorship === true ? '1' : '0',
    );

    // Append file inputs to formdata
    if (files) {
      files.map((file: File) => {
        formdata.append('professional_certifications', file);
      });
    }
    const requestOptions = {
      method: 'POST',
      body: formdata,
    };

    fetch('https://techubapi.merwas.org/api/register', requestOptions)
      .then((res) => {
        if (!res.ok) {
          return res.json().then((result) => {
            // Setting the errors from the server in react-hook-form
            Object.keys(result.msg).forEach((field) => {
              setMentorError(field, {
                type: 'server',
                message: result.msg[field][0], // Assuming the message is an array and we take the first one
              });
            });
          });
        } else {
          return res.json();
        }
      })
      .then((result) => {
        // in success state
        if (result.status === 200) {
          setSuccessModal(true);
          localStorage.removeItem('password');
          localStorage.removeItem('email');
          setLoadingSubmit(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setLoadingSubmit(false);
      });
  };

  useEffect(() => {
    setValue('email', localStorage.getItem('email'));
  }, []);
  // console.log(files);

  return (
    <div className={styles.signInContainer}>
      {/* Success Modal when user Success register */}
      <SuccessRegisterModal open={showSuccessModal} />
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
                <p className=" text-large-title m-1">
                  <span className="fc-secondary">Entrepreneur</span> Details!
                </p>
              </div>
              <div className="sm-flex-col-col-center scrollable-container  ">
                {fieldsInputs.map((item) => (
                  <FormField
                    key={item.id}
                    name={item.name}
                    label={item.label}
                    control={control}
                    type={item.type}
                    required={false}
                    fieldData={item.fieldData}
                    defaultValue={item.defaultValue}
                    apiErrors={addMentorErrors[item.name]?.message}
                  />
                ))}
                <CustomMultiFiles
                  name={'professional_certifications'}
                  control={control}
                  label={'Professional Certifications(required)'}
                  setFiles={setFiles}
                />
              </div>
              <div className=" sm-flex-row-row-center-between  w-full mt-2 ">
                <Link href={'/who-are-you'}>
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
                  onClick={handleMentorSubmit(onSubmit)}
                  loading={loadingSubmit}
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
                  disabled={!isValid || files?.length === 0}
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
      {/* <DevTool control={control} /> */}
    </div>
  );
};

export default EntrepreneurDetailsPage;
