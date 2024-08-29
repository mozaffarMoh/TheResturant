'use client';

import type { NextPage } from 'next';
import { HeroSection } from '@/sections/home';
import WorkShopDetailsSection from '@/sections/events-workshops/workShopDetailsSection';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { domain, endPoints } from '@/base-api/endPoints';
import { DefautImage1Large } from '@/constant/images';
import { Stack } from '@mui/material';
import CustomSkeleton from '@/components/skeleton/CustomSkeleton';
import usePost from '@/custom-hooks/usePost';
import Cookies from 'js-cookie';

const HomePage: NextPage = () => {
  const params = useParams();
  const token = Cookies.get('token') || '';
  const [isClientSide, setIsClientSide] = useState(false);
  const body = {
    modelName: 'Item',
    filters: {
      slug: params?.id,
    },
    fields: ['id', 'slug', 'description', 'quantity', 'media'],
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
  };

  const [data, loading, getData] = usePost(
    endPoints.DynamicFilter,
    body,
    token,
  );

  let imageURL =
    data && data?.[0]?.media?.main_image?.[0]?.url
      ? domain + data?.[0]?.media?.main_image?.[0]?.url
      : DefautImage1Large;

  useEffect(() => {
    getData();
    setIsClientSide(true);
  }, []);

  return (
    <>
      {isClientSide && (
        <head>
          <title>The Platform | Workshop Details</title>
          <meta
            name="description"
            content="Welcome to the Workshop details page of The Platform Website"
          />
        </head>
      )}
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
        <WorkShopDetailsSection detailsData={data && data?.[0]} />
      )}
    </>
  );
};

export default HomePage;
