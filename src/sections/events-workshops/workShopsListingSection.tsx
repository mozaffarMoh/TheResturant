import { Container, Stack } from '@mui/material';
import GridFlex from '@mui/material/Unstable_Grid2';
import WorkShopCard from '@/components/cards/events-workshops/WorkShopCard';
import { useTranslations } from 'next-intl';
import { endPoints } from '@/base-api/endPoints';
import { useEffect, useState } from 'react';
import CardSkeleton from '@/components/skeleton/cardSkeleton';
import NoData from '@/components/NoData/NoData';
import usePost from '@/custom-hooks/usePost';
import { LoadingButton } from '@mui/lab';

const WorkShopsListingSection = () => {
  const t = useTranslations();
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [filteredData, setFilteredData]: any = useState([]);

  const body = {
    modelName: 'Item',
    filters: {
      'itemType.slug': 'workshop',
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
    'with-pagination': true,
    limit: 9,
    page: page,
  };
  const [data, loading, getData, success, , , , fullData] = usePost(
    endPoints.DynamicFilter,
    body,
  );

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (success) {
      setFilteredData((prevArray: any) => {
        const newArray = [...prevArray];
        newArray.push(...data);
        return newArray;
      });
    }
  }, [success]);

  useEffect(() => {
    page > 1 && getData();
  }, [page]);

  useEffect(() => {
    if (success) {
      let totalNum = fullData?.meta?.total || 0;
      setTotal(totalNum);
    }
  }, [success]);

  return (
    <Container
      maxWidth="lg"
      className="mt-3"
    >
      <div id="workshops">
        <p className="general-title primary-color"> {t('header.workshops')}</p>
        <Stack
          direction={'row'}
          justifyContent={'space-evenly'}
          alignContent={'center'}
          flexWrap={'wrap'}
          paddingY={5}
          gap={2}
        >
          {loading && filteredData.length == 0 ? (
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
            filteredData &&
            filteredData.map((item: any, i: number) => {
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
                    itemMetaData={item?.itemMetaData}
                    place={item?.place}
                  />
                </GridFlex>
              );
            })
          )}
          {filteredData?.length == 0 && success && <NoData />}
        </Stack>
      </div>
      {filteredData.length < total && (
        <Stack alignItems={'center'}>
          <LoadingButton
            onClick={() => setPage((prev) => prev + 1)}
            loading={loading}
            variant="contained"
            color="inherit"
            sx={{
              width: '200px',
              height: '40px',
              background: 'white',
              borderRadius: '50px',
              margin: '20px',
            }}
          >
            {t('buttons.load-more')}
          </LoadingButton>
        </Stack>
      )}
    </Container>
  );
};

export default WorkShopsListingSection;
