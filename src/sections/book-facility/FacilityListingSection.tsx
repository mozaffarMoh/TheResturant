import { Container, Grid } from '@mui/material';

import BookFacilityCard from '@/components/cards/book-facility/BookFacilityCard';

const FacilityListingSection = ({ facilityItems }: any) => {

  return (
    <Container
      maxWidth="lg"
      className="mt-1 mb-3"
    >
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
      >
        {facilityItems.map((item: any) => (
          <Grid
            key={item.id}
            xs={12}
            sm={6}
            md={4}
            lg={4}
            item
          >
            <BookFacilityCard
              slug={item.slug}
              title={item.title}
              categories={item.categories}
              media={item.media}
              metadata={item.metadata}
              place={item.place}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default FacilityListingSection;
