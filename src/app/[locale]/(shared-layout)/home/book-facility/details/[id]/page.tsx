'use client';
import { HeroSection } from '@/sections/home';
import FacilityDetailsSection from '@/sections/book-facility/FacilityDetailsSection';
import { useEffect } from 'react';
import { domain, endPoints } from '@/base-api/endPoints';
import useGet from '@/custom-hooks/useGet';
import { useParams } from 'next/navigation';
import Loading from '@/components/Loading/Loading';
import { DefautImage1Large } from '@/constant/images';
import usePost from '@/custom-hooks/usePost';

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
    data &&
    data.length > 0 &&
    data[0].media.length > 0 &&
    data[0]?.media[0]?.url
      ? domain + data[0]?.media[0]?.url
      : DefautImage1Large;

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

      <FacilityDetailsSection facility={data[0] ? data[0] : []} />
    </>
  );
};

export default FacilityDetailsPage;
