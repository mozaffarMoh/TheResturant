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
import { circleCoverRight, uiScreen4, uiScreen5 } from '@/constant/images';
import { secondaryColor } from '@/constant/color';
import { BlankSVG, BookSVG, BrushSVG } from '../../../assets/icons';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

const Categories = ({ order }: any) => {
  const t = useTranslations();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  const options = [
    [
      {
        title: t('categories.title1-1'),
        description: t('categories.subTitle1-1'),
        icon: <BrushSVG />,
      },
      {
        title: t('categories.title1-2'),
        description: t('categories.subTitle1-2'),
        icon: <BookSVG />,
      },
      {
        title: t('categories.title1-3'),
        description: t('categories.subTitle1-3'),
        icon: <BlankSVG />,
      },
    ],
    [
      {
        title: t('categories.title2-1'),
        description: t('categories.subTitle2-1'),
        icon: <BrushSVG />,
      },
      {
        title: t('categories.title2-2'),
        description: t('categories.subTitle2-2'),
        icon: <BookSVG />,
      },
      {
        title: t('categories.title2-3'),
        description: t('categories.subTitle2-3'),
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
                src={order == 0 ? uiScreen5 : uiScreen4}
                alt="Phone"
                width={isSmallScreen ? 170 : 280}
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
              {order == 0 ? t('categories.label1') : t('categories.label2')}
            </Typography>
            <Typography
              variant="body1"
              textAlign={isSmallScreen ? 'center' : 'start'}
              sx={{ maxWidth: '400px' }}
            >
              {order == 0 ? t('categories.desc1') : t('categories.desc2')}
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
                    <Stack
                      direction={'row'}
                      gap={1}
                      height={'auto'}
                    >
                      <Stack>{item.icon}</Stack>
                      <Stack>
                        <Typography
                          variant="body2"
                          fontWeight="bold"
                        >
                          {item.title}
                        </Typography>

                        <Typography variant="caption">
                          {item.description}
                        </Typography>
                      </Stack>
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
