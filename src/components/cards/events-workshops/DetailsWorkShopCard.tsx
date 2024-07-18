import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Divider from '@mui/joy/Divider';

import './detail-workshop-card.css';
import { ClockSVG, PlaceSVG } from '../../../../assets/icons';
import { Button } from '@mui/material';

export default function DetailsWorkShopCard({
  location,
  person,
  duration,
  onClick,
}: {
  location: string;
  person: string;
  duration: string;
  onClick: any;
}) {
  return (
    <Card
      variant="outlined"
      sx={{
        width: 260,
        paddingTop: '1rem',
        borderRadius: '1.1rem',
        margin: '0.2rem',
      }}
    >
      <CardContent>
        <p className="text-med-fw700  p-0 ">Details</p>

        <div className="sm-flex-row-row-center-between">
          <span>
            <PlaceSVG /> Location
          </span>
          <p>{location}</p>
        </div>
        <Divider
          sx={{
            backgroundColor: 'rgb(200,200,200,0.5)',
            borderRadius: '4px',
            marginTop: '-.2rem',
          }}
        />
        <div className="sm-flex-row-row-center-between">
          <span>
            <ClockSVG /> Person
          </span>
          <p>{person}</p>
        </div>
        <Divider
          sx={{
            backgroundColor: 'rgb(200,200,200,0.5)',
            borderRadius: '4px',
            marginTop: '-.2rem',
          }}
        />
        <div className="sm-flex-row-row-center-between">
          <span>
            <ClockSVG /> Duration
          </span>
          <p>{duration}</p>
        </div>
        <Divider
          sx={{
            backgroundColor: 'rgb(200,200,200,0.5)',
            borderRadius: '4px',
            marginTop: '-.2rem',
          }}
        />

        <Button
          className="general-button-primary mt-1"
          onClick={onClick}
        >
          View
        </Button>
      </CardContent>
    </Card>
  );
}
