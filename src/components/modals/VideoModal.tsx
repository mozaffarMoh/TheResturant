'use client';
import Dialog from '@mui/material/Dialog';
import { Box, Stack, useMediaQuery } from '@mui/material';
import CloseSVG from '../../../assets/icons/close';
import { useRef, useState } from 'react';

const VideoModal = ({ open = false, handleClose, videoURL }: any) => {
  //const videoUrl = `https://www.youtube.com/embed/${videoId}?autoplay=0`;
  //const isScreen630 = useMediaQuery('(max-width:630px)');
  const isScreen500 = useMediaQuery('(max-width:400px)');
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef: any = useRef(null);
  const handlePlayVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause(); // Pause the video
        setIsPlaying(false); // Update state to indicate the video is paused
      } else {
        videoRef.current.play(); // Play the video
        setIsPlaying(true); // Update state to indicate the video is playing
      }
    }
  };
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      sx={{ overflowX: 'hidden' }}
    >
      <div
        onClick={handleClose}
        className="close-icon-video"
      >
        <CloseSVG />
      </div>

      <Box
        sx={{
          overflow: 'hidden',
          background: 'black',
          height: isScreen500 ? 310 : 480,
        }}
      >
        {/*     <iframe
          width="100%"
          height="100%"
          src={videoUrl}
          style={{ border: 'none', borderRadius: '10px' }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="YouTube video player"
        ></iframe> */}
        <video
          ref={videoRef}
          src={videoURL}
          controls
          onClick={handlePlayVideo}
        />
      </Box>
    </Dialog>
  );
};

export default VideoModal;
