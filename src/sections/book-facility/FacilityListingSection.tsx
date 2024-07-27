import { Container, Grid } from '@mui/material';
import GridFlex from '@mui/material/Unstable_Grid2';
import { workShopImage1 } from '@/constant/images';

import BookFacilityCard from '@/components/cards/book-facility/BookFacilityCard';

interface FacilityListArray {
  id : number;
  title: string;
  category: string;
  image: string;
  min_people:String;
  max_people:String;
  location: string;
  min_hours:String;
  max_hours:String;
}


const FacilityListingSection = ({
  facilityListData = []
}:{
  facilityListData: FacilityListArray[];
}) => {
  const facilities = [
    {
      title: 'Offices No. 134',
      category: 'Meeting Room',
      image: workShopImage1,
      time: '10:00am - 3:00pm',
      capacity: '10 - 20',
      location: 'Marka Building',
    },
    {
      title: 'offices No. 134',
      category: 'Meeting Room',
      image: workShopImage1,
      time: '10:00 am - 3:00 pm',
      capacity: '20',
      location: 'Marka',
    },
    {
      title: 'offices No. 134',
      category: 'Meeting Room',
      image: workShopImage1,
      time: '10:00 am - 3:00 pm',
      capacity: '20',
      location: 'Marka',
    },
    {
      title: 'offices No. 134',
      category: 'Meeting Room',
      image: workShopImage1,
      time: '10:00 am - 3:00 pm',
      capacity: '20',
      location: 'Marka',
    },
    {
      title: 'offices No. 134',
      category: 'Meeting Room',
      image: workShopImage1,
      time: '10:00 am - 3:00 pm',
      capacity: '20',
      location: 'Marka',
    },
    {
      title: 'offices No. 134',
      category: 'Meeting Room',
      image: workShopImage1,
      time: '10:00 am - 3:00 pm',
      capacity: '20',
      location: 'Marka',
    },
  ];

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
        {facilityListData.map((facility, index) => (
          <Grid
            key={index}
            xs={12}
            sm={6}
            md={4}
            lg={4}
            item
          >
            <BookFacilityCard 
              id={facility.id}
              title={facility.title}
              category={facility.category}
              image={facility.image}
              time={facility.min_hours + ' - ' + facility.max_hours + " hours"}
              capacity={facility.min_people + ' - ' + facility.max_people}
              location="Marka"
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default FacilityListingSection;
