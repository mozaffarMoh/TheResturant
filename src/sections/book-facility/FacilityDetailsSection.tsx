import DetailsCard from '@/components/cards/book-facility/DetailsCard';
import { Container, Grid } from '@mui/material';
import { useState } from 'react';
import FacilityReserveModal from '@/components/modals/facility-reserve-modal';

const FacilityDetailsSection = ({ facility }: { facility: any }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <Container
      maxWidth="lg"
      className="mt-4  mb-4"
      sx={{ height: !facility?.slug ? '200px' : '' }}
    >
      <FacilityReserveModal
        open={isModalOpen}
        onClose={handleCloseModal}
        facility={facility}
      />

      {facility && facility?.slug && (
        <Grid
          container
          direction="row"
        >
          <Grid
            item
            xs={12}
            md={8}
            lg={8}
            wrap="wrap"
            sx={{
              padding: 2,
              textAlign: 'justify',
            }}
          >
            {facility?.description && (
              <div dangerouslySetInnerHTML={{ __html: facility.description }} />
            )}
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            lg={4}
            container
            justifyContent="center"
            alignItems="flex-start"
            marginTop={2}
          >
            <DetailsCard
              facility={facility}
              onClick={handleOpenModal}
            />
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default FacilityDetailsSection;
