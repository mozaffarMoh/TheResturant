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
  leftArrow,
  rightArrow,
  tree1Image,
  uiScreen1,
  uiScreen2,
  uiScreen3,
  uiScreen4,
  uiScreen5,
} from '@/constant/images';
import { usePathname } from 'next/navigation';

const images = [uiScreen1, uiScreen2, uiScreen3, uiScreen4, uiScreen5];

const UIScreens = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const pathname = usePathname();
  const isArabic = pathname.startsWith('/ar');
  const isScreen900 = useMediaQuery('(max-width:900px)');
  const centerIndex = Math.floor(images.length / 2);
  const [activeIndex, setActiveIndex] = React.useState(centerIndex);

  const handleUpdateIndex = (newIndex: any) => {
    const centerIndex = newIndex + 1;
    const updatedValue = centerIndex == images.length ? 0 : centerIndex;
    setActiveIndex(updatedValue);
  };
  const handleAfterChange = (newIndex: any) => {
    handleUpdateIndex(newIndex);
  };

  const handleBeforeChange = (oldIndex: any, newIndex: any) => {
    handleUpdateIndex(newIndex);
  };

  const CustomNextArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ right: '20%', zIndex: 1 }}
        onClick={onClick}
      >
        <Image
          src={rightArrow}
          alt="right-arrow"
          width={60}
          height={60}
        />
      </div>
    );
  };

  const CustomPrevArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ left: '20%', zIndex: 1 }}
        onClick={onClick}
      >
        <Image
          src={leftArrow}
          alt="left-arrow"
          width={60}
          height={60}
        />
      </div>
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    centerMode: true, // Enable center mode
    centerPadding: '0', // Center without padding
    nextArrow: <CustomNextArrow />, // Use your custom arrow component
    prevArrow: <CustomPrevArrow />, // Use your custom arrow component
    initialSlide: 1,
    beforeChange: handleBeforeChange,
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
    <Box
      position={'relative'}
      id="ui-screens"
      style={{ scrollMarginTop: '120px' }}
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
        paddingY={10}
        className="ui-screens"
      >
        <Container>
          <Slider {...settings}>
            {images.map((image, index) => {
              const isActive = index === activeIndex;

              return (
                <Box
                  key={index}
                  marginTop={10}
                  sx={{ textAlign: 'center' }}
                  className={`slide ${isActive ? 'active-slider' : ''}`} // Apply custom class to center slide
                >
                  <Image
                    src={image}
                    alt={`slide-${index}`}
                    width={isSmallScreen ? 250 : 250} // Dynamic sizing
                    height={isSmallScreen ? 500 : 500}
                    className={`slider-image ${isActive ? 'active-image' : ''}`}
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
