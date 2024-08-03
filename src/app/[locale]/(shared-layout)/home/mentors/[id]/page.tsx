'use client';
import type { NextPage } from 'next';
import styles from './page.module.css';
import GridFlex from '@mui/material/Unstable_Grid2';
import {
  Button,
  Container,
  Paper,
  Stack,
  styled,
  Typography,
} from '@mui/material';
import mentorImage from '../../../../../../../public/mentors/mentor.png';
import Image from 'next/image';
import {
  FaceBookSVG,
  InstagramSVG,
  LinkedInSVG,
  TwitterSVG,
} from '../../../../../../../assets/icons';
import { primaryColor } from '@/constant/color';
import { useTranslations } from 'next-intl';
const MentorDetails: NextPage = () => {
  const t = useTranslations();
  return (
    <Stack
      direction={'column'}
      alignItems={'center'}
      paddingBottom={10}
    >
      <Container maxWidth="lg">
        <GridFlex
          container
          display="flex"
          justifyContent="center"
          alignItems="center"
          className="mt-4"
          flexDirection="column"
        >
          <Stack
            alignItems={'center'}
            bgcolor={'white'}
            borderRadius={'50%'}
            padding={1}
          >
            <Image
              style={{ borderRadius: '50%' }}
              width={150}
              height={150}
              src={mentorImage}
              alt=""
            />
          </Stack>
          <Typography
            variant="h6"
            className="general-title-v2 primary-color"
            fontFamily={'Montserrat'}
          >
            Layla Ahmed
          </Typography>
          <Typography
            fontFamily={'Jost'}
            className="sub-text-large "
          >
            UI Designer
          </Typography>
        </GridFlex>

        <Stack
          direction={'row'}
          justifyContent={'center'}
          width={'100%'}
        >
          <div className={styles.socialIconContainer}>
            <FaceBookSVG />
          </div>
          <div className={styles.socialIconContainer}>
            <TwitterSVG />
          </div>
          <div className={styles.socialIconContainer}>
            <InstagramSVG />
          </div>
          <div className={styles.socialIconContainer}>
            <LinkedInSVG />
          </div>
        </Stack>

        <Stack spacing={5}>
          <Stack spacing={2}>
            <Typography
              variant="h5"
              fontWeight={600}
              color={primaryColor}
            >
              Bio
            </Typography>
            <Typography
              variant="body1"
              color={'#77838F'}
            >
              Do you want to become a UI/UX designer but you don't know where to
              start? This course will allow you to develop your user interface
              design skills and you can add UI designer to your CV and start
              getting clients for your skills.
              <br />
              <br />
              Hi everyone. I'm Arash and I'm a UI/UX designer. In this course, I
              will help you learn and master Figma app comprehensively from
              scratch. Figma is an innovative and brilliant tool for User
              Interface design. It's used by everyone from entrepreneurs and
              start-ups to Apple, Airbnb, Facebook, etc.
            </Typography>
          </Stack>
          <Button
            variant="contained"
            color="secondary"
            sx={{
              width: '200px',
              height: '50px',
              borderRadius: '50px',
              background: '#3F485E',
            }}
          >
            {t('buttons.request')}
          </Button>
        </Stack>
      </Container>
    </Stack>
  );
};

export default MentorDetails;
