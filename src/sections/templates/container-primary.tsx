import { Box, Container, Grid } from '@mui/material';
import styles from './container-primary.module.css';
import Image from 'next/image';
import { servicesSectionImage } from '@/constant/images';
import { generalBgColor, primaryColor } from '@/constant/color';
import ServicesListItem from '@/sections/guest-home/services-section/services-list-item';

const ContainerPrimary = () => {
  return (
    <Container className="mt-4 max-w-90 mb-4 ">
      <div className="sm-flex-col-col-center-center ">
        <div
          className="mt-2 w-full md-padding-start-1 "
          style={{
            width: '95vw',
            paddingTop: '1.8rem',
            paddingBottom: '1.5rem',
            backgroundColor: primaryColor,
            borderBottomLeftRadius: '100px',
          }}
        ></div>
      </div>
    </Container>
  );
};

export default ContainerPrimary;
