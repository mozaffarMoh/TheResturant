'use client';

import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { eventBgImage } from '@/constant/images';
import { Button, DialogActions, Grid } from '@mui/material';
import { primaryColor } from '@/constant/color';
import { PlaceSVG } from '../../../assets/icons';
import { useTranslations } from 'next-intl';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    backgroundColor: primaryColor, // Set the background color to red
    color: 'white',
    borderRadius: '12px',
  },
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

interface TermsModalProps {
  open: boolean;
  handleClose: () => void;
}
const EventDetailsModal = ({ open = false, handleClose }: TermsModalProps) => {
  const t = useTranslations();
  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle
        sx={{ m: 0 }}
        className="sm-flex-col-col-center-center"
        id="customized-dialog-title"
      >
        <p className="m-0">{t('header.events-details')}</p>
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        <div className=" position-relative w-99 h-12">
          <Image
            src={eventBgImage}
            fill
            alt="event details page"
          />
        </div>

        <div className="w-99 bg-light  mt-1 mb-1 border-r-18 fc-primary">
          <Grid
            container
            sx={{ padding: '1rem' }}
            columnGap={1.5}
          >
            <Grid
              item
              xs={12}
              sm={12}
              md={5.5}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <div className="sm-flex-row-row-center-between w-full">
                <span className="fw600">
                  <PlaceSVG /> Person
                </span>

                <p className="opacity-75">Omar</p>
              </div>

              <div className="sm-flex-row-row-center-between w-full">
                <span className="fw600">
                  <PlaceSVG /> Max Capacity
                </span>

                <p className="opacity-75">510</p>
              </div>

              <div className="sm-flex-row-row-center-between w-full">
                <span className="fw600">
                  <PlaceSVG /> Time
                </span>

                <p className="opacity-75">3:00</p>
              </div>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={5.5}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <div className="sm-flex-row-row-center-between w-full">
                <span className="fw600">
                  <PlaceSVG /> Location
                </span>

                <p className="opacity-75">Amman</p>
              </div>

              <div className="sm-flex-row-row-center-between w-full">
                <span className="fw600">
                  <PlaceSVG /> Duration
                </span>

                <p className="opacity-75">3:00</p>
              </div>

              <div className="sm-flex-row-row-center-between w-full">
                <span className="fw600">
                  <PlaceSVG /> Date
                </span>

                <p className="opacity-75">22/7/2024</p>
              </div>
            </Grid>
          </Grid>
        </div>

        <Typography
          gutterBottom
          className="fw700"
        >
          1.Clause
        </Typography>
        <Typography gutterBottom>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </Typography>
        <Typography
          gutterBottom
          className="fw700"
        >
          2.Clause
        </Typography>
        <Typography gutterBottom>
          Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
          Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
        </Typography>
        <Typography
          gutterBottom
          className="fw700"
        >
          3.Clause
        </Typography>
        <Typography gutterBottom>
          Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus
          magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec
          ullamcorper nulla non metus auctor fringilla.
        </Typography>
        <Typography
          gutterBottom
          className="fw700"
        >
          3.Clause
        </Typography>
        <Typography gutterBottom>
          Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus
          magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec
          ullamcorper nulla non metus auctor fringilla.
        </Typography>
      </DialogContent>
      <DialogActions
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Button
          autoFocus
          onClick={handleClose}
          className="general-button-secondary w-90 "
        >
          {t('buttons.book-now')}
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
};

export default EventDetailsModal;
