import { Container, Grid } from '@mui/material';
import styles from './contact-us.module.css';
import {
  AlarmClockSVG,
  EditSVG,
  LocationSVG,
  PhoneSVG,
  ShareSVG,
} from '../../../../assets/icons';
import ContactUsSectionCard from '@/components/cards/contact-us-section/contactUsSectionCard';
import Image from 'next/image';
import { socialIconsImages } from '@/constant/images';
import ContactUsForm from './contact-us-form/contactUsForm';

const ContactUsSection = () => {
  const cards = [
    {
      id: 0,
      title: 'Find Us',
      content: '2301 AMMAN . JORDAN,WI 53711',
      icon: <LocationSVG />,
    },
    {
      id: 1,
      title: 'Phone',
      content: '+ (06) 905-2321 + (06) 905-2322',
      icon: <PhoneSVG />,
    },
    {
      id: 2,
      title: 'Working Hours',
      content: 'Mon-Fri: 8 AM - 5 PM Sat-Sun: 8 AM - 2 PM',
      icon: <AlarmClockSVG />,
    },
    {
      id: 3,
      title: 'Write to Us',
      content: 'info@Tech Hub.com courses@Tech Hub.com',
      icon: <EditSVG />,
    },
  ];
  return (
    <Container className="mt-4 max-w-90 ">
      <div className="sm-flex-col-col-center-center">
        <div className="text-align-center">
          <p className="text-xlarge-title">Contact Us</p>
          <p className="sub-text-larges opacity-75">
            With Lots of Unique Blocks, You Can Easily Build a Page <br />{' '}
            Easily without any coding
          </p>
          <p className="text-large-title fw700">Get In Touch Today!</p>
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
              <p className="text-large-title fw700">Contact Details</p>

              <Grid
                container
                className="mt-2"
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
               {
                /** <Grid
                  container
                  wrap="nowrap"
                  spacing={2}
                >
                  <Grid
                    item
                    sx={{ marginTop: '1rem' }}
                  >
                    <ShareSVG />
                  </Grid>
                  <Grid
                    item
                    xs
                  >
                    <p className="text-med-low  ">Follow US</p>
                    <Image
                      width={300}
                      height={80}
                      alt="social icons"
                      src={socialIconsImages}
                    />
                  </Grid>
                </Grid> */
               }
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              className={styles.rightContainer}
            >
              <p className="text-large-title fw700">Have A Question!</p>
              <ContactUsForm />
            </Grid>
          </Grid>
        </div>
      </div>
    </Container>
  );
};

export default ContactUsSection;
