import { endPoints } from '@/base-api/endPoints';
import AnnounceCard from '@/components/cards/announcements/AnnounceCard';
import CarouselElement from '@/components/carousel/CarouselElement';
import AnnounceModal from '@/components/modals/announceModal';
import CustomSkeleton from '@/components/skeleton/CustomSkeleton';
import { primaryColor } from '@/constant/color';
import usePost from '@/custom-hooks/usePost';
import {
  Box,
  Container,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

const AnnounceSection = () => {
  const t = useTranslations();
  const [showModal, setShowModal] = useState(false);
  const [slug, setSlug] = useState('');

  const body = {
    modelName: 'Item',
    filters: {
      'itemType.slug': 'announcement',
    },
    fields: ['slug', 'title', 'subTitle', 'media'],
    relations: {
      place: {
        fields: ['name', 'slug'],
      },
      itemMetaData: {
        relations: {
          itemMetaKey: {
            fields: ['name', 'slug'],
          },
        },
        fields: ['value'],
      },
    },
    add_fields: {
      categories: 'first,name,category',
    },
    'with-pagination': false,
    limit: 10,
    page: 1,
  };

  const [data, loading, getData, success] = usePost(
    endPoints.DynamicFilter,
    body,
  );

  const handleShowDetails = (slugValue: string) => {
    setShowModal((prv) => !prv);
    setSlug(slugValue);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container
      className="mt-4 "
      maxWidth="lg"
    >
      {/* Event Detail Modal when check the terms and condition it appears  */}
      <AnnounceModal
        open={showModal}
        handleClose={handleCloseModal}
        slug={slug}
        setSlug={setSlug}
      />
      {data.length > 0 && (
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
            {loading ? (
              <Stack
                gap={2}
                paddingTop={10}
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
                  <CustomSkeleton width="130px" />
                  <CustomSkeleton width="230px" />
                  <CustomSkeleton width="280px" />
                  <CustomSkeleton
                    width="150px"
                    height="60px"
                  />
                </Stack>
              </Stack>
            ) : (
              <CarouselElement>
                {data &&
                  data.length > 0 &&
                  data.map((item: any, i: number) => (
                    <AnnounceCard
                      key={i}
                      item={item}
                      handleShowDetails={handleShowDetails}
                    />
                  ))}
              </CarouselElement>
            )}
          </Box>
        </div>
      )}
    </Container>
  );
};

export default AnnounceSection;
