'use client';
import { HeroSection } from '@/sections/home';
import FacilityDetailsSection from '@/sections/book-facility/FacilityDetailsSection';
import { useEffect, useState } from 'react';
import { domain, endPoints } from '@/base-api/endPoints';
import { useParams } from 'next/navigation';
import usePost from '@/custom-hooks/usePost';
import CustomSkeleton from '@/components/skeleton/CustomSkeleton';
import { Stack } from '@mui/material';

const FacilityDetailsPage = () => {
  const params = useParams();

  const body = {
    modelName: 'Item',
    filters: {
      slug: params?.id,
    },
    fields: ['id', 'title', 'slug', 'description', 'price_start_from', 'media'],
    relations: {
      itemMetaData: {
        fields: ['value'],
        relations: {
          itemMetaKey: {
            fields: ['name', 'slug', 'media'],
          },
        },
      },
      children: {
        fields: ['id'],
        relations: {
          itemTimes: {
            fields: ['from_time', 'to_time'],
          },
        },
      },
    },
  };

  const [data, loading, getData] = usePost(endPoints.DynamicFilter, body);

  let imageURL =
    data && data?.[0]?.media?.['Item/media']?.[0]?.url
      ? domain + data?.[0]?.media?.['Item/media']?.[0]?.url
      : '';

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <HeroSection
        bannerImage={imageURL}
        noText
        loading={loading}
      />
      {loading ? (
        <Stack
          gap={2}
          paddingY={10}
          direction={'row'}
          flexWrap={'wrap'}
          justifyContent={'space-evenly'}
          width={'100%'}
        >
          {' '}
          <Stack justifyContent={'flex-start'}>
            <CustomSkeleton
              width="200px"
              height="60px"
            />
            <CustomSkeleton width="300px" />
            <CustomSkeleton width="300px" />
            <CustomSkeleton width="300px" />
          </Stack>{' '}
          <Stack>
            <CustomSkeleton
              variant="rectangle"
              width="300px"
              height="300px"
              borderRadius="20px"
            />{' '}
          </Stack>
        </Stack>
      ) : (
        <FacilityDetailsSection facility={data[0] ? data[0] : []} />
      )}
    </>
  );
};

export default FacilityDetailsPage;
