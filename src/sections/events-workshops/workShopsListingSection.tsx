import { Container } from '@mui/material';
import GridFlex from '@mui/material/Unstable_Grid2';
import { workShopImage1 } from '@/constant/images';
import WorkShopCard from '@/components/cards/events-workshops/WorkShopCard';

const WorkShopsListingSection = () => {
  return (
    <Container
      maxWidth="lg"
      className="mt-3"
    >
      <p className="general-title primary-color">Workshops</p>
      <GridFlex
        container
        rowGap={2}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <GridFlex
          md={4}
          lg={4}
        >
          <WorkShopCard
            title={
              'An Indigenous Anatolian Syllabic Script From 3500 Years Ago'
            }
            subTitle={'Discover Law - Get into the best UK law schools'}
            image={workShopImage1}
          />
        </GridFlex>
        <GridFlex
          md={4}
          lg={4}
        >
          <WorkShopCard
            title={
              'An Indigenous Anatolian Syllabic Script From 3500 Years Ago'
            }
            subTitle={'Discover Law - Get into the best UK law schools'}
            image={workShopImage1}
          />
        </GridFlex>
        <GridFlex
          md={4}
          lg={4}
        >
          <WorkShopCard
            title={
              'An Indigenous Anatolian Syllabic Script From 3500 Years Ago'
            }
            subTitle={'Discover Law - Get into the best UK law schools'}
            image={workShopImage1}
          />
        </GridFlex>
        <GridFlex
          md={4}
          lg={4}
        >
          <WorkShopCard
            title={
              'An Indigenous Anatolian Syllabic Script From 3500 Years Ago'
            }
            subTitle={'Discover Law - Get into the best UK law schools'}
            image={workShopImage1}
          />
        </GridFlex>
        <GridFlex
          md={4}
          lg={4}
        >
          <WorkShopCard
            title={
              'An Indigenous Anatolian Syllabic Script From 3500 Years Ago'
            }
            subTitle={'Discover Law - Get into the best UK law schools'}
            image={workShopImage1}
          />
        </GridFlex>
      </GridFlex>
    </Container>
  );
};

export default WorkShopsListingSection;
