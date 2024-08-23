import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Stack,
  Skeleton,
} from '@mui/material';
import styles from './cards-section.module.css';
import Link from 'next/link';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { DefautImage1 } from '@/constant/images';
import { domain } from '@/base-api/endPoints';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import CustomSkeleton from '@/components/skeleton/CustomSkeleton';

const CardsSection = ({ data, loading }: any) => {
  const t = useTranslations();
  const pathname = usePathname();
  const isArabic = pathname.startsWith('/ar');

  return (
    <Container className="mt-4 max-w-md-65">
      <div className="sm-flex-col-col-center-center">
        <div className="text-align-center mt-4">
          {loading ? (
            <Stack alignItems={'center'}>
              <CustomSkeleton
                width="300px"
                height="40px"
              />
              <CustomSkeleton
                width="150px"
                height="40px"
              />
            </Stack>
          ) : (
            <p className="text-reg-high capital-letters">{data?.value}</p>
          )}
        </div>
        <div className="mt-4 w-full">
          <Grid
            container
            spacing={4}
            rowGap={4}
            style={{ width: '100%' }}
          >
            {loading
              ? Array.from(new Array(4)).map((_, idx) => (
                  <Grid
                    item
                    xs={12}
                    md={6}
                    key={idx}
                  >
                    <Card sx={{ borderRadius: '18px' }}>
                      <CardActionArea>
                        <CustomSkeleton
                          variant="rectangular"
                          width="100%"
                          height="300px"
                          borderRadius="18px 18px 0 0"
                        />
                        <CardContent className={styles.cardContentStyle}>
                          <CustomSkeleton width="150px" />
                          <CustomSkeleton width="250px" />
                          <CustomSkeleton width="100px" />
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                ))
              : data?.children?.map((item: any, idx: number) => {
                  const imageURL =
                    item.media && item.media.length > 0 && item.media[0]?.url
                      ? domain + item?.media[0]?.url
                      : DefautImage1;

                  if (item?.slug !== 'partners') {
                    return (
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
                              image={imageURL}
                              alt="green iguana"
                              className={styles.cardsImgStyle}
                            />
                            <div className={styles.backStyle} />
                            <CardContent className={styles.cardContentStyle}>
                              <h2 className={styles.cardTitle}>{item?.key}</h2>
                              <p className="sub-text-larges opacity-85 fw-500 line-h-1-2 letter-spacing-2 text-white-new max-w-75">
                                {item?.value}
                              </p>
                              <br />
                              <Link
                                href={`/#home`}
                                className={styles.cardLink}
                              >
                                {t('guest-home.learn-more')}{' '}
                                <ArrowRightAltIcon
                                  style={{
                                    transform: isArabic ? 'rotate(180deg)' : '',
                                  }}
                                />
                              </Link>
                            </CardContent>
                          </CardActionArea>
                        </Card>
                      </Grid>
                    );
                  }
                })}
          </Grid>
        </div>
      </div>
    </Container>
  );
};

export default CardsSection;
