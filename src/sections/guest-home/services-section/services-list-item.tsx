import { Grid } from '@mui/material';
import styles from './services-section.module.css';
import { generalBgColor, primaryColor } from '@/constant/color';
import Image from 'next/image';
import { servicesSectionImage } from '@/constant/images';

interface IProps {
  title: string;
  content: string;
  direction: boolean;
  bgColor: string;
}

const ServicesListItem = ({ title, content, direction, bgColor }: IProps) => {
  return (
    <div
      className="mt-2 w-full md-padding-start-1 "
      style={{
        width: '95vw',
        paddingTop: '1.8rem',
        paddingBottom: '1.5rem',
        backgroundColor: direction ? bgColor : generalBgColor,
        borderBottomLeftRadius: '100px',
      }}
    >
      <Grid
        container
        gap={4}
        direction={direction ? 'row' : 'row-reverse'}
      >
        <Grid
          item
          xs={1}
          md={1}
        />
        <Grid
          item
          xs={12}
          md={4}
          className={styles.rightContainer}
        >
          <Image
            width={400}
            height={400}
            src={servicesSectionImage}
            alt="about us Section"
            className={styles.serviceImageStyle}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          className={styles.leftContainer}
        >
          <p
            className={`text-xlarge-title-secondary p-0 m-0 ${direction ? '' : 'fc-primary'}`}
          >
            {title}
          </p>
          <p
            className={`max-w-90 line-h-2 mt-2 ${direction ? 'text-white-new' : ''}`}
          >
            {content}
          </p>

          <Grid
            container
            className="mt-2"
            spacing={2}
            rowSpacing={2}
          ></Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default ServicesListItem;
