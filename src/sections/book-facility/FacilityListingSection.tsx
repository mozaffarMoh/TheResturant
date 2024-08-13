import { Container, Grid, Pagination } from '@mui/material';

import BookFacilityCard from '@/components/cards/book-facility/BookFacilityCard';

const FacilityListingSection = ({ facilityItems }: any) => {
  const paginationCount =
    facilityItems.length >= 5 ? facilityItems.length / 5 : 1;
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
              metadata={item.itemMetaData}
              place={item.place}
            />
          </Grid>
        ))}
        <Pagination
          variant="outlined"
          color="secondary"
          count={paginationCount}
        />
      </Grid>
    </Container>
  );
};

export default FacilityListingSection;
