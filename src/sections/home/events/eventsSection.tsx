import { endPoints } from '@/base-api/endPoints';
import EventCard from '@/components/cards/home-section/EventCard';
import CarouselElement from '@/components/carousel/CarouselElement';
import EventDetailsModal from '@/components/modals/event-detail-modal';
import useGet from '@/custom-hooks/useGet';
import { CircularProgress, Container } from '@mui/material';
import { useEffect, useState } from 'react';

interface IProps {
  title: string;
}

const EventsSection = ({ title }: IProps) => {
  const [showModal, setShowModal] = useState(false);
  const [currentSlug, serCurrentSlug] = useState('');
  const [data, loading, getData] = useGet(endPoints.getEvents);

  useEffect(() => {
    getData();
  }, []);
  

  const handleModal = (slug: string) => {
    serCurrentSlug(slug);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    serCurrentSlug('');
  };

  useEffect(() => {
    if (currentSlug) {
      setShowModal(true);
    }
  }, [currentSlug]);

  return (
    <Container
      className="mt-4 "
      maxWidth="lg"
    >
      {/* Event Detail Modal when check the terms and condition it appears  */}
      <EventDetailsModal
        open={showModal}
        handleClose={handleCloseModal}
        slug={currentSlug}
      />

      <div className="sm-flex-col-col-center-center">
        <p className="general-title primary-color align-self-start">{title}</p>

        {loading ? (
          <CircularProgress />
        ) : (
          <div className=" w-full mb-4">
            <CarouselElement>
              {data &&
                data.map((item: any, i: number) => (
                  <EventCard
                    key={i}
                    {...item}
                    handleModal={() => handleModal(item.slug)}
                  />
                ))}
            </CarouselElement>
          </div>
        )}
      </div>
    </Container>
  );
};

export default EventsSection;
