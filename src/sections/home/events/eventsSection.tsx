import EventCard from '@/components/cards/home-section/EventCard';
import CarouselElement from '@/components/carousel/CarouselElement';
import EventDetailsModal from '@/components/modals/event-detail-modal';
import { eventBgImage } from '@/constant/images';
import { Container } from '@mui/material';
import { useState } from 'react';

interface IProps {
  title: string;
}
const items = [
  {
    id: 0,
    title: 'What is growth hacking and how to apply ',
    description:
      ' The room is designed to provide sufficient space for attendees, with the necessary privacy considerations.',
    image: eventBgImage,
  },
  {
    id: 1,
    title: 'What is growth hacking and how to apply ',
    description:
      ' The room is designed to provide sufficient space for attendees, with the necessary privacy considerations.',
    image: eventBgImage,
  },
  {
    id: 2,
    title: 'What is growth hacking and how to apply ',
    description:
      ' The room is designed to provide sufficient space for attendees, with the necessary privacy considerations.',
    image: eventBgImage,
  },
];

const EventsSection = ({ title }: IProps) => {
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
      <EventDetailsModal
        open={showModal}
        handleClose={handleCloseModal}
      />

      <div className="sm-flex-col-col-center-center">
        <p className="general-title primary-color align-self-start">{title}</p>

        <div className=" w-full mb-4">
          <CarouselElement>
            {items.map((item, i) => (
              <EventCard
                key={i}
                {...item}
                handleModal={handleModal}
              />
            ))}
          </CarouselElement>
        </div>
      </div>
    </Container>
  );
};

export default EventsSection;
