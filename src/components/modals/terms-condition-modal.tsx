'use client';

import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import useGet from '@/custom-hooks/useGet';
import { endPoints } from '@/base-api/endPoints';
import { useEffect } from 'react';
import { Skeleton, Stack, useMediaQuery } from '@mui/material';
import { useTranslations } from 'next-intl';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
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
  showModal?: boolean;
}
const TermsConditionsModal = ({
  open = false,
  handleClose,
  showModal,
}: TermsModalProps) => {
  const t = useTranslations();
  const isScreen500 = useMediaQuery('(max-width:500px)');
  /*   const [data, loading, getData, success] = useGet(endPoints.getTermsOfUse);

  useEffect(() => {
    showModal && !success && getData();
  }, [showModal]);

  console.log(data); */

  const loading = false;
  const data = [
    {
      title: '1. Clause',
      subTitle:
        'Cras mattis consectetur purus sit amet fermentum. Cras justo  odio, dapibus ac facilisis in, egestas eget quam. Morbi leo  risus, porta ac consectetur ac, vestibulum at eros.',
    },
    {
      title: '2. Clause',
      subTitle:
        'Cras mattis consectetur purus sit amet fermentum. Cras justo  odio, dapibus ac facilisis in, egestas eget quam. Morbi leo  risus, porta ac consectetur ac, vestibulum at eros.',
    },
    {
      title: '3. Clause',
      subTitle:
        'Cras mattis consectetur purus sit amet fermentum. Cras justo  odio, dapibus ac facilisis in, egestas eget quam. Morbi leo  risus, porta ac consectetur ac, vestibulum at eros.',
    },
  ];

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
        <p className="m-0">{t('auth.terms-title')}</p>
        {loading ? (
          <Skeleton
            variant="text"
            width={isScreen500 ? 150 : 250}
          />
        ) : (
          <p className="m-0 text-reg fc-light-black">
            Last updated on 6/12/2024
          </p>
        )}
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
      <DialogContent dividers>
        {' '}
        {loading ? (
          <Stack alignItems={'center'}>
            <Skeleton
              variant="text"
              width={isScreen500 ? 100 : 150}
            />
            {Array.from({ length: 6 }).map(() => {
              return (
                <Skeleton
                  variant="text"
                  width={isScreen500 ? 180 : 400}
                />
              );
            })}
          </Stack>
        ) : (
          data.map((item: any) => {
            return (
              <>
                <Typography
                  gutterBottom
                  className="fw700"
                >
                  {item.title}
                </Typography>
                <Typography gutterBottom>{item.subTitle}</Typography>
              </>
            );
          })
        )}
      </DialogContent>
    </BootstrapDialog>
  );
};

export default TermsConditionsModal;
