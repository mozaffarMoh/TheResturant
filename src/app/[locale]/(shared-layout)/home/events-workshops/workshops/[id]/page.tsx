'use client';

import type { NextPage } from 'next';
import { HeroSection } from '@/sections/home';
import WorkShopDetailsSection from '@/sections/events-workshops/workShopDetailsSection';
import useGet from '@/custom-hooks/useGet';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { domain, endPoints } from '@/base-api/endPoints';
import Loading from '@/components/Loading/Loading';

const HomePage: NextPage = () => {
  const params = useParams();
  const [data, loading, getData] = useGet(
    endPoints.showSingleItem + params?.id,
    true,
  );
  let imageURL =
    data?.media && data.media.length > 0 && data?.media[0]?.url
      ? domain + data?.media[0]?.url
      : '';

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {loading && <Loading />}
      <HeroSection
        bannerImage={imageURL}
        noText
      />
      <WorkShopDetailsSection detailsData={data} />
    </>
  );
};

export default HomePage;
