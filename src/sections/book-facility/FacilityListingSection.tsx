import { Container, Grid, useMediaQuery } from '@mui/material';
import BookFacilityCard from '@/components/cards/book-facility/BookFacilityCard';

const FacilityListingSection = ({ facilityItems }: any) => {
  const isScreen1209 = useMediaQuery('(max-width:1209px)');
  return (
    <Container
      maxWidth="lg"
      className="mt-1 mb-3"
    >
      <Grid
        container
        paddingTop={5}
        spacing={2}
        sx={{ width: '100%' }}
        direction={'row'}
        flexWrap={'wrap'}
        justifyContent={isScreen1209 ? 'center' : 'flex-start'}
        alignItems={'center'}
      >
        {facilityItems &&
          Array.isArray(facilityItems) &&
          facilityItems.map((item: any) => (
            <Grid
              item
              key={item.id}
              xs={12}
              sm={12}
              md={6}
              lg={4}
              display={'flex'}
              justifyContent={'center'}
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
