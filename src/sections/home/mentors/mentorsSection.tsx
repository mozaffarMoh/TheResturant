'use client';
import { Avatar, Container, Skeleton, Stack } from '@mui/material';
import MentorListItem from './mentorListItem';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useTranslations } from 'next-intl';
import usePost from '@/custom-hooks/usePost';
import { endPoints } from '@/base-api/endPoints';
import { useEffect } from 'react';
import CustomSkeleton from '@/components/skeleton/CustomSkeleton';

const MentorsSection = () => {
  const t = useTranslations();
  const bodyMentors = {
    modelName: 'FormSubmit',
    fields: ['slug'],
    relations: {
      user: {
        relations: {
          groups: {
            fields: ['name', 'slug'],
          },
        },
        fields: ['name', 'media'],
      },
    },
    'with-pagination': false,
    limit: 10,
    page: 1,
    filters: {
      'user.roles.name': 'Mentor',
      'form.slug': 'TPF-Register-Form',
    },
  };
  const [mentorsItems, loading, getMentorsItems] = usePost(
    endPoints.DynamicFilter,
    bodyMentors,
  );

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: Math.min(5, mentorsItems.length || 0),
    slidesToScroll: Math.min(4, mentorsItems.length || 0),
    initialSlide: 0,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(4, mentorsItems.length || 0),
          slidesToScroll: Math.min(3, mentorsItems.length || 0),
          infinite: mentorsItems.length > 4, // Loop if more than 4 items
          dots: true,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: Math.min(3, mentorsItems.length || 0),
          slidesToScroll: Math.min(3, mentorsItems.length || 0),
          initialSlide: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: Math.min(2, mentorsItems.length || 0),
          slidesToScroll: Math.min(2, mentorsItems.length || 0),
          arrows: false,
          dots: true,
        },
      },
      {
        breakpoint: 375,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          dots: true,
        },
      },
    ],
  };

  useEffect(() => {
    getMentorsItems();
  }, []);

  return (
    <Container
      className="mt-4 bg-white  "
      maxWidth="lg"
    >
      <div className="sm-flex-col-col-center-center">
        <p className="general-title primary-color ">{t('header.mentors')}</p>
        <div className=" w-full mb-4 ">
          <Slider {...settings}>
            {mentorsItems &&
              mentorsItems?.length > 0 &&
              mentorsItems.map((item: any, i: number) => (
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
