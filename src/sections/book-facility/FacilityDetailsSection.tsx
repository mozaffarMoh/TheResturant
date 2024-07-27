import CustomAlert from '@/components/alerts/CustomAlert';
import DetailsCard from '@/components/cards/book-facility/DetailsCard';
import { workShopImage1 } from '@/constant/images';
import { Container, Grid, useMediaQuery } from '@mui/material';
import { useState } from 'react';
import { ClockSVG, PlaceSVG, UsersSVG } from '../../../assets/icons';
import FacilityReserveModal from '@/components/modals/facility-reserve-modal';
import { Typography } from '@mui/joy';
import dayjs, { Dayjs } from 'dayjs';
type CardDetailsArray = {
  label: string;
  value: string;
  icon: any;
};

const FacilityDetailsSection = ({ facility }: { facility: any }) => {
  const [openAlert, setOpenAlert] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [message, setMessage] = useState('') as any;
  const [success, setSuccess] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);

  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    //show alert
  
    
  };

  const handleBookModal = (
    date: any,
    fromTime: string,
    toTime: string,
    attendees: string,
  ) => {
    console.log({ date, fromTime, toTime, attendees });

    setLoadingSubmit(true);
    setMessage('');
    setOpenAlert(false);
    setSuccess(false);

    let user = localStorage.getItem('techhubuser') as string | null;
    let user_id = JSON.parse(user as string).id;
    console.log(user_id);

    if(!date || !fromTime || !toTime || !attendees){
      setLoadingSubmit(false);
      setSuccess(false);
      setMessage('Please fill all the fields!');
      setOpenAlert(true);
      return;
    }

    if (
      localStorage.getItem('techhubbooking') ===
      date + '-f' + facility.id + 'u' + user_id
    ) {
      setLoadingSubmit(false);
      setSuccess(false);
      setMessage('You have already booked this facility for this date!');
      setOpenAlert(true);
      return;
    }

    const myHeaders = new Headers();
    myHeaders.append(
      'Authorization',
      'Bearer ' + localStorage.getItem('techhubtoken'),
    );

    const formdata = new FormData();

    formdata.append('facility_id', facility.id as string);
    formdata.append('date', date as string);
    formdata.append('from_time', fromTime as string);
    formdata.append('to_time', toTime as string);
    formdata.append('number_of_attend', attendees as string);

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };

    fetch(
      'https://tempcms.theplatformjo.com/api/facility/booking',
      requestOptions as any,
    )
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        setLoadingSubmit(false);

        // console.log(result);
        // in success state
        if (result?.status && result?.status === 200) {
          setSuccess(true);
          setMessage(
            'Facility booking sent successfully, our team will review your booking as soon as possible!',
          );
          setIsModalOpen(false);

          localStorage.setItem(
            'techhubbooking',
            date + '-f' + facility.id + 'u' + user_id,
          );

          //reset form values

        } else {
          setSuccess(false);

          //convert error object to string
          let errorString = '';
          for (const key in result?.msg) {
            errorString += result?.msg[key] + '\n';
          }

          // in error state
          setMessage(errorString);
        }

        //show alert
        setOpenAlert(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const dataRows: CardDetailsArray[] = [
    { label: 'Minimum People', value: facility.min_people, icon: <UsersSVG /> },
    { label: 'Maximum People', value: facility.max_people, icon: <UsersSVG /> },
    {
      label: 'Minimum Hours',
      value: facility.min_hours + ' Hour',
      icon: <ClockSVG />,
    },
    {
      label: 'Maximum Hours',
      value: facility.max_hours + ' Hours',
      icon: <ClockSVG />,
    },
  ];

  return (
    <Container
      maxWidth="lg"
      className="mt-4  mb-4"
    >
      <CustomAlert
        openAlert={openAlert}
        setOpenAlert={setOpenAlert}
        message={message}
        type={success ? 'success' : 'error'}
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
          wrap="wrap"
          sx={{
            padding: 2,
            textAlign: 'justify',
          }}
        >
          <Typography>{facility.description}</Typography>
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
        onBook={handleBookModal}
        facility={facility}
        resetForm={success}
      />
    </Container>
  );
};

export default FacilityDetailsSection;
