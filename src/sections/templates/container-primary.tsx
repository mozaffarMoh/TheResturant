import { Container } from '@mui/material';
import styles from './container-primary.module.css';
import { primaryColor } from '@/constant/color';

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
