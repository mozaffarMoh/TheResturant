import { Grid } from '@mui/material';
import styles from './services-section.module.css';
import { generalBgColor, primaryColor } from '@/constant/color';
import Image from 'next/image';

interface IProps {
  title: string;
  content: string;
  index: number;
  imageURL: any;
}

const ServicesListItem = ({ title, content, index, imageURL }: IProps) => {
  const isIndexEven = index % 2 == 0;

  return (
    <div
      className="mt-2 w-full md-padding-start-1 "
      style={{
        width: '95vw',
        paddingTop: '1.8rem',
        paddingBottom: '1.5rem',
        backgroundColor: !isIndexEven ? primaryColor : generalBgColor,
        borderBottomLeftRadius: '100px',
      }}
    >
      <Grid
        container
        gap={4}
        direction={!isIndexEven ? 'row' : 'row-reverse'}
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
            style={{ borderRadius: 20 }}
            width={400}
            height={400}
            src={imageURL}
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
            className={`text-xlarge-title-secondary p-0 m-0 ${!isIndexEven ? '' : 'fc-primary'}`}
            style={{ lineHeight: '50px' }}
          >
            {title}
          </p>
          <p
            className={`max-w-90 line-h-2 mt-2 ${!isIndexEven ? 'text-white-new' : ''}`}
          >
            {content}
          </p>
        </Grid>
      </Grid>
    </div>
  );
};

export default ServicesListItem;
