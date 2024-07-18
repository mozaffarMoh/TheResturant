import EventCard from '@/components/cards/home-section/EventCard';
import CarouselElement from '@/components/carousel/CarouselElement';
import { eventBgImage } from '@/constant/images';
import { Container } from '@mui/material';

const EventsSection = () => {
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
  return (
    <Container
      className="mt-4 "
      maxWidth="lg"
    >
      <div className="sm-flex-col-col-center-center">
        <p className="general-title primary-color align-self-start">Events</p>

        <div className=" w-full mb-4">
          <CarouselElement>
            {items.map((item, i) => (
              <EventCard
                key={i}
                {...item}
              />
            ))}
          </CarouselElement>
        </div>
      </div>
    </Container>
  );
};

export default EventsSection;
