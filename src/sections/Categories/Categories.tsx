'use client';

import {
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';
import Image from 'next/image';
import { useTheme } from '@mui/material/styles';
import { circleCoverRight, uiScreen1 } from '@/constant/images';
import { secondaryColor } from '@/constant/color';
import { BlankSVG, BookSVG, BrushSVG } from '../../../assets/icons';
import { useState } from 'react';

const Categories = ({ order }: any) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  const options = [
    [
      {
        title: 'Category Section',
        description:
          'Helps users find chalets and resorts by specific themes or preferences.',
        icon: <BrushSVG />,
      },
      {
        title: 'Themes Include',
        description:
          'Helps users find chalets and resorts by specific themes or preferences.',

        icon: <BookSVG />,
      },
      {
        title: 'Efficient Booking',
        description:
          'Helps users find chalets and resorts by specific themes or preferences.',
        icon: <BlankSVG />,
      },
    ],
    [
      {
        title: 'Access Financials',
        description:
          'Review transaction history, earnings, and manage financial details related to bookings.',
        icon: <BrushSVG />,
      },
      {
        title: 'Communicate with Guests',
        description:
          'Review transaction history, earnings, and manage financial details related to bookings.',

        icon: <BookSVG />,
      },
      {
        title: 'Monitor Reservations',
        description:
          'Review transaction history, earnings, and manage financial details related to bookings.',
        icon: <BlankSVG />,
      },
    ],
  ];

  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handleClick = (index: number) => {
    setActiveIndex(index);
  };

  const textPartDirection = () => {
    if (!isSmallScreen) {
      return order ? 'flex-end' : '';
    } else {
      return 'center';
    }
  };

  return (
    <Box
      sx={{
        padding: isSmallScreen ? '20px' : '50px',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <Grid
        container
        display={'flex'}
        alignItems="center"
        justifyContent="center"
      >
        {/* Left side: Phone and Circle Background */}
        <Grid
          item
          xs={12}
          md={6}
          display={'flex'}
          alignItems="center"
          justifyContent="center"
          sx={{ order: !isSmallScreen ? order : 0 }}
        >
          <Box
            position="relative"
            width={350}
            height={450}
          >
            <Box
              sx={{
                position: 'absolute',
                width: isSmallScreen ? '250px' : '400px',
                height: isSmallScreen ? '250px' : '400px',
                top: isSmallScreen ? '80px' : '30px',
                left: isSmallScreen ? '45px' : '-50px',
                zIndex: 1,
              }}
            >
              <Image
                src={circleCoverRight}
                alt="Circle Background"
                layout="fill"
                objectFit="contain"
              />
            </Box>
            <Box
              sx={{
                position: 'absolute',
                top: isSmallScreen ? 50 : 0,
                left: isSmallScreen ? 85 : 0,
                zIndex: 2,
              }}
            >
              <Image
                src={uiScreen1}
                alt="Phone"
                width={isSmallScreen ? 170 : 300}
                height={isSmallScreen ? 300 : 500}
                objectFit="contain"
              />
            </Box>
          </Box>
        </Grid>

        {/* Right side: Text and Buttons */}
        <Grid
          item
          xs={12}
          md={6}
          display={'flex'}
          justifyContent={textPartDirection()}
        >
          <Stack
            spacing={3}
            alignItems={isSmallScreen ? 'center' : 'flex-start'}
          >
            <Typography
              variant="h6"
              color={secondaryColor}
              textAlign={isSmallScreen ? 'center' : 'left'}
            >
              HOSTIN
            </Typography>
            <Typography
              variant="h3"
              fontWeight="bold"
              textAlign={isSmallScreen ? 'center' : 'left'}
            >
              Category
            </Typography>
            <Typography
              variant="body1"
              textAlign={isSmallScreen ? 'center' : 'left'}
              sx={{ maxWidth: '400px' }}
            >
              The My Properties section allows property owners to manage their
              listings, track reservations, update availability, and view
              financial details—all in one place.
            </Typography>

            <Stack
              spacing={2}
              direction="column"
              alignItems={isSmallScreen ? 'center' : 'flex-start'}
            >
              {options[order].map((item, index) => {
                const isActive = activeIndex === index;
                return (
                  <Paper
                    key={index}
                    onClick={() => handleClick(index)}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      width: '100%',
                      padding: '26px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      backgroundColor: isActive ? '#FFEEDC' : '#FAFAFA',
                      border: isActive
                        ? '1px solid #FF8704'
                        : '1px solid #F2F2F2',
                      transition: 'background-color 0.3s, border 0.3s',
                    }}
                  >
                    <Stack height={isActive ? 50 : 'auto'}>{item.icon}</Stack>
                    <Stack height={isActive ? 50 : 'auto'}>
                      <Typography
                        variant="body2"
                        fontWeight="bold"
                      >
                        {item.title}
                      </Typography>
                      {isActive && (
                        <Typography variant="caption">
                          {item.description}
                        </Typography>
                      )}
                    </Stack>
                  </Paper>
                );
              })}
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Categories;
