import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import sortIcon from '../../../assets/icons/sort.png';
import jobOfferImage from '../../../public/industry/announcments/job-offer.png';
import InstructorImage from '../../../public/industry/announcments/instructor.png';
import { primaryColor } from '@/constant/color';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';
import Cookies from 'js-cookie';
import { useTranslations } from 'next-intl';

const JobOfferingSection = () => {
  const t = useTranslations();
  const langCookie = Cookies.get('NEXT_LOCALE') || 'en';
  const isRTL = langCookie == 'ar';
  const [sortItems, setSortItems] = useState<Number>(0);
  const router = useRouter();
  const sortHandleChange = (event: React.ChangeEvent<{ value: Number }>) => {
    setSortItems(event.target.value as Number);
  };
  return (
    <Container
      maxWidth="lg"
      sx={{ padding: '100px 0px' }}
    >
      <Stack
        direction={'row'}
        justifyContent={'space-between'}
        marginBottom={5}
      >
        <Typography
          fontFamily={'Nobile'}
          color={primaryColor}
          fontSize={25}
          fontWeight={600}
        >
          {t('header.jobOffer')}
        </Typography>

        <Stack
          flexDirection={'row'}
          alignItems={'center'}
        >
          <InputLabel
            id="dropdown-sort"
            sx={{
              whiteSpace: 'nowrap',
              overflow: 'visible',
              textOverflow: 'clip',
              width: 'auto',
            }}
          >
            <Image
              src={sortIcon}
              alt={'sortIcon'}
              style={{ marginTop: '5px' }}
            />
          </InputLabel>
          <FormControl
            variant="outlined"
            style={{ marginLeft: 5, minWidth: 150 }}
          >
            <Select
              labelId="dropdown-sort"
              value={sortItems}
              onChange={sortHandleChange as any}
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
                  width: '340px',
                  padding: '10px',
                  margin: '10px',
                  cursor: 'pointer',
                  position: 'relative',
                }}
                onClick={() =>
                  router.push(`/${langCookie}/home/industry/announcements/id`)
                }
              >
                <Image
                  src={jobOfferImage}
                  alt={'jobOfferImage'}
                  style={{ width: '100%' }}
                />

                <Image
                  src={InstructorImage}
                  alt={'InstructorImage'}
                  style={{
                    position: 'absolute',
                    borderRadius: '50%',
                    right: `${!isRTL ? '20px' : ''}`,
                    left: `${isRTL ? '20px' : ''}`,
                    bottom: '100px',
                  }}
                />

                <CardContent>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Company
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="h5"
                    fontFamily={'Jost'}
                    fontWeight={600}
                    color={'#2F2D51'}
                  >
                    Project Manager
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Discover Law - Get into the best UK law schools
                  </Typography>
                </CardContent>
              </Card>
            );
          })}
        <Button
          variant="contained"
          color="inherit"
          sx={{
            width: '200px',
            height: '40px',
            background: 'white',
            borderRadius: '50px',
            margin: '20px',
          }}
        >
          <CircularProgress size={20} />
          <Typography
            fontFamily={'Jost'}
            color={primaryColor}
            marginLeft={1}
          >
            {t('buttons.load-more')}
          </Typography>
        </Button>
      </Stack>
    </Container>
  );
};

export default JobOfferingSection;
