import CustomAlert from '@/components/alerts/CustomAlert';
import DetailsCard from '@/components/cards/book-facility/DetailsCard';
import { workShopImage1 } from '@/constant/images';
import { Container, Grid, useMediaQuery } from '@mui/material';
import { useState } from 'react';
import { ClockSVG, PlaceSVG, UsersSVG } from '../../../assets/icons';
import FacilityReserveModal from '@/components/modals/facility-reserve-modal';
import { Typography } from '@mui/joy';

type CardDetailsArray = {
  label: string;
  value: string;
  icon: any;
};

const FacilityDetailsSection = ({ facility }: { facility: any }) => {
  const [openAlert, setOpenAlert] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    //show alert
    setOpenAlert(true);
  };

  const dataRows: CardDetailsArray[] = [
    { label: 'Minimum People', value: facility.min_people, icon: <UsersSVG /> },
    { label: 'Maximum People', value: facility.max_people, icon: <UsersSVG /> },
    { label: 'Minimum Hours', value: facility.min_hours + ' Hour', icon: <ClockSVG /> },
    { label: 'Maximum Hours', value: facility.max_hours + ' Hours', icon: <ClockSVG /> },
  ];

  return (
    <Container
      maxWidth="lg"
      className="mt-4  mb-4"
    >
      <CustomAlert
        openAlert={openAlert}
        setOpenAlert={setOpenAlert}
        message={'You Successfully Book a Facility '}
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
          wrap='wrap'
          sx={{
            padding: 2,
            textAlign:'justify'
          }}
          
        >
          <Typography>
            {facility.description}
          </Typography>
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
            onClick={handleOpenModal}
          />
        </Grid>
      </Grid>

      <FacilityReserveModal
        open={isModalOpen}
        onClose={handleCloseModal}
      />
    </Container>
  );
};

export default FacilityDetailsSection;
