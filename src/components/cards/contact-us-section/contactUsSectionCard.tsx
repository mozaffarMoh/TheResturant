'use client';
import { Grid, Typography } from '@mui/material';

interface IProps {
  title: string;
  content: string;
  icon: any;
}
const ContactUsSectionCard = ({ title, content, icon }: IProps) => {
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
          sx={{ textAlign: 'left' }}
          className="fc-light-black-new"
        >
          {content}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ContactUsSectionCard;
