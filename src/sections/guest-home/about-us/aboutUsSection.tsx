import { Box, Container, Grid } from '@mui/material';
import styles from './about-us.module.css';
import Image from 'next/image';
import { aboutUsSectionImage } from '@/constant/images';
import {
  LampSVG,
  RocketSVG,
  TargetArrowSVG,
  TelescopeSVG,
} from '../../../../assets/icons';
import AboutUsSectionCard from '@/components/cards/about-us-section/aboutUsSectionCard';
import { useTranslations } from 'next-intl';

const AboutUsSection = () => {
  const t = useTranslations();
  const cards = [
    {
      id: 0,
      title: 'Fostering Collaboration',
      content:
        'Encouraging synergy among different entities in the technology ecosystem, includingstartups,freelancers,compaes, academia, and government',
      icon: <RocketSVG />,
    },
    {
      id: 1,
      title: 'Promoting Innovation',
      content:
        'By providing support and guidance/training, the center aims to cultivate an environment where new ideas and innovative solutions can thrive',
      icon: <LampSVG />,
    },
    {
      id: 2,
      title: ' Mission Statement',
      content:
        'A technological revolution in East amman through fostering innovation, collaboration, education, and community growth',
      icon: <TargetArrowSVG />,
    },
    {
      id: 3,
      title: 'Vision Statement',
      content:
        'Establishing a leading technological hub as a catalyst for technological advancement and social development in East amman',
      icon: <TelescopeSVG />,
    },
  ];
  return (
    <Container className="mt-4 max-w-90" id="about">
      <div className="sm-flex-col-col-center-center">
        <div className="text-align-center">
          <p className="text-xlarge-title">{t('guest-home.about-us')}</p>
          <p className="sub-text-larges opacity-75">
            With Lots of Unique Blocks, You Can Easily Build a Page <br />{' '}
            Easily without any coding
          </p>
        </div>
        <div className="mt-4 w-full ">
          <Grid
            container
            spacing={2}
          >
            <Grid
              item
              xs={12}
              md={7}
              className={styles.leftContainer}
            >
              <p className="text-xlarge-title-secondary p-0 m-0 ">
                ThePlatform
              </p>
              <p className="sub-xlarge-title">
                We Offer More Than Just A Workspace
              </p>

              <Grid
                container
                className="mt-2 "
                spacing={2}
                rowSpacing={2}
              >
                {cards.map((item) => (
                  <Grid
                    key={item.id}
                    item
                    xs={12}
                    md={5.5}
                  >
                    <AboutUsSectionCard
                      title={item.title}
                      content={item.content}
                      icon={item.icon}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              md={5}
              className={styles.rightContainer}
            >
              <Image
                fill
                src={aboutUsSectionImage}
                alt="about us Section"
              />
            </Grid>
          </Grid>
        </div>
      </div>
    </Container>
  );
};

export default AboutUsSection;
