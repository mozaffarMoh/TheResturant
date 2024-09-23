import React, { useState } from 'react';
import Slider from 'react-slick';
import {
  Box,
  Typography,
  Rating,
  useMediaQuery,
  Container,
  Stack,
} from '@mui/material';
import './Testimonials.css';
import { tree1Image, tree2Image } from '@/constant/images';
import Image from 'next/image';

const testimonialsData = [
  {
    rating: 3,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ultricies molestie imperdiet.',
    date: 'Feb 25, 2024',
  },
  {
    rating: 4,
    text: 'Cras rutrum vestibulum dolor, eu feugiat elit finibus a. Pellentesque vitae lacinia.',
    date: 'December 12, 2023',
  },
  {
    rating: 3,
    text: 'Donec sed odio dui. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.',
    date: 'August 10, 2024',
  },
  {
    rating: 4,
    text: 'Fusce dapibus, tellus cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet.',
    date: 'May 15, 2024',
  },
  {
    rating: 3,
    text: 'Curabitur aliquet quam id dui posuere blandit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;',
    date: 'March 02, 2024',
  },
  {
    rating: 2,
    text: 'Proin eget tortor risus. Donec sollicitudin mi sit amet erat. Vivamus in arcu cursus.',
    date: 'January 01, 2024',
  },
];

const Testimonials = () => {
  const isScreen900 = useMediaQuery('(max-width:900px)');

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    centerMode: true, // Enable center mode
    centerPadding: '0', // Center without padding
    slidesToShow: 4, // Show 3 slides
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, // Adjust breakpoint for large screens
        settings: {
          slidesToShow: 3, // Show 4 slides on large screens
          slidesToScroll: 1, // Scroll by 1 slide
        },
      },
      {
        breakpoint: 600, // Adjust breakpoint for small screens
        settings: {
          slidesToShow: 2, // Show 2 slides on small screens
        },
      },
      {
        breakpoint: 480, // Adjust breakpoint for very small screens
        settings: {
          slidesToShow: 1, // Show 1 slide on very small screens
          slidesToScroll: 1, // Scroll by 1 slide
        },
      },
    ],
  };

  return (
    <Box
      position={'relative'}
      paddingY={10}
      className="Testimonials"
    >
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
      <Container>
        <Slider {...settings}>
          {testimonialsData.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              testimonial={testimonial}
            />
          ))}
        </Slider>
      </Container>
      <Box
        position={'absolute'}
        bottom={isScreen900 ? -120 : -250}
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
    <Box className="testimonial-card">
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
    </Box>
  );
};

export default Testimonials;
