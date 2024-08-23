import { CircularProgress, Container, Stack } from '@mui/material';
import GridFlex from '@mui/material/Unstable_Grid2';
import WorkShopCard from '@/components/cards/events-workshops/WorkShopCard';
import { useTranslations } from 'next-intl';
import useGet from '@/custom-hooks/useGet';
import { endPoints } from '@/base-api/endPoints';
import { useEffect } from 'react';
import CardSkeleton from '@/components/skeleton/cardSkeleton';

const WorkShopsListingSection = () => {
  const t = useTranslations();
  const [data, loading, getData] = useGet(endPoints.getWorkshop);

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container
      maxWidth="lg"
      className="mt-3"
    >
      <div id="workshops">
        <p className="general-title primary-color"> {t('header.workshops')}</p>
        <GridFlex
          container
          rowGap={2}
          display="flex"
          justifyContent="center"
          alignItems="center"
          paddingY={5}
        >
          {loading ? (
            <Stack
              gap={2}
              direction={'row'}
              flexWrap={'wrap'}
              justifyContent={'center'}
            >
              <CardSkeleton />
              <CardSkeleton />
            </Stack>
          ) : (
            data &&
            data.map((item: any, i: number) => {
              return (
                <GridFlex
                  key={i}
                  md={4}
                  lg={4}
                >
                  <WorkShopCard
                    title={item?.title}
                    subTitle={item?.subTitle}
                    media={item?.media}
                    slug={item?.slug}
                    metadata={item?.metadata}
                    place={item?.place}
                  />
                </GridFlex>
              );
            })
          )}
        </GridFlex>
      </div>
    </Container>
  );
};

export default WorkShopsListingSection;
