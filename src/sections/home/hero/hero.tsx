'use client';
import styles from './hero.module.css';
import { Container, Skeleton } from '@mui/material';
import { DefautImage1Large } from '@/constant/images';
import { domain, endPoints } from '@/base-api/endPoints';
import { usePathname } from 'next/navigation';
import CustomSkeleton from '@/components/skeleton/CustomSkeleton';
import { useEffect, useState } from 'react';

interface IProps {
  bannerImage?: string;
  noText?: boolean;
  data?: any;
  loading?: boolean;
}
const HeroSection = ({
  bannerImage = '',
  noText = false,
  data,
  loading,
}: IProps) => {
  const pathname = usePathname();
  const [loadingStart, setLoadingStart] = useState<boolean>(true);
  let isArabic = pathname.startsWith('/ar');

  let imageURL =
    data && data?.children?.[0]?.media?.[0]?.url
      ? domain + data?.children?.[0]?.media?.[0]?.url
      : '';

  let title = data && data?.children?.[0]?.key;
  let subTitle = data && data?.children?.[0]?.value;

  const checkBackgroundImage = () => {
    if (data && imageURL) {
      return imageURL;
    } else if (bannerImage) {
      return bannerImage;
    } else {
      return DefautImage1Large;
    }
  };

  useEffect(() => {
    loading && setLoadingStart(false);
  }, [loading]);
  return (
    <div
      className={`${styles.home} ${data && styles.homeLarge} `}
      style={{
        backgroundImage: `url(${checkBackgroundImage()})`,
      }}
    >
      {(loading || loadingStart) && (
        <Skeleton
          sx={{ height: '100%', bgcolor: 'grey.500' }}
          width={'100%'}
          animation="wave"
          variant="rectangular"
        />
      )}
      {data && <div className={styles.heroBrightness} />}
      <div
        className={styles.heroTitle}
        style={{ left: !isArabic ? '8%' : '', right: isArabic ? '8%' : '' }}
      >
        {noText ? null : (
          <Container maxWidth="lg">
            {loading ? (
              <div>
                <CustomSkeleton
                  bgcolor="grey.500"
                  width="200px"
                  height="40px"
                />

                <CustomSkeleton
                  bgcolor="grey.500"
                  width="250px"
                  height="40px"
                />
              </div>
            ) : (
              <div>
                <p className="general-title text-white-new ">{title}</p>
                <p className={styles.SubTitle}>{subTitle}</p>
              </div>
            )}
          </Container>
        )}
      </div>
    </div>
  );
};

export default HeroSection;
