'use client';

import type { NextPage } from 'next';
import styles from './page.module.css';
import { HeroSection } from '@/sections/home';
import { workShopBanner } from '@/constant/images';

import FacilityDetailsSection from '@/sections/book-facility/FacilityDetailsSection';
import { useEffect,useState } from 'react';



const FacilityDetailsPage = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const [facility, setFacility] = useState<any>({});
  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');
    myHeaders.append(
      'Authorization',
      'Bearer ' + localStorage.getItem('techhubtoken'),
    );

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(
      'https://tempcms.theplatformjo.com/api/facility/' + id,
      requestOptions as any,
    )
      .then((res) => {
        return res.json();
      })
      .then((result) => {
      
        if(result.status != 200){
          //redirect to 404 page
          window.location.href = '/book-facility';
        }
        setFacility(result.data);
      })
      .catch((error) => {
        //console.log(error);
      });
  }, []);

  return (
    <>
      <HeroSection
        bannerImage={workShopBanner}
        noText
      />
      <FacilityDetailsSection facility={facility} />
    </>
  );
};

export default FacilityDetailsPage;
