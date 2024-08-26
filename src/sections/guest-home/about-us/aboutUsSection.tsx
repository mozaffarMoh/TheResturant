import { Container, Grid } from '@mui/material';
import styles from './about-us.module.css';
import { DefautImage1 } from '@/constant/images';
import { DefautIcon } from '@/constant/images';
import AboutUsSectionCard from '@/components/cards/about-us-section/aboutUsSectionCard';
import { domain } from '@/base-api/endPoints';
import CustomSkeleton from '@/components/skeleton/CustomSkeleton';

const AboutUsSection = ({ data, loading }: any) => {
  const words = (data?.children && data?.children[0]?.value?.split(' ')) || [];
  let imageURL =
    data && data?.children?.[0]?.media?.['DynamicLookup/media']?.[0]?.url
      ? domain + data?.children?.[0]?.media?.['DynamicLookup/media']?.[0]?.url
      : DefautImage1;

  return (
    <Container
      className="mt-4 max-w-90"
      id="about"
      style={{ scrollMarginTop: '120px' }}
    >
      <div className="sm-flex-col-col-center-center">
        <div className="text-align-center">
          {loading ? (
            <CustomSkeleton
              width="150px"
              height="40px"
            />
          ) : (
            <p className="text-xlarge-title">{data?.key}</p>
          )}

          {loading ? (
            <CustomSkeleton
              width="250px"
              height="40px"
            />
          ) : (
            <p className="sub-text-larges opacity-75">
              {data?.children && data?.children[0]?.key}
            </p>
          )}
        </div>
        <div className="mt-4 w-full ">
          <Grid
            container
            spacing={2}
          >
            <Grid
              item
              xs={12}
              md={7}
              className={styles.leftContainer}
            >
              {loading ? (
                <CustomSkeleton
                  width="100px"
                  height="40px"
                />
              ) : (
                <p className="text-xlarge-title-secondary p-0 m-0 ">
                  {words?.[0]}
                </p>
              )}
              {loading ? (
                <CustomSkeleton
                  width="250px"
                  height="40px"
                />
              ) : (
                <p className="sub-xlarge-title">
                  {words.slice(1, words.length).join(' ')}
                </p>
              )}

              <Grid
                container
                className="mt-2 "
                spacing={2}
                rowSpacing={2}
              >
                {loading ? (
                  // Render skeletons when loading
                  <>
                    {Array(4) // Adjust the number of skeletons based on expected content
                      .fill(0)
                      .map((_, index) => (
                        <Grid
                          key={index}
                          item
                          xs={12}
                          md={5.5}
                        >
                          <CustomSkeleton
                            width={'100%'}
                            height={'250px'} // Adjust the height based on card content
                            borderRadius={4}
                            variant="rectangular"
                          />
                        </Grid>
                      ))}
                  </>
                ) : (
                  data?.children &&
                  data?.children.map((item: any) => {
                    let iconURL = item?.media?.['DynamicLookup/media']?.[0]?.url
                      ? domain + item?.media?.['DynamicLookup/media']?.[0]?.url
                      : DefautIcon;

                    if (item?.slug !== 'main-section') {
                      return (
                        <Grid
                          key={item?.id}
                          item
                          xs={12}
                          md={5.5}
                        >
                          <AboutUsSectionCard
                            title={item?.key}
                            content={item?.value}
                            icon={iconURL}
                          />
                        </Grid>
                      );
                    }
                  })
                )}
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              md={5}
              className={styles.rightContainer}
            >
              {loading ? (
                <CustomSkeleton
                  width={'100%'}
                  height={'400px'}
                  borderRadius={4}
                  variant="rectangular"
                />
              ) : (
                <img
                  className={styles.aboutImage}
                  src={imageURL}
                  alt="about us Section"
                />
              )}
            </Grid>
          </Grid>
        </div>
      </div>
    </Container>
  );
};

export default AboutUsSection;
