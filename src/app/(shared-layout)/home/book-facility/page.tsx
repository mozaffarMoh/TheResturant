'use client';

import type { NextPage } from 'next';
import styles from './page.module.css';

import GridFlex from '@mui/material/Unstable_Grid2';
import {
  Box,
  Breadcrumbs,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import Link from '@mui/material/Link';
import FacilityListingSection from '@/sections/book-facility/FacilityListingSection';
import React, { useEffect, useState } from 'react';
import { textSecondaryColor } from '@/constant/color';
import { useTranslations } from 'next-intl';

const BookFacilityPage: NextPage = () => {
  const t = useTranslations();
  const [category, setCategory] = useState<Number>(0);
  const [location, setLocation] = useState<Number>(0);
  const [facilityList, setFacilityList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const categoryHandleChange = (
    event: React.ChangeEvent<{ value: Number }>,
  ) => {
    setCategory(event.target.value as Number);
  };

  const locationHandleChange = (
    event: React.ChangeEvent<{ value: Number }>,
  ) => {
    setLocation(event.target.value as Number);
  };

  useEffect(() => {
    setLoading(true);
    setFacilityList([]);
    // fetchFacilityList();
    const myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');
    myHeaders.append(
      'Authorization',
      'Bearer ' + localStorage.getItem('techhubtoken'),
    );

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(
      'https://tempcms.theplatformjo.com/api/facility/category/' + category,
      requestOptions as any,
    )
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        setLoading(false);
        console.log(result);
        setFacilityList(result.data);
      })
      .catch((error) => {
        //console.log(error);
        setLoading(false);
      });
  }, [category]);

  return (
    <>
      {/* BreadCrumb Section */}
      <Container maxWidth="lg">
        <GridFlex
          container
          display="flex"
          justifyContent="center"
          alignItems="center"
          className="mt-4"
          flexDirection="column"
        >
          <p className="general-title primary-color">
            {' '}
            {t('header.book-facility')}
          </p>
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              underline="hover"
              color="inherit"
              href="/home"
            >
              {t('header.home')}
            </Link>
            <Link
              underline="hover"
              color="inherit"
              href="/home/book-facility"
            >
              <Typography color={textSecondaryColor}>
                {' '}
                {t('header.book-facility')}
              </Typography>
            </Link>
          </Breadcrumbs>
        </GridFlex>
      </Container>
      {/* Category Buttons Filter By */}
      <Container maxWidth="lg">
        <Grid
          container
          justifyContent="end"
          alignItems="center"
          className="mt-2"
          gap={{
            xs: 1,
            sm: 3,
          }}
        >
          <Box
            display="flex"
            alignItems="center"
          >
            <InputLabel
              id="dropdown-category"
              sx={{
                whiteSpace: 'nowrap',
                overflow: 'visible',
                textOverflow: 'clip',
                width: 'auto',
              }}
            >
              {t('select.category')} :
            </InputLabel>
            <FormControl
              variant="outlined"
              style={{ marginLeft: 5, minWidth: 150 }}
            >
              <Select
                labelId="dropdown-category"
                value={category}
                onChange={categoryHandleChange as any}
                sx={{
                  borderRadius: '1.5rem',
                  height: '40px',
                  '& .MuiSelect-select': {
                    padding: '8px 14px',
                  },
                }}
              >
                <MenuItem
                  value={0}
                  selected
                >
                  {t('select.all')} :
                </MenuItem>
                <MenuItem value={1}>Meeting Room</MenuItem>
                <MenuItem value={2}>Lecture Room</MenuItem>
                <MenuItem value={3}>Team Phone Booth</MenuItem>
                <MenuItem value={4}>Shared Space</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box
            display="flex"
            alignItems="center"
          >
            <InputLabel
              id="dropdown-location"
              sx={{
                whiteSpace: 'nowrap',
                overflow: 'visible',
                textOverflow: 'clip',
                width: 'auto',
              }}
            >
              {t('select.location')} : :
            </InputLabel>
            <FormControl
              variant="outlined"
              style={{ marginLeft: 5, minWidth: 150 }}
            >
              <Select
                labelId="dropdown-location"
                value={location}
                onChange={locationHandleChange as any}
                sx={{
                  borderRadius: '1.5rem',
                  height: '40px',
                  '& .MuiSelect-select': {
                    padding: '8px 14px',
                  },
                }}
              >
                <MenuItem
                  value={0}
                  selected
                >
                  {t('select.all')}
                </MenuItem>
                <MenuItem value={0}>Marka</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>
      </Container>
      {/* Facility Listing Section */}
      {loading ? (
        <Container
          maxWidth="lg"
          className="mt-1 mb-3"
        >
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            {/** indicator for loading */}
            <Typography
              variant="h4"
              className={styles.loading}
            >
              {t('messages.loading')} :
            </Typography>
          </Grid>
        </Container>
      ) : null}
      <FacilityListingSection facilityListData={facilityList} />
    </>
  );
};

export default BookFacilityPage;
