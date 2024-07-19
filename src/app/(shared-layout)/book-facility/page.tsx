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
import React, { useState } from 'react';

const BookFacilityPage: NextPage = () => {
  const [category, setCategory] = useState<Number>(0);
  const [location, setLocation] = useState<Number>(0);

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

  return (
    <>
      <Container maxWidth="lg">
        <GridFlex
          container
          display="flex"
          justifyContent="center"
          alignItems="center"
          className="mt-4"
          flexDirection="column"
        >
          <p className="general-title primary-color">Book Facility</p>
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              underline="hover"
              color="inherit"
              href="/home"
            >
              Home
            </Link>
            <Link
              underline="hover"
              color="inherit"
              href="/events-workshops"
            >
              Book Facility
            </Link>
          </Breadcrumbs>
        </GridFlex>
      </Container>

      <Container maxWidth="lg">
        <Grid
          container
          justifyContent="end"
          alignItems="center"
          className="mt-2"
          gap={{
            xs: 1,
            sm: 3
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
              Category
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
                  All
                </MenuItem>
                <MenuItem value={10}>Option 1</MenuItem>
                <MenuItem value={20}>Option 2</MenuItem>
                <MenuItem value={30}>Option 3</MenuItem>
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
              Location
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
                  All
                </MenuItem>
                <MenuItem value={10}>Option 1</MenuItem>
                <MenuItem value={20}>Option 2</MenuItem>
                <MenuItem value={30}>Option 3</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>
      </Container>

      <FacilityListingSection />
    </>
  );
};

export default BookFacilityPage;
