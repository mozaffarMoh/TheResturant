import CustomAlert from '@/components/alerts/CustomAlert';
import DetailsWorkShopCard from '@/components/cards/events-workshops/DetailsWorkShopCard';
import WorkShopCard from '@/components/cards/events-workshops/WorkShopCard';
import { workShopImage1 } from '@/constant/images';
import { Container, Grid, useMediaQuery } from '@mui/material';
import { useState } from 'react';

const WorkShopDetailsSection = () => {
  const [openAlert, setOpenAlert] = useState(false);

  const matches = useMediaQuery('(max-width:1024px)');
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
      />
      <Grid
        container
        sx={{ flexDirection: matches ? 'column-reverse' : '' }}
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
          <DetailsWorkShopCard
            location={'Amman'}
            person={'Jon duo'}
            duration={'3:00:00'}
            onClick={setOpenAlert}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default WorkShopDetailsSection;
