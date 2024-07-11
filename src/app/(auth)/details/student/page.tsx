'use client';
import type { NextPage } from 'next';

import { Box, Button, Grid, Paper } from '@mui/material';
import Link from 'next/link';
import { loginBgImage } from '@/constant/images';
import styles from '../../sign-in/page.module.css';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import FormField from '@/components/mui-inputs/FormField';

const WhoAreYouPage: NextPage = () => {
  const fieldsInputs = [
    {
      id: 0,
      type: 0,
      name: 'fullName',
      label: 'Full Name',
      required: true,
    },
    {
      id: 1,
      type: 0,
      name: 'phoneNumber',
      label: 'Phone Number',
      required: true,
    },
    {
      id: 2,
      type: 0,
      name: 'email',
      label: 'Email',
      required: true,
    },
    {
      id: 3,
      type: 1,
      name: 'nationality',
      label: 'Nationality',
      required: true,
      defaultValue: '',
      fieldData: [
        { label: 'Jordanian', value: 'jordanian' },
        { label: 'Syrian', value: 'syrian' },
      ],
    },
    {
      id: 4,
      type: 0,
      name: 'nationalNumber ',
      label: 'National/Personal Number ',
      required: true,
    },
    {
      id: 5,
      type: 1,
      name: 'gender',
      label: 'Gender',
      required: true,
      defaultValue: '',
      fieldData: [
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
      ],
    },
    {
      id: 6,
      type: 0,
      name: 'age ',
      label: 'Age',
      required: true,
    },
    {
      id: 7,
      type: 1,
      name: 'educationalQualification',
      label: 'Educational Qualification',
      required: true,
      defaultValue: '',
      fieldData: [
        { label: 'High School', value: 'high-school' },
        { label: 'University Student', value: 'university-student' },
        { label: 'Bachelor', value: 'bachelor' },
      ],
    },
  ];
  // const fieldsStudentForm = fieldsInputs.map((item) => item.name);

  const {
    register: registerStudent,
    handleSubmit: handleStudentSubmit,
    formState: { errors: addStudentErrors },
    clearErrors: clearStudentErrors,
    setError: setStudentError,
    reset,
    control,
    watch,
    setValue,
  } = useForm();

  return (
    <div className={styles.signInContainer}>
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
                  <span className="fc-secondary">Student</span> Details!
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
                  />
                ))}
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
                <Link href={'/who-are-you'}>
                  <Button
                    variant="outlined"
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
                    }}
                    endIcon={<KeyboardDoubleArrowRightIcon />}
                  >
                    Submit
                  </Button>
                </Link>
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

export default WhoAreYouPage;
