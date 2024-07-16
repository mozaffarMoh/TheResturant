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
import { heroCard1, heroCard2, heroCard3, heroCard4 } from '@/constant/images';

const CardsSection = () => {
  const data = [
    {
      title: 'Coworking Spaces',
      description:
        ' Inspiring Work Environments Designed for Technological Innovation',
      image: heroCard1,
      link: '#',
    },
    {
      title: 'Coworking Spaces',
      description:
        ' Inspiring Work Environments Designed for Technological Innovation',
      image: heroCard2,

      link: '#',
    },
    {
      title: 'Coworking Spaces',
      description:
        ' Inspiring Work Environments Designed for Technological Innovation',
      image: heroCard3,

      link: '#',
    },
    {
      title: 'Coworking Spaces',
      description:
        ' Inspiring Work Environments Designed for Technological Innovation',
      image: heroCard4,

      link: '#',
    },
  ];

  return (
    <Container className="mt-4 max-w-md-65">
      <div className="sm-flex-col-col-center-center ">
        <div className="text-align-center">
          <p className="text-reg-high  capital-letters ">
            At The ThePlatform, We are dedicated to helping you excel in the
            world of technology. Our services are specifically designed to meet
            your needs
          </p>
        </div>
        <div className="mt-4 w-full">
          <Grid
            container
            spacing={4}
            rowGap={4}
          >
            {data &&
              data.map((item, idx) => (
                <Grid
                  item
                  xs={12}
                  md={6}
                  key={idx}
                >
                  <Card sx={{ borderRadius: '18px' }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        image={item.image}
                        alt="green iguana"
                        className={styles.cardsImgStyle}
                      />
                      <div className={styles.backStyle} />
                      <CardContent className={styles.cardContentStyle}>
                        <h2 className={styles.cardTitle}>{item.title}</h2>
                        <p className="sub-text-larges opacity-85 fw-500 line-h-1-2 letter-spacing-2 text-white-new max-w-75 ">
                          {item.description}
                        </p>
                        <br />
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
