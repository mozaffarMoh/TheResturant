'use client';
import { Grid, Typography } from '@mui/material';
import Cookies from 'js-cookie';

interface IProps {
  title: string;
  content: string;
  icon: any;
}
const ContactUsSectionCard = ({ title, content, icon }: IProps) => {
  const langCookie = Cookies.get('NEXT_LOCALE') || 'en';
  const isRTL = langCookie == 'ar';
  return (
    <Grid
      container
      wrap="nowrap"
      spacing={2}
    >
      <Grid
        item
        sx={{ marginTop: '1rem' }}
      >
        {icon}
      </Grid>
      <Grid
        item
        xs
      >
        <p className="text-med-low  ">{title}</p>
        <Typography
          sx={{ textAlign: isRTL ? 'right' : 'left' }}
          className="fc-light-black-new"
        >
          {content}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ContactUsSectionCard;
