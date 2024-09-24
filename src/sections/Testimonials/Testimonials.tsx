import React from 'react';
import Slider from 'react-slick';
import {
  Box,
  Typography,
  Rating,
  useMediaQuery,
  Container,
  Stack,
  Card,
  CardContent,
  Grid,
  Pagination,
} from '@mui/material';
import './Testimonials.css';
import { tree1Image, tree2Image } from '@/constant/images';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const Testimonials = () => {
  const t = useTranslations();
  const isScreen900 = useMediaQuery('(max-width:900px)');
  const testimonialsData = [
    {
      rating: 3,
      text: t('testimonial.text1'),
      date: 'Feb 25, 2024',
    },
    {
      rating: 4,
      text: t('testimonial.text2'),
      date: 'December 12, 2023',
    },
    {
      rating: 4,
      text: t('testimonial.text3'),
      date: 'August 10, 2024',
    },
    {
      rating: 3,
      text: t('testimonial.text4'),
      date: 'May 15, 2024',
    },
  ];
  return (
    <Box
      position={'relative'}
      paddingY={10}
      className="testimonials"
      id="contact-us"
      style={{ scrollMarginTop: '120px' }}
    >
      <Stack
        alignItems={'center'}
        textAlign={'center'}
        marginBottom={5}
      >
        <Typography
          variant={'h4'}
          fontWeight={700}
        >
          {t('titles.whatOurCustomersSay')}
        </Typography>
      </Stack>
      <Box
        position={'absolute'}
        top={isScreen900 ? -120 : -350}
        right={0}
      >
        <Image
          src={tree1Image}
          alt="tree-1"
          width={isScreen900 ? 100 : 250}
          height={isScreen900 ? 150 : 400}
        />
      </Box>
      <Container className="testimonials-container">
        <Stack
          direction={'row'}
          gap={2}
          flexWrap={'wrap'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          {testimonialsData.slice(0, 4).map((testimonial, index) => (
            <TestimonialCard
              key={index}
              testimonial={testimonial}
            />
          ))}
        </Stack>
        {/*      <Stack alignItems={"center"} marginTop={4}>
          <Pagination />
        </Stack> */}
      </Container>
      <Box
        position={'absolute'}
        bottom={isScreen900 ? -230 : -250}
        left={0}
      >
        <Image
          src={tree2Image}
          alt="tree-1"
          width={isScreen900 ? 100 : 130}
          height={isScreen900 ? 150 : 400}
        />
      </Box>
    </Box>
  );
};

const TestimonialCard = ({ testimonial }: any) => {
  return (
    <Grid
      item
      xs={12}
      sm={6}
      paddingX={2}
      marginTop={4}
    >
      <Card className="testimonial-card">
        <CardContent>
          <Rating
            name="read-only"
            value={testimonial.rating}
            readOnly
            max={4}
          />
          <Stack gap={1}>
            <Typography
              variant="body2"
              fontSize={14}
              color={'black'}
            >
              {testimonial.text}
            </Typography>
            <Typography variant="caption">{testimonial.date}</Typography>
          </Stack>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Testimonials;
