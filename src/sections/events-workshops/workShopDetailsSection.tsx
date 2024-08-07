import CustomAlert from '@/components/alerts/CustomAlert';
import DetailsWorkShopCard from '@/components/cards/events-workshops/DetailsWorkShopCard';
import { Container, Grid, useMediaQuery } from '@mui/material';
import { useState } from 'react';

const WorkShopDetailsSection = ({ detailsData }: any) => {
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
        position={{ vertical: 'bottom', horizontal: 'right' }}
      />
      <Grid
        container
        sx={{ flexDirection: matches ? 'column-reverse' : '' }}
      >
        <Grid
          item
          xs={12}
          md={12}
          lg={8}
        >
          <div dangerouslySetInnerHTML={{ __html: detailsData?.description }} />
        </Grid>
        <Grid
          item
          xs={12}
          md={12}
          lg={4}
          container
          justifyContent="center"
          alignItems="center"
        >
          <DetailsWorkShopCard
            location={detailsData?.place && detailsData?.place?.name}
            metadata={detailsData?.metadata && detailsData?.metadata}
            onClick={setOpenAlert}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default WorkShopDetailsSection;
