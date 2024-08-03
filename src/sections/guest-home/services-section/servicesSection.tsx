import { Box, Container, Grid } from '@mui/material';
import styles from './services-section.module.css';
import Image from 'next/image';
import { servicesSectionImage } from '@/constant/images';
import { primaryColor } from '@/constant/color';
import ServicesListItem from './services-list-item';
import { useTranslations } from 'next-intl';

const ServicesSection = () => {
  const t = useTranslations();
  const serviceListItems = [
    {
      id: 0,
      title: 'Co-Working Spaces',
      content:
        'Increase Your Productivity in Inspirational Workspaces. Our coworking spaces are more than just workplaces - they are hubs for innovation and collaboration. Choose from diverse options, including open workspaces, private offices, and fully-equipped meeting rooms. Immerse yourself in a dynamic environment designed to stimulate creativity and enhance productivity',
      direction: true,
      bgColor: primaryColor,
    },
    {
      id: 1,
      title: 'Mentoring and Training',
      content:
        'Grow with Expert Guidance. Our mentoring and training programs are your gateway to professional development. Gain insights and guidance from industry experts. Learn how to effectively apply your knowledge, navigate challenges, and expand your technological project',
      direction: false,
      bgColor: 'white',
    },
    {
      id: 2,
      title: 'Co-Working Spaces',
      content:
        'Increase Your Productivity in Inspirational Workspaces. Our coworking spaces are more than just workplaces - they are hubs for innovation and collaboration. Choose from diverse options, including open workspaces, private offices, and fully-equipped meeting rooms. Immerse yourself in a dynamic environment designed to stimulate creativity and enhance productivity',
      direction: true,
      bgColor: primaryColor,
    },
    {
      id: 3,
      title: 'Mentoring and Training',
      content:
        'Grow with Expert Guidance. Our mentoring and training programs are your gateway to professional development. Gain insights and guidance from industry experts. Learn how to effectively apply your knowledge, navigate challenges, and expand your technological project',
      direction: false,
      bgColor: 'white',
    },
  ];
  return (
    <Container
      className="mt-4 max-w-90 "
      id="services"
    >
      <div className="sm-flex-col-col-center-center ">
        <div className="text-align-center">
          <p className="text-xlarge-title">{t('guest-home.services')}</p>
          <p className="sub-text-larges opacity-75">
            With Lots of Unique Blocks, You Can Easily Build a Page <br />{' '}
            Easily without any coding
          </p>
        </div>
        {serviceListItems.map((item) => (
          <ServicesListItem
            key={item.id}
            title={item.title}
            content={item.content}
            direction={item.direction}
            bgColor={item.bgColor}
          />
        ))}
      </div>
    </Container>
  );
};

export default ServicesSection;
