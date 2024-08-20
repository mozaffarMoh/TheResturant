import { Container, Grid } from '@mui/material';
import styles from './partner.module.css';
import {
  DefautImage1,
  partnerImage1,
  partnerImage2,
  partnerImage3,
} from '@/constant/images';

import PartnerSectionCard from '@/components/cards/partner-section/partnerSectionCard';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { domain } from '@/base-api/endPoints';

const PartnerSection = ({ data }: any) => {
  const t = useTranslations();
  const [partnersData, setPartnersData]: any = useState({});
  const partnerCards = [
    {
      id: 0,
      content:
        'Agreement between WORLD BANK and a financial technology company',
      image: partnerImage1,
    },
    {
      id: 1,
      content:
        'Agreement between a technology company and the Ministry of Digital Economy',
      image: partnerImage2,
    },
    {
      id: 2,
      content:
        'Agreement between a technology company and youth technology & gobs',
      image: partnerImage3,
    },
  ];

  useEffect(() => {
    if (data?.children) {
      data?.children.forEach((item: any) => {
        item?.slug == 'partners' && setPartnersData(item);
      });
    }
  }, [data]);

  return (
    <Container
      className="mt-4 bg-primary-color"
      maxWidth="xl"
      id="partners"
    >
      <div className="sm-flex-col-col-center-center">
        <div className="text-align-center mt-2 ">
          <p className="text-xlarge-title-secondary">{partnersData?.key}</p>
          <p className="sub-text-larges text-white-new opacity-75">
            {partnersData?.value}
          </p>
        </div>
        <div className="mt-4 lg-flex-row-col-center-center mb-4 gap3">
          {partnersData?.children &&
            partnersData.children.map((item: any) => {
              let imageURL = item?.media?.[0]?.url
                ? domain + item?.media[0]?.url
                : DefautImage1;
              return (
                <PartnerSectionCard
                  key={item.id}
                  content={item.key}
                  image={imageURL}
                />
              );
            })}
        </div>
      </div>
    </Container>
  );
};

export default PartnerSection;
