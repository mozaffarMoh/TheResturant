import { Container, Grid, Pagination, PaginationItem } from '@mui/material';
import BookFacilityCard from '@/components/cards/book-facility/BookFacilityCard';
import {
  ArrowBackIosNewRounded,
  ArrowForwardIosRounded,
} from '@mui/icons-material';
import { usePathname } from 'next/navigation';

const FacilityListingSection = ({ facilityItems }: any) => {
  const paginationCount =
    facilityItems.length >= 5 ? facilityItems.length / 5 : 1;
  const pathname = usePathname();
  let isArabic = pathname.startsWith('/ar');

  return (
    <Container
      maxWidth="lg"
      className="mt-1 mb-3"
    >
      <Grid
        container
        spacing={5}
        direction={'column'}
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
        <Grid item>
          <Pagination
            variant="text"
            color="primary"
            count={paginationCount}
            renderItem={(item) => (
              <PaginationItem
                {...item}
                slots={{
                  previous: isArabic
                    ? ArrowForwardIosRounded
                    : ArrowBackIosNewRounded,
                  next: isArabic
                    ? ArrowBackIosNewRounded
                    : ArrowForwardIosRounded,
                }}
              />
            )}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default FacilityListingSection;
