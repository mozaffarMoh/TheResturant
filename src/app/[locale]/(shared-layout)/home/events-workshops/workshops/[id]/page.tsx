'use client';

import type { NextPage } from 'next';
import { HeroSection } from '@/sections/home';
import WorkShopDetailsSection from '@/sections/events-workshops/workShopDetailsSection';
import useGet from '@/custom-hooks/useGet';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { domain, endPoints } from '@/base-api/endPoints';
import { DefautImage1Large } from '@/constant/images';
import { Stack } from '@mui/material';
import CustomSkeleton from '@/components/skeleton/CustomSkeleton';

const HomePage: NextPage = () => {
  const params = useParams();
  const [data, loading, getData] = useGet(
    endPoints.showSingleItem + params?.id,
    true,
  );

  let imageURL =
    data && data?.media?.main_image?.[0]?.url
      ? domain + data?.media?.main_image?.[0]?.url
      : DefautImage1Large;

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
        <WorkShopDetailsSection detailsData={data} />
      )}
    </>
  );
};

export default HomePage;
