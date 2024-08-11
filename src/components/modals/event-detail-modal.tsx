'use client';

import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { eventBgImage, greyBackground } from '@/constant/images';
import {
  Box,
  Button,
  CircularProgress,
  DialogActions,
  Grid,
  Stack,
  useMediaQuery,
} from '@mui/material';
import { gray100, primaryColor } from '@/constant/color';
import { PlaceSVG } from '../../../assets/icons';
import { useTranslations } from 'next-intl';
import { domain, endPoints } from '@/base-api/endPoints';
import useGet from '@/custom-hooks/useGet';
import { useEffect } from 'react';
import { metadataIcons } from '@/constant/metadataIcons';

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
  slug: string;
}
const EventDetailsModal = ({
  open = false,
  handleClose,
  slug,
}: TermsModalProps) => {
  const t = useTranslations();
  const isScreen600 = useMediaQuery('(max-width:600px)');
  const [data, loading, getData] = useGet(
    endPoints.showSingleItem + slug,
    true,
  );
  let imageURL =
    data?.media && data.media.length > 0 && data?.media[0]?.url
      ? domain + data?.media[0]?.url
      : greyBackground;

  useEffect(() => {
    slug && getData();
  }, [slug]);

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
        <Box
          className=" position-relative  "
          height={250}
          marginBottom={3}
        >
          <Image
            src={imageURL}
            fill
            style={{ borderRadius: '20px' }}
            alt="event details page"
          />
        </Box>
        {loading ? (
          <Stack
            width={isScreen600 ? 300 : 500}
            height={100}
            borderRadius={5}
            justifyContent={'center'}
            alignItems={'center'}
            bgcolor={'white'}
          >
            {' '}
            <CircularProgress />
          </Stack>
        ) : (
          <Grid
            container
            width={isScreen600 ? 300 : 500}
            bgcolor={'white'}
            borderRadius={5}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
          >
            {data?.metadata &&
              data?.metadata.map((item: any, i: number) => {
                let SvgIcon = metadataIcons(item.slug);
                return (
                  <Grid
                    item
                    key={i}
                    xs={12}
                    sm={6}
                    display={'flex'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    height={50}
                    padding={5}
                  >
                    <Stack
                      direction={'row'}
                      justifyContent={'space-between'}
                      alignItems={'center'}
                      gap={2}
                    >
                      <Stack
                        sx={{ width: '10px', height: '50px' }}
                        justifyContent={'center'}
                      >
                        {SvgIcon && <SvgIcon />}
                      </Stack>
                      <Typography
                        fontWeight={600}
                        fontSize={13}
                        color={primaryColor}
                      >
                        {item.name}
                      </Typography>
                    </Stack>
                    <Typography
                      fontSize={13}
                      color={gray100}
                    >
                      {item.value}
                    </Typography>
                  </Grid>
                );
              })}
            <Grid
              item
              xs={12}
              sm={6}
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'center'}
              height={50}
              padding={5}
            >
              <Stack
                direction={'row'}
                justifyContent={'flex-start'}
                alignItems={'center'}
                gap={1}
              >
                <Stack
                  sx={{ width: '100%', height: '50px' }}
                  justifyContent={'center'}
                >
                  <PlaceSVG />
                </Stack>
                <Typography
                  fontWeight={600}
                  color={primaryColor}
                >
                  {t('dialog.location')}
                </Typography>
              </Stack>
              <Typography color={gray100}>
                {data?.place && data?.place?.name}
              </Typography>
            </Grid>
          </Grid>
        )}

        <div dangerouslySetInnerHTML={{ __html: data?.description }} />
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
