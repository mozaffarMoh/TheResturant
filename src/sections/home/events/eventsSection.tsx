import { endPoints } from '@/base-api/endPoints';
import CustomAlert from '@/components/alerts/CustomAlert';
import EventCard from '@/components/cards/home-section/EventCard';
import CarouselElement from '@/components/carousel/CarouselElement';
import EventDetailsModal from '@/components/modals/event-detail-modal';
import CustomSkeleton from '@/components/skeleton/CustomSkeleton';
import usePost from '@/custom-hooks/usePost';
import { Container, Stack } from '@mui/material';
import { useEffect, useState } from 'react';

interface IProps {
  title: string;
}

const EventsSection = ({ title }: IProps) => {
  const [showModal, setShowModal] = useState(false);
  const [currentSlug, serCurrentSlug] = useState('');
  const [successMessageReserve, setSuccessMessageReserve]: any = useState('');
  const [errorMessageReserve, setErrorMessageReserve]: any = useState('');

  const body = {
    modelName: 'Item',
    filters: {
      'itemType.slug': 'event',
    },
    fields: ['id', 'title', 'subTitle', 'slug', 'media'],
    relations: {
      place: {
        fields: ['name', 'slug'],
      },
      itemMetaData: {
        fields: ['value'],
        relations: {
          itemMetaKey: {
            fields: ['name', 'slug'],
          },
        },
      },
    },
    'with-pagination': false,
    limit: 10,
    page: 1,
  };
  const [data, loading, getData] = usePost(endPoints.DynamicFilter, body);

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
      {' '}
      <CustomAlert
        openAlert={errorMessageReserve}
        setOpenAlert={() => setErrorMessageReserve('')}
        message={errorMessageReserve}
      />
      <CustomAlert
        openAlert={Boolean(successMessageReserve)}
        setOpenAlert={() => setSuccessMessageReserve('')}
        type="success"
        message={successMessageReserve}
      />
      {/* Event Detail Modal when check the terms and condition it appears  */}
      <EventDetailsModal
        open={showModal}
        handleClose={handleCloseModal}
        slug={currentSlug}
        setSuccessMessageReserve={setSuccessMessageReserve}
        setErrorMessageReserve={setErrorMessageReserve}
      />
      <div className="sm-flex-col-col-center-center">
        <p className="general-title primary-color align-self-start">{title}</p>

        {loading ? (
          <Stack
            gap={2}
            paddingBottom={10}
            direction={'row'}
            flexWrap={'wrap'}
            justifyContent={'space-evenly'}
            width={'100%'}
          >
            {' '}
            <Stack>
              <CustomSkeleton
                variant="rectangle"
                width="280px"
                height="200px"
                borderRadius="20px"
              />{' '}
            </Stack>
            <Stack justifyContent={'center'}>
              <CustomSkeleton width="150px" />
              <CustomSkeleton width="250px" />
              <CustomSkeleton width="280px" />
              <CustomSkeleton
                width="150px"
                height="60px"
              />
            </Stack>
          </Stack>
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
