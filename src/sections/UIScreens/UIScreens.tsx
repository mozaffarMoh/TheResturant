import React from 'react';
import Slider from 'react-slick';
import {
  Box,
  Container,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';
import Image from 'next/image';
import { useTheme } from '@mui/material/styles';
import './UIScreens.css';
import {
  tree1Image,
  uiScreen1,
  uiScreen2,
  uiScreen3,
  uiScreen4,
  uiScreen5,
} from '@/constant/images';
import { ArrowCircleLeftSVG, ArrowCircleRightSVG } from '../../../assets/icons';

const images = [uiScreen1, uiScreen2, uiScreen3, uiScreen4, uiScreen5];

const UIScreens = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isScreen500 = useMediaQuery('(max-width:500px)');
  const isScreen900 = useMediaQuery('(max-width:900px)');
  const centerIndex = Math.floor(images.length / 2);
  const [activeIndex, setActiveIndex] = React.useState(centerIndex);

  const handleAfterChange = (current: any) => {
    setActiveIndex(current + 1);
  };

  const CustomNextArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: 'block', right: '20%', zIndex: 1 }}
        onClick={onClick}
      >
        <ArrowCircleRightSVG />
      </div>
    );
  };

  const CustomPrevArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: 'block', left: '20%', zIndex: 1 }}
        onClick={onClick}
      >
        <ArrowCircleLeftSVG />
      </div>
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5, // Show 3 slides
    slidesToScroll: 1,
    centerMode: true, // Enable center mode
    centerPadding: '0', // Center without padding
    nextArrow: <CustomNextArrow />, // Use your custom arrow component
    prevArrow: <CustomPrevArrow />, // Use your custom arrow component
    initialSlide: 3,
    beforeChange: (oldIndex: any, newIndex: any) => setActiveIndex(newIndex),
    afterChange: handleAfterChange,
    responsive: [
      {
        breakpoint: 1100, // For tablet screens
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 900, // For tablet screens
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 720, // For mobile screens
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 500, // For mobile screens
        settings: {
          slidesToShow: 1,
          centerMode: true, // Enable centering mode
          centerPadding: '0px', // Center slide without padding
        },
      },
    ],
  };
  return (
    <Box position={'relative'}>
      <Box
        position={'absolute'}
        top={isScreen900 ? -120 :-350}
        right={0}
      >
        <Image
          src={tree1Image}
          alt="tree-1"
          width={isScreen900 ? 100 : 250}
          height={isScreen900 ? 150 :400}
        />
      </Box>
      <Stack
        textAlign={'center'}
        marginTop={10}
      >
        <Typography
          variant="h3"
          fontWeight={600}
        >
          UI screens
        </Typography>
      </Stack>
      <Stack
        className="ui-screens"
        paddingY={10}
      >
        <Container>
          <Slider {...settings}>
            {images.map((image, index) => {
              return (
                <Box
                  key={index}
                  marginTop={10}
                  sx={{ textAlign: 'center' }}
                  className={`slide ${index === activeIndex ? 'center-slide' : ''}`} // Apply custom class to center slide
                >
                  <Image
                    src={image}
                    alt={`slide-${index}`}
                    width={isSmallScreen ? 250 : 250} // Dynamic sizing
                    height={isSmallScreen ? 500 : 500}
                    className={`slider-image ${index === activeIndex ? 'active-image' : ''}`} // Conditional class for active image
                  />
                </Box>
              );
            })}
          </Slider>
        </Container>
      </Stack>
    </Box>
  );
};

export default UIScreens;
