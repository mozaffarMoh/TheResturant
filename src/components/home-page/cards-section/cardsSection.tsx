import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
} from '@mui/material';
import styles from './cards-section.module.css';
import Link from 'next/link';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

const CardsSection = () => {
  const data = [
    {
      title: 'Coworking Spaces',
      description:
        ' Inspiring Work Environments Designed for Technological Innovation',
      link: '#',
    },
    {
      title: 'Coworking Spaces',
      description:
        ' Inspiring Work Environments Designed for Technological Innovation',
      link: '#',
    },
    {
      title: 'Coworking Spaces',
      description:
        ' Inspiring Work Environments Designed for Technological Innovation',
      link: '#',
    },
    {
      title: 'Coworking Spaces',
      description:
        ' Inspiring Work Environments Designed for Technological Innovation',
      link: '#',
    },
  ];

  return (
    <Container className="mt-4 max-w-md-65">
      <div className="sm-flex-col-col-center-center ">
        <div className="text-align-center">
          <p className={styles.mainTextStyle}>
            At The ThePlatform, we are dedicated to helping you excel in the
            world of technology. Our services are specifically designed to meet
            your needs
          </p>
        </div>
        <div className="mt-4 w-full">
          <Grid
            container
            spacing={2}
          >
            {data &&
              data.map((item, idx) => (
                <Grid
                  item
                  xs={12}
                  md={6}
                  className={styles.cardStyle}
                  key={idx}
                >
                  <Card>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        image="/container@2x.png"
                        alt="green iguana"
                        className={styles.cardsImgStyle}
                      />
                      <div className={styles.backStyle} />
                      <CardContent className={styles.cardContentStyle}>
                        <h2 className={styles.cardTitle}>{item.title}</h2>
                        <p className={styles.cardDescription}>
                          {item.description}
                        </p>
                        <Link
                          href={item.link}
                          className={styles.cardLink}
                        >
                          Learn more <ArrowRightAltIcon />
                        </Link>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </div>
      </div>
    </Container>
  );
};

export default CardsSection;
