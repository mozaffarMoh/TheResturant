'use client';
import EventCard from '@/components/cards/home-section/EventCard';
import {
  eventBgImage,
  mentorImage1,
  mentorImage2,
  mentorImage3,
  mentorImage4,
  mentorImage5,
  mentorImage6,
} from '@/constant/images';
import { Avatar, Container, Grid, Paper } from '@mui/material';
import MentorListItem from './mentorListItem';
import { generalBgColor } from '@/constant/color';
import Head from 'next/head';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const MentorsSection = () => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 4,
    initialSlide: 0,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 2,
          arrows: false,
        },
      },
      {
        breakpoint: 375,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: false,
          // dots: false,
        },
      },
    ],
  };
  const items = [
    { id: 0, name: 'Avatar 1', image: mentorImage1, position: 'Developer' },
    { id: 1, name: 'Avatar 2', image: mentorImage2, position: 'Developer' },
    { id: 2, name: 'Avatar 2', image: mentorImage6, position: 'Developer' },
    { id: 3, name: 'Avatar 6', image: mentorImage3, position: 'Developer' },
    { id: 4, name: 'Avatar 7', image: mentorImage4, position: 'Developer' },

    { id: 3, name: 'Avatar 6', image: mentorImage3, position: 'Developer' },
    { id: 4, name: 'Avatar 7', image: mentorImage4, position: 'Developer' },
    { id: 5, name: 'Avatar 8', image: mentorImage5, position: 'Developer' },
    { id: 1, name: 'Avatar 2', image: mentorImage2, position: 'Developer' },
    { id: 2, name: 'Avatar 2', image: mentorImage6, position: 'Developer' },

    { id: 7, name: 'Avatar 1', image: mentorImage1, position: 'Developer' },
    { id: 8, name: 'Avatar 2', image: mentorImage2, position: 'Developer' },
    { id: 9, name: 'Avatar 2', image: mentorImage6, position: 'Developer' },
    { id: 10, name: 'Avatar 6', image: mentorImage3, position: 'Developer' },
    { id: 11, name: 'Avatar 7', image: mentorImage4, position: 'Developer' },
  ];
  return (
    <Container
      className="mt-4 bg-white  "
      maxWidth="lg"
    >
      <div className="sm-flex-col-col-center-center">
        <p className="general-title primary-color ">Mentors</p>
        <div className=" w-full mb-4 ">
          <Slider {...settings}>
            {items.map((item, i) => (
              <MentorListItem
                key={i}
                item={item}
              />
            ))}
          </Slider>
        </div>
      </div>
    </Container>
  );
};

export default MentorsSection;
