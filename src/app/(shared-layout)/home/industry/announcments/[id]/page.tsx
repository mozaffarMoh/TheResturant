'use client';

import type { NextPage } from 'next';
import jobOfferImage from '../../../../../../../public/industry/announcments/job-offer-background.png';
import headBar from '../../../../../../../public/industry/announcments/head.png';
import Image from 'next/image';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';
import InstructorImage from '../../../../../../../public/industry/announcments/instructor.png';

const JobOfferDetails: NextPage = () => {
  const isScreen1024 = useMediaQuery('(max-width:1024px)');
  const isScreen600 = useMediaQuery('(max-width:600px)');
  return (
    <>
      <Stack position={'relative'}>
        <Image
          src={jobOfferImage}
          alt={'jobOfferImage'}
          style={{ width: '100%', height: isScreen600 ? '250px' : '400px' }}
        />
        <Image
          src={headBar}
          alt={'headBar'}
          style={{
            position: 'absolute',
            bottom: '0px',
            left: '25%',
            width: '50%',
            height: '10px',
          }}
        />
      </Stack>
      <Container
        maxWidth="lg"
        className="mt-4  mb-4"
      >
        <Grid
          container
          sx={{ flexDirection: isScreen1024 ? 'column' : '' }}
          alignItems={'flex-start'}
        >
          <Grid
            item
            xs={12}
            md={12}
            lg={9}
          >
            <Stack>
              <Stack
                direction={'row'}
                justifyContent={'flex-start'}
                alignItems={'center'}
                width={'200px'}
              >
                <Image
                  src={InstructorImage}
                  alt={'InstructorImage'}
                />

                <Typography
                  variant="body1"
                  fontWeight={600}
                  className=" primary-color"
                  fontFamily={'Jost'}
                  marginLeft={1}
                >
                  Company
                </Typography>
              </Stack>
              <Box padding={1}>
                <Typography
                  variant="h6"
                  fontWeight={600}
                  className=" primary-color"
                  fontFamily={'Jost'}
                >
                  Project Manager
                </Typography>
                <Typography
                  variant="body1"
                  fontFamily={'Jost'}
                >
                  A dedicated space in an office or facility for holding
                  meetings and discussions. These rooms are typically designed
                  to provide a conducive and comfortable environment for teams
                  or individuals to interact and exchange ideas. Here is a
                  description of the meeting room <br />
                  <br />
                  A dedicated space in an office or facility for holding
                  meetings and discussions. These rooms are typically designed
                  to provide a conducive and comfortable environment for teams
                  or individuals to interact and exchange ideas. Here is a
                  description of the meeting room <br />
                  <br />
                  A dedicated space in an office or facility for holding
                  meetings and discussions. These rooms are typically designed
                  to provide a conducive and comfortable environment for teams
                  or individuals to interact and exchange ideas. Here is a
                  description of the meeting room <br />
                  <br />
                </Typography>
              </Box>
            </Stack>
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
            lg={3}
            container
            justifyContent="center"
            alignItems="center"
          >
            <Card
              variant="outlined"
              sx={{
                width: 260,
                paddingTop: '1rem',
                borderRadius: '1.1rem',
                margin: '0.2rem',
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  fontWeight={600}
                  className=" primary-color"
                  fontFamily={'Montserrat'}
                >
                  How to Apply
                </Typography>
                <Typography
                  variant="body1"
                  fontFamily={'Jost'}
                >
                  Equipped with advanced technological tools such as a display
                  screen and media player to facilitate the presentation of
                  slideshows and digital content.
                </Typography>
                <Button
                  className="general-button-primary mt-1"
                  sx={{ width: '200px' }}
                >
                  Apply Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default JobOfferDetails;
