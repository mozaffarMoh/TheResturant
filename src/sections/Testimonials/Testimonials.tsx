import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Box, Typography, Rating } from '@mui/material';

const testimonialsData = [
  {
    rating: 5,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ultricies molestie imperdiet. Cras rutrum vestibulum dolor, eu feugiat elit finibus a. Pellentesque vitae lacinia.',
    date: 'Feb 25, 2024',
  },
  {
    rating: 4,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ultricies molestie imperdiet. Cras rutrum vestibulum dolor, eu feugiat elit finibus a.',
    date: 'December 12, 2023',
  },
  // Add more testimonials here
];

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    afterChange: (currentSlide:any) => setCurrentSlide(currentSlide),
  };

  return (
    <div>
      <Slider {...settings}>
        {testimonialsData.map((testimonial, index) => (
          <TestimonialCard key={index} testimonial={testimonial} />
        ))}
      </Slider>
      <div className="slider-dots">
        {testimonialsData.map((_, index) => (
          <div
            key={index}
            className={`slider-dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

const TestimonialCard = ({ testimonial }:any) => {
  return (
    <Box className="testimonial-card">
      <Rating name="read-only" value={testimonial.rating} readOnly />
      <Typography variant="body2">{testimonial.text}</Typography>
      <Typography variant="caption">{testimonial.date}</Typography>
    </Box>
  );
};

export default Testimonials;