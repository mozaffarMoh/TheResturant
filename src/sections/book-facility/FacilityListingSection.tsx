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
        paddingTop={5}
        spacing={5}
        sx={{ width: '100%' }}
        direction={'column'}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        {facilityItems.map((item: any) => (
          <Grid
            item
            key={item.id}
            xs={12}
            sm={6}
            md={4}
            lg={4}
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
      </Grid>
    </Container>
  );
};

export default FacilityListingSection;
