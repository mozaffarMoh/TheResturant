'use client';
import { Button, Container, Grid } from '@mui/material';
import styles from './work-shops.module.css';
import { primaryColor } from '@/constant/color';
import { ArrowRight } from '@mui/icons-material';
import WorkShopCardV1 from '@/components/cards/home-section/WorkShopCardV1';
import WorkShopCardV2 from '@/components/cards/home-section/WorkShopCardV2';
import { workShopImage1, workShopImage2 } from '@/constant/images';

const WorkShopsSection = () => {
  return (
    <Container className="mt-4 max-w-90 mb-4 ">
      <div className="sm-flex-col-col-center-center  ">
        <div
          className="mt-2 w-full md-padding-start-1 "
          style={{
            width: '95vw',
            paddingTop: '1.8rem',
            paddingBottom: '1.5rem',
            backgroundColor: primaryColor,
            borderBottomLeftRadius: '100px',
          }}
        >
          <div
            className="sm-flex-colo-col  md-margin-0 "
            style={{ marginLeft: '8%', marginRight: '1%' }}
          >
            <div className="text-xlarge-title text-white-new">Workshops</div>
            <div className="mt-2 lg-flex-row-col-1300">
              {/* cards horizontal cards  section */}
              <div className={styles.gridContainer}>
                <div className={styles.gridItem}>
                  <div className="sm-flex-col-col-center-center gap1">
                    <WorkShopCardV1
                      title={'Elegant Light Box Paper New Design Conference'}
                      day={'06'}
                      month={'April'}
                    />

                    <WorkShopCardV1
                      title={'Elegant Light Box Paper New Design Conference'}
                      day={'06'}
                      month={'April'}
                    />

                    <WorkShopCardV1
                      title={'Elegant Light Box Paper New Design Conference'}
                      day={'06'}
                      month={'April'}
                    />
                  </div>
                </div>
                {/* cards Vertical cards  section */}

                <div className={styles.gridItem}>
                  <div className="sm-flex-row-col-center-center">
                    <WorkShopCardV2
                      title={
                        'An Indigenous Anatolian Syllabic Script From 3500 Years Ago'
                      }
                      image={workShopImage1}
                    />
                  </div>
                </div>
                <div className={styles.gridItem}>
                  <div className="sm-flex-row-col-center-center">
                    <WorkShopCardV2
                      title={
                        'An Indigenous Anatolian Syllabic Script From 3500 Years Ago'
                      }
                      image={workShopImage2}
                    />
                  </div>
                </div>
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
                View
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default WorkShopsSection;
