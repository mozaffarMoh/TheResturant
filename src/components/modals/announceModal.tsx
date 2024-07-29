'use client';

import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import announceImage from '../../../public/industry/announcments/announce.png';
import Image from 'next/image';
import { DialogContentText, Stack } from '@mui/material';
import { primaryColor } from '@/constant/color';
import CloseSVG from '../../../assets/icons/close';

interface TermsModalProps {
  open: boolean;
  handleClose: () => void;
}
const AnnounceModal = ({ open = false, handleClose }: TermsModalProps) => {
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
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
      <Stack
        padding={5}
        alignItems={'center'}
      >
        <Image
          style={{ width: '100%', height: '200px', borderRadius: '20px' }}
          src={announceImage}
          alt="newsImage"
        />
        <br />
        <br />
        <DialogTitle>
          <Typography
            variant="h6"
            fontFamily={'Nobile'}
            color={primaryColor}
            textTransform={'capitalize'}
            fontWeight={600}
          >
            Keep your face always toward the sunshine - and shadows will fall
            behind you.
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography
              variant="body2"
              fontFamily={'Jost'}
            >
              Master Figma app to get a job in UI Design, User Interface, User
              Experience design, Web Design & UX design.
              <br /> April 06, 2020 <br />
              <span style={{ color: 'red' }}>Art</span>
            </Typography>
          </DialogContentText>
        </DialogContent>
      </Stack>
    </Dialog>
  );
};

export default AnnounceModal;
