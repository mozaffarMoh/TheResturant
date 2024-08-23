'use client';
import Dialog from '@mui/material/Dialog';
import { Box, Stack, useMediaQuery } from '@mui/material';
import CloseSVG from '../../../assets/icons/close';
import { useRef, useState } from 'react';

const VideoModal = ({ open = false, handleClose, videoId }: any) => {
  const isScreen630 = useMediaQuery('(max-width:630px)');
  const videoUrl = `https://www.youtube.com/embed/${videoId}?autoplay=0`;

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      sx={{ direction: 'ltr', overflowX: 'hidden' }}
    >
      <Stack
        direction={'row'}
        justifyContent={'flex-end'}
        width={'100%'}
      >
        <div
          onClick={handleClose}
          style={{ margin: '10px', cursor: 'pointer' }}
        >
          <CloseSVG />
        </div>
      </Stack>
      <Box
        sx={{ overflow: 'hidden', padding: '20px' }}
        width={isScreen630 ? 300 : 500}
        height={isScreen630 ? 250 : 350}
      >
        <iframe
          width="100%"
          height="100%"
          src={videoUrl}
          style={{ border: 'none', borderRadius: '10px' }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="YouTube video player"
        ></iframe>
      </Box>
    </Dialog>
  );
};

export default VideoModal;
