'use client';
import { secondaryColor } from '@/constant/color';
import { Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import { text } from 'stream/consumers';

interface IProps {
  content: string;
  image: string;
}
const PartnerSectionCard = ({ content, image }: IProps) => {
  return (
    <Card
      sx={{
        width: 250,
        padding: '2rem',
        height: '16rem',
        borderRadius: '25px',
        position: 'relative',
      }}
      className="partner-card"
    >
      <CardContent className="sm-flex-col-col-center-center">
        <Image
          src={image}
          width={130}
          height={100}
          alt="card-partner"
        />
        <Divider
          variant="fullWidth"
          sx={{
            color: 'red',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            width: '50%',
            margin: '0.6rem 0rem',
          }}
        />
        <p className="text-align-center fw600">{content}</p>
      </CardContent>
      <div
        style={{
          position: 'absolute',
          bottom: '-0.4rem',
          left: '25%',
          backgroundColor: secondaryColor,
          borderRadius: '12px',
          width: '50%',
          height: '1rem',
        }}
      ></div>
    </Card>
  );
};

export default PartnerSectionCard;
