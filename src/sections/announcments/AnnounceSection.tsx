import AnnounceCard from '@/components/cards/announcements/AnnounceCard';
import CarouselElement from '@/components/carousel/CarouselElement';
import AnnounceModal from '@/components/modals/announceModal';
import { primaryColor } from '@/constant/color';
import { announceImage } from '@/constant/images';
import { Box, Container, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

const items = [
  {
    id: 0,
    title: 'What is growth hacking and how to apply ',
    description:
      ' The room is designed to provide sufficient space for attendees, with the necessary privacy considerations.',
    image: announceImage,
  },
  {
    id: 1,
    title: 'What is growth hacking and how to apply ',
    description:
      ' The room is designed to provide sufficient space for attendees, with the necessary privacy considerations.',
    image: announceImage,
  },
  {
    id: 2,
    title: 'What is growth hacking and how to apply ',
    description:
      ' The room is designed to provide sufficient space for attendees, with the necessary privacy considerations.',
    image: announceImage,
  },
];

const AnnounceSection = () => {
  const t = useTranslations();
  const [showModal, setShowModal] = useState(false);

  const handleModal = () => {
    setShowModal((prv) => !prv);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Container
      className="mt-4 "
      maxWidth="lg"
    >
      {/* Event Detail Modal when check the terms and condition it appears  */}
      <AnnounceModal
        open={showModal}
        handleClose={handleCloseModal}
      />

      <div className="sm-flex-col-col-center-center">
        <Typography
          fontFamily={'Nobile'}
          color={primaryColor}
          fontSize={25}
          marginBottom={5}
          fontWeight={600}
          className=" primary-color align-self-start"
        >
         {t('header.announcement')}
        </Typography>  

        <Box className=" w-full mb-4">
          <CarouselElement>
            {items.map((item, i) => (
              <AnnounceCard
                key={i}
                {...item}
                handleModal={handleModal}
              />
            ))}
          </CarouselElement>
        </Box>
      </div>
    </Container>
  );
};

export default AnnounceSection;
