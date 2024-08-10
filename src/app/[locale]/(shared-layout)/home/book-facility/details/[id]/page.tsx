'use client';
import { HeroSection } from '@/sections/home';
import FacilityDetailsSection from '@/sections/book-facility/FacilityDetailsSection';
import { useEffect } from 'react';
import { domain, endPoints } from '@/base-api/endPoints';
import useGet from '@/custom-hooks/useGet';
import { useParams } from 'next/navigation';
import Loading from '@/components/Loading/Loading';

const FacilityDetailsPage = () => {
  const params = useParams();
  const [data, loading, getData, success] = useGet(
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

      <FacilityDetailsSection facility={data} />
    </>
  );
};

export default FacilityDetailsPage;
