import CustomAlert from '@/components/alerts/CustomAlert';
import DetailsWorkShopCard from '@/components/cards/events-workshops/DetailsWorkShopCard';
import { Container, Grid, useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import usePost from '@/custom-hooks/usePost';
import { useTranslations } from 'next-intl';
import Cookies from 'js-cookie';
import { endPoints } from '@/base-api/endPoints';

const WorkShopDetailsSection = ({ detailsData }: any) => {
  const isScreen1200 = useMediaQuery('(max-width:1200px)');
  const t = useTranslations();
  const token = Cookies.get('token') || '';
  const [itemId, setItemId] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [successMessage, setSuccessMessage]: any = useState('');
  const [errorMessage, setErrorMessage]: any = useState('');
  let body = {
    order_type: 'workshop',
    items: [{ item_id: itemId }],
  };

  const [
    ,
    loadingReserve,
    handleReserve,
    successReserve,
    ,
    errorMessageReserve,
  ] = usePost(endPoints.createOrder, body, token);

  useEffect(() => {
    if (detailsData) {
      setItemId(detailsData?.id);
      setQuantity(detailsData?.quantity);
    }
  }, [detailsData]);

  useEffect(() => {
    if (successReserve) {
      setSuccessMessage(t('messages.success-reserve-facility'));
      setTimeout(() => {
        setSuccessMessage('');
      }, 2000);
    }
  }, [successReserve]);

  return (
    <Container
      maxWidth="lg"
      className="mt-4  mb-4"
    >
      <CustomAlert
        openAlert={errorMessageReserve || errorMessage}
        setOpenAlert={() => setErrorMessage('')}
        message={errorMessageReserve || errorMessage}
      />
      <CustomAlert
        openAlert={successMessage}
        setOpenAlert={() => setSuccessMessage('')}
        type="success"
        message={successMessage}
      />
      <Grid
        container
        direction={isScreen1200 ? 'column' : 'row'}
        gap={isScreen1200 ? 8 : 0}
        justifyContent={'space-between'}
      >
        <Grid
          item
          xs={12}
          md={12}
          lg={7}
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
            itemMetaData={
              detailsData?.itemMetaData && detailsData?.itemMetaData
            }
            loading={loadingReserve}
            onClick={handleReserve}
            quantity={quantity}
            setErrorMessage={setErrorMessage}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default WorkShopDetailsSection;
