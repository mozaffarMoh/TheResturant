'use client';
import type { NextPage } from 'next';
import Link from '@mui/material/Link';
import GridFlex from '@mui/material/Unstable_Grid2';
import mentorImage from '../../../../../../public/mentors/mentor.png';
import {
  Box,
  Breadcrumbs,
  Card,
  CardContent,
  CardMedia,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { textSecondaryColor } from '@/constant/color';
import { useTranslations } from 'next-intl';
import Cookies from 'js-cookie';

const MentorsPage: NextPage = () => {
  const langCookie = Cookies.get('NEXT_LOCALE') || 'en';
  const t = useTranslations();
  const isScreen600 = useMediaQuery('(max-width:600px)');
  const [profession, setProfession] = useState<Number>(0);
  const router = useRouter();
  const professionHandleChange = (
    event: React.ChangeEvent<{ value: Number }>,
  ) => {
    setProfession(event.target.value as Number);
  };

  return (
    <Stack
      direction={'column'}
      alignItems={'center'}
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
          <p className="general-title primary-color">{t('header.mentors')}</p>
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              underline="hover"
              color="inherit"
              href={`/${langCookie}/home`}
            >
              {t('header.home')}
            </Link>
            <Link
              underline="hover"
              color="inherit"
              href="#"
            >
              <Typography color={textSecondaryColor}>
                {t('header.mentors')}
              </Typography>
            </Link>
          </Breadcrumbs>
        </GridFlex>
      </Container>

      <Container maxWidth="xl">
        <Stack
          alignItems={isScreen600 ? 'center' : 'flex-end'}
          width={'94%'}
          marginTop={5}
        >
          <Stack
            flexDirection={'row'}
            alignItems={'center'}
          >
            <InputLabel
            
            style={{direction:"rtl"}}
              id="dropdown-profession"
              sx={{
                whiteSpace: 'nowrap',
                overflow: 'visible',
                textOverflow: 'clip',
                width: 'auto',
              }}
            >
              {t('select.profession')}:&nbsp;&nbsp;
            </InputLabel>
            <FormControl
              variant="outlined"
              style={{ marginLeft: 5, minWidth: 150 }}
            >
              <Select
                labelId="dropdown-profession"
                value={profession}
                onChange={professionHandleChange as any}
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
                <MenuItem value={1}>Meeting Room</MenuItem>
                <MenuItem value={2}>Lecture Room</MenuItem>
                <MenuItem value={3}>Team Phone Booth</MenuItem>
                <MenuItem value={4}>Shared Space</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Stack>
        <Stack
          margin={0}
          direction={'row'}
          flexWrap={'wrap'}
          justifyContent={'center'}
        >
          {Array(9)
            .fill('')
            .map((_, i) => {
              return (
                <Card
                  key={i}
                  sx={{
                    padding: '10px',
                    margin: '10px',
                    cursor: 'pointer',
                    width: '250px',
                  }}
                  onClick={() => router.push(`/${langCookie}/home/mentors/id`)}
                >
                  <Image
                    src={mentorImage}
                    alt={''}
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      fontFamily={'Jost'}
                      fontWeight={600}
                      color={'#2F2D51'}
                    >
                      Kristen Pala
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      User Experience Design
                    </Typography>
                  </CardContent>
                </Card>
              );
            })}
        </Stack>
      </Container>
      <Pagination
        count={3}
        color={'secondary'}
        sx={{ margin: '50px 0px 50px 0px' }}
        dir="ltr"
      />
    </Stack>
  );
};

export default MentorsPage;
