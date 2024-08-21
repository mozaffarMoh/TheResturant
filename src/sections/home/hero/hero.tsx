'use client';
import styles from './hero.module.css';
import { Container } from '@mui/material';
import { DefautImage1Large, homeHeroImage } from '@/constant/images';
import { domain, endPoints } from '@/base-api/endPoints';
import { usePathname } from 'next/navigation';

interface IProps {
  bannerImage?: string;
  noText?: boolean;
  data?: any;
}
const HeroSection = ({ bannerImage = '', noText = false, data }: IProps) => {
  const pathname = usePathname();
  let isArabic = pathname.startsWith('/ar');

  let imageURL =
    data && data?.children?.[0]?.media?.[0]?.url
      ? domain + data?.children?.[0]?.media?.[0]?.url
      : DefautImage1Large;

  let title = data && data?.children?.[0]?.key;
  let subTitle = data && data?.children?.[0]?.value;

  return (
    <div
      className={`${styles.home} ${data && styles.homeLarge} `}
      style={{
        backgroundImage: `url(${data ? imageURL : bannerImage})`,
      }}
    >
      {data && <div className={styles.heroBrightness} />}
      <div
        className={styles.heroTitle}
        style={{ left: !isArabic ? '8%' : '', right: isArabic ? '8%' : '' }}
      >
        {noText ? null : (
          <Container maxWidth="lg">
            <p className="general-title text-white-new ">{title}</p>
            <p className={styles.SubTitle}>{subTitle}</p>
          </Container>
        )}
      </div>
    </div>
  );
};

export default HeroSection;
