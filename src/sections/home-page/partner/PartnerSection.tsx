import { Container, Grid } from '@mui/material';
import styles from './partner.module.css';
import Image from 'next/image';
import {
  aboutUsSectionImage,
  partnerImage1,
  partnerImage2,
  partnerImage3,
} from '@/constant/images';
import {
  LampSVG,
  RocketSVG,
  TargetArrowSVG,
  TelescopeSVG,
} from '../../../../assets/icons';
import AboutUsSectionCard from '@/components/cards/about-us-section/aboutUsSectionCard';
import PartnerSectionCard from '@/components/cards/partner-section/partnerSectionCard';

const PartnerSection = () => {
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
  return (
    <Container
      className="mt-4 bg-primary-color "
      maxWidth="xl"
    >
      <div className="sm-flex-col-col-center-center">
        <div className="text-align-center mt-2">
          <p className="text-xlarge-title-secondary">Partners</p>
          <p className="sub-text-larges text-white-new opacity-75">
            With Lots of Unique Blocks, You Can Easily Build a Page <br />{' '}
            Easily without any coding
          </p>
        </div>
        <div className="mt-4 sm-flex-row-col-center-center mb-4 gap3">
          {partnerCards.map((item) => (
            <PartnerSectionCard
              key={item.id}
              content={item.content}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default PartnerSection;
