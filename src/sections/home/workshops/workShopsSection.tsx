'use client';
import { Button, Container, Grid } from '@mui/material';
import styles from './work-shops.module.css';
import { primaryColor } from '@/constant/color';
import { ArrowRight } from '@mui/icons-material';
import WorkShopCardV1 from '@/components/cards/home-section/WorkShopCardV1';
import WorkShopCardV2 from '@/components/cards/home-section/WorkShopCardV2';
import { workShopImage1, workShopImage2 } from '@/constant/images';
import { useTranslations } from 'next-intl';
import useGet from '@/custom-hooks/useGet';
import { endPoints } from '@/base-api/endPoints';
import { useEffect } from 'react';

const WorkShopsSection = () => {
  const t = useTranslations();
  const [data, loading, getData] = useGet(endPoints.getWorkshop);

  useEffect(() => {
    getData();
  }, []);

  return (
    <section
      style={{
        width: '100%',
        paddingTop: '1rem',
        paddingBottom: '1rem',
        backgroundColor: primaryColor,
      }}
    >
      <Container maxWidth="lg">
        <div className="sm-flex-col-col-center-center  ">
          <div className="mt-2 w-full md-padding-start-1 ">
            <div
              className="sm-flex-colo-col  md-margin-0 "
              style={{ marginLeft: '10px', marginRight: '10px' }}
            >
              <div className="general-title  text-white-new">
                {t('header.workshops')}
              </div>
              <div className="mt-2 lg-flex-row-col-1300">
                {/* cards horizontal cards  section */}
                <div className={styles.workShopCardsContainer}>
                  <div className={styles.leftCardsContainer}>
                    <div className="sm-flex-col-col-center-center gap1">
                      {data &&
                        data.length > 1 &&
                        data.map(
                          (item: any, i: number) =>
                            i > 1 &&
                            i < 5 && (
                              <WorkShopCardV1
                                key={i}
                                title={item.title}
                                metadata={item.metadata}
                                place={item.place}
                              />
                            ),
                        )}
                    </div>
                  </div>

                  {/* cards Vertical cards  section */}
                  {data && data.length > 0 && (
                    <div className={styles.rightCardsContainer}>
                      <div>
                        <div className="sm-flex-row-col-center-center">
                          <WorkShopCardV2
                            title={data[0]?.title}
                            media={data[0]?.media}
                            metadata={data[0]?.metadata}
                            place={data[0]?.place}
                          />
                        </div>
                      </div>
                      {data[1]?.title && (
                        <div>
                          <div className="sm-flex-row-col-center-center">
                            <WorkShopCardV2
                              title={data[1]?.title}
                              media={data[1]?.media}
                              metadata={data[1]?.metadata}
                              place={data[1]?.place}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-2 sm-flex-row-row-center-end  m-inline-end-2">
                <Button
                  variant="outlined"
                  sx={{
                    border: 'none',
                    paddingInline: '2rem',
                    color: 'white',
                    textDecoration: 'none',
                    '&:hover': {
                      border: 'none',
                      textDecoration: 'underline',
                    },
                  }}
                  endIcon={<ArrowRight />}
                >
                  {t('buttons.view')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default WorkShopsSection;
