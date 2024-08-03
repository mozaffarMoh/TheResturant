import styles from './auth-footer.module.css';
import { Box, Typography } from '@mui/material';
import { Input } from '@mui/joy';
import JoyButton from '@mui/joy/Button';
import { gray100, gray200 } from '@/constant/color';
import {
  FaceBookSVG,
  InstagramSVG,
  LinkedInSVG,
  TwitterSVG,
} from '../../../assets/icons';
import { useTranslations } from 'next-intl';
const AuthFooter = () => {
  const t = useTranslations();
  return (
    <Box
      component="footer"
      className={styles.footer}
    >
      <p className="text-large-title text-white-new  mt-2">
        {t('footer.title')}
      </p>
      <p className="text-med-fw400 fc-light-white">{t('footer.subtitle')}</p>
      <div
        className={styles.subscribeForm}
        dir="ltr"
      >
        <Input
          sx={{
            '--Input-decoratorChildHeight': '3.5rem',
            borderRadius: '2rem',
            width: '32rem',
            marginTop: '2rem',
          }}
          placeholder="mail@mui.com"
          type="email"
          required
          endDecorator={
            <JoyButton
              variant="solid"
              type="submit"
              sx={{
                width: 'clamp(6rem, 2.4499rem + 9.8613vw, 10rem)',
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                borderRadius: '2rem',
                backgroundColor: gray100,
                '&:hover': {
                  backgroundColor: gray200,
                },
              }}
            >
              {t('footer.subscribe')}
            </JoyButton>
          }
        />
      </div>
      {/* Social Media Icons */}
      <div className="sm-flex-row-row-center-center">
        <div className="sm-flex-row-row-center-center gap05  w-50">
          <div className={styles.socialIconContainer}>
            <FaceBookSVG />
          </div>
          <div className={styles.socialIconContainer}>
            <TwitterSVG />
          </div>
          <div className={styles.socialIconContainer}>
            <InstagramSVG />
          </div>
          <div className={styles.socialIconContainer}>
            <LinkedInSVG />
          </div>
        </div>
      </div>
      {/* Orange box */}
      <div className="sm-flex-row-row-center-center">
        <div className={styles.modeInfo}>
          <p className="text-med-fw600 text-white-new"> Modee</p>
          <div>
            <div>
              <p className="text-reg fc-light-white">
                MinisterOffice@modee.gov.jo <br />
                0096265805700
              </p>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default AuthFooter;
