import { Container, Grid, useMediaQuery } from '@mui/material';
import styles from './contact-us.module.css';
import {
  AlarmClockSVG,
  EditSVG,
  FaceBookMedSVG,
  InstagramMedSVG,
  LinkedInMedSVG,
  LocationSVG,
  PhoneSVG,
  ShareSVG,
  SkypeMedSVG,
  TwitterMedSVG,
} from '../../../../assets/icons';
import ContactUsSectionCard from '@/components/cards/contact-us-section/contactUsSectionCard';
import ContactUsForm from './contact-us-form/contactUsForm';
import { useTranslations } from 'next-intl';

const ContactUsSection = () => {
  const isScreen700 = useMediaQuery('(max-width:700px)');
  const t = useTranslations();
  const cards = [
    {
      id: 0,
      title: t('contact-us.find-us'),
      content: '2301 AMMAN . JORDAN,WI 53711',
      icon: <LocationSVG />,
    },
    {
      id: 1,
      title: t('contact-us.phone'),
      content: '+ (06) 905-2321 + (06) 905-2322',
      icon: <PhoneSVG />,
    },
    {
      id: 2,
      title: t('contact-us.working-hours'),
      content: 'Mon-Fri: 8 AM - 5 PM Sat-Sun: 8 AM - 2 PM',
      icon: <AlarmClockSVG />,
    },
    {
      id: 3,
      title: t('contact-us.write-to-us'),
      content: 'info@Tech Hub.com courses@Tech Hub.com',
      icon: <EditSVG />,
    },
  ];

  return (
    <Container
      className="mt-4 max-w-90 mb-2 "
      id="contact"
    >
      <div className="sm-flex-col-col-center-center">
        <div className="text-align-center">
          <p className="text-xlarge-title">{t('contact-us.title')}</p>
          <p className="sub-text-larges opacity-75">
            {t('contact-us.contact-desc')}
          </p>
          <p className="text-large-title fw700">
            {' '}
            {t('contact-us.get-in-touch')}
          </p>
        </div>
        <div className="mt-4 w-full">
          <Grid
            container
            spacing={2}
          >
            <Grid
              item
              xs={12}
              md={6}
              className={styles.leftContainer}
            >
              <p className="text-large-title fw700">
                {t('contact-us.details')}
              </p>

              <Grid
                container
                className="mt-2 "
                spacing={2}
                rowSpacing={2}
              >
                {cards.map((item) => (
                  <Grid
                    key={item.id}
                    item
                    xs={12}
                    md={5.5}
                  >
                    <ContactUsSectionCard
                      title={item.title}
                      content={item.content}
                      icon={item.icon}
                    />
                  </Grid>
                ))}

                <Grid
                  container
                  wrap="nowrap"
                  spacing={2}
                  sx={{ marginLeft: '0.7rem', marginTop: '1rem' }}
                >
                  <Grid
                    item
                    sx={{ marginTop: '1.5rem' }}
                  >
                    <ShareSVG />
                  </Grid>
                  <Grid
                    item
                    xs
                  >
                    <p className="text-med-low  ">
                      {t('contact-us.follow-us')}
                    </p>

                    <div className="sm-flex-row-row-center-start gap05 mt-1 w-50">
                      <div className={styles.socialIconContainer}>
                        <FaceBookMedSVG />
                      </div>
                      <div className={styles.socialIconContainer}>
                        <TwitterMedSVG />
                      </div>
                      <div className={styles.socialIconContainer}>
                        <InstagramMedSVG />
                      </div>
                      <div className={styles.socialIconContainer}>
                        <LinkedInMedSVG />
                      </div>
                      <div className={styles.socialIconContainer}>
                        <SkypeMedSVG />
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              className={styles.rightContainer}
            >
              <p className="text-large-title fw700">
                {t('contact-us.have-a-question')}
              </p>
              <ContactUsForm />
            </Grid>
          </Grid>
        </div>
        <Container>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387194.07372680923!2d-74.31001987831878!3d40.69701731549496!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sro!4v1722500622223!5m2!1sen!2sro"
            width="100%"
            height={isScreen700 ? '300' : '450'}
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </Container>
      </div>
    </Container>
  );
};

export default ContactUsSection;
