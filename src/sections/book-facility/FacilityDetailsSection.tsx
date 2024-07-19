import CustomAlert from '@/components/alerts/CustomAlert';
import DetailsCard from '@/components/cards/book-facility/DetailsCard';
import { workShopImage1 } from '@/constant/images';
import { Container, Grid, useMediaQuery } from '@mui/material';
import { useState } from 'react';
import { ClockSVG, PlaceSVG, UsersSVG } from '../../../assets/icons';


type CardDetailsArray = {
  label: string;
  value: string;
  icon: JSX.Element;
};

const FacilityDetailsSection = () => {
  const [openAlert, setOpenAlert] = useState(false);




  const dataRows : CardDetailsArray[] = [
    { label: 'Minimum People', value: '10', icon: <UsersSVG /> },
    { label: 'Maximum People', value: '20', icon: <UsersSVG /> },
    { label: 'Minimum Hours', value: '1 Hour', icon: <ClockSVG /> },
    { label: 'Maximum Hours', value: '3 Hours', icon: <ClockSVG /> },
  ];

  return (
    <Container
      maxWidth="lg"
      className="mt-4  mb-4"
    >
      <CustomAlert
        openAlert={openAlert}
        setOpenAlert={setOpenAlert}
        message={'You Successfully Book a Workshop '}
        type={'success'}
        position={{ vertical: 'bottom', horizontal: 'right' }}
      />
      <Grid
        container
        //sx={{ gap: 2 }}
        direction="row"
      >
        <Grid
          item
          xs={12}
          md={12}
          lg={9}
        >
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio
          et assumenda quisquam aspernatur omnis accusamus quos sit veritatis
          quidem? Fugit magnam perspiciatis repellat vel! Fuga ad perspiciatis
          placeat exercitationem beatae!
        </Grid>
        <Grid
          item
          xs={12}
          md={12}
          lg={3}
          container
          justifyContent="center"
          alignItems="center"
        >
          <DetailsCard
            dataRows={dataRows}
            onClick={setOpenAlert}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default FacilityDetailsSection;
