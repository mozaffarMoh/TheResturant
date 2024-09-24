'use client';
import {
  Box,
  Container,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { CashSVG, HandClickSVG, MapSVG, MessageDotsSVG } from '../../../assets/icons';
import {
  featuresBG1,
  featuresBG2,
  featuresBG3,
  featuresBG4,
} from '@/constant/images';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const FeatureCard = ({ icon, title, description, backgroundImage }: any) => {
  const isScreen450 = useMediaQuery('(max-width:450px)');
  return (
    <Stack
      width={250}
      height={250}
      position={'relative'}
      justifyContent={'center'}
    >
      <Box
        position={'absolute'}
        top={0}
        left={0}
        width={'100%'}
        height={'100%'}
      >
        <Image
          src={backgroundImage}
          fill
          alt="features-bg"
        />
      </Box>
      <Box
        sx={{
          position: 'relative', // Ensure the text is positioned relative to the container
          zIndex: 1, // Place the text above the image
          textAlign: 'center',
          paddingX: 5,
        }}
      >
        <Box mb={1}>{icon}</Box>
        <Typography
          variant={isScreen450 ? 'body1' : 'h6'}
          color={'white'}
          marginBottom={1} // Add a small margin to separate the title from the description
        >
          {title}
        </Typography>
      </Box>
    </Stack>
  );
};

const Features = () => {
  const t = useTranslations();
  return (
    <Container
      id="features"
      style={{ scrollMarginTop: '120px' }}
    >
      <Stack
        textAlign={'center'}
        marginTop={10}
      >
        <Typography
          variant="h3"
          fontWeight={600}
          marginBottom={10}
        >
          {t('header.features')}
        </Typography>
      </Stack>
      <Stack
        direction={'row'}
        flexWrap={'wrap'}
        justifyContent={'center'}
        gap={5}
      >
        <FeatureCard
          icon={<HandClickSVG />}
          backgroundImage={featuresBG1}
          title={t('subTitles.userReviews')}
        />
        <FeatureCard
          icon={<MessageDotsSVG />}
          backgroundImage={featuresBG2}
          title={t('subTitles.multiLanguageSupport')}
        />
        <FeatureCard
          icon={<MapSVG />}
          backgroundImage={featuresBG1}
          title={t('subTitles.interactiveMap')}
        />
        <FeatureCard
          icon={<CashSVG />}
          backgroundImage={featuresBG2}
          title={t('subTitles.flexibleAndSecurePayment')}
        />
      </Stack>
    </Container>
  );
};

export default Features;
