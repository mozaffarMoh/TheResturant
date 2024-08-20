import { Container, Grid } from '@mui/material';
import styles from './about-us.module.css';
import { DefautImage1 } from '@/constant/images';
import {
  LampSVG,
  RocketSVG,
  TargetArrowSVG,
  TelescopeSVG,
} from '../../../../assets/icons';
import AboutUsSectionCard from '@/components/cards/about-us-section/aboutUsSectionCard';
import { useTranslations } from 'next-intl';
import { domain } from '@/base-api/endPoints';

const AboutUsSection = ({ data }: any) => {
  const words = (data?.children && data?.children[0]?.value?.split(' ')) || [];
  let imageURL = data?.children?.[0]?.media?.[0]?.url
    ? domain + data?.children[0]?.media[0]?.url
    : DefautImage1;

  return (
    <Container
      className="mt-4 max-w-90"
      id="about"
    >
      <div className="sm-flex-col-col-center-center">
        <div className="text-align-center">
          <p className="text-xlarge-title">{data?.key}</p>
          <p className="sub-text-larges opacity-75">
            {data?.children && data?.children[0]?.key}
          </p>
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
              <p className="text-xlarge-title-secondary p-0 m-0 ">{words[0]}</p>
              <p className="sub-xlarge-title">
                {words.slice(1, words.length).join(' ')}
              </p>

              <Grid
                container
                className="mt-2 "
                spacing={2}
                rowSpacing={2}
              >
                {data?.children &&
                  data?.children.map((item: any) => {
                    let iconURL = item?.media?.[0]?.url
                      ? domain + item?.media[0]?.url
                      : DefautImage1;
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
                  })}
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              md={5}
              className={styles.rightContainer}
            >
              <img
                style={{ width: '100%', borderRadius: '20px' }}
                src={imageURL}
                alt="about us Section"
              />
            </Grid>
          </Grid>
        </div>
      </div>
    </Container>
  );
};

export default AboutUsSection;
