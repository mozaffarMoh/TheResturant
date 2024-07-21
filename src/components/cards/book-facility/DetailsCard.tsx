import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Divider from '@mui/joy/Divider';

import './detail-card.css';
import { ClockSVG, PlaceSVG } from '../../../../assets/icons';
import { Button } from '@mui/material';

interface CardDetailsArray {
  label: string; value: string; icon: string 
}

export default function DetailsCard({
  dataRows = [],
  onClick,
}: {
  dataRows: CardDetailsArray[];
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

        {dataRows.map((row, index) => (
          <div key={index}>
            <div className="sm-flex-row-row-center-between">
              <span>
                {row.icon} {row.label}
              </span>
              <p>{row.value}</p>
            </div>
            <Divider
              sx={{
                backgroundColor: 'rgb(200,200,200,0.5)',
                borderRadius: '4px',
                marginTop: '-.2rem',
              }}
            />
          </div>
        ))}

        <Button
          className="general-button-primary mt-1"
          onClick={onClick}
        >
          Book Now
        </Button>
      </CardContent>
    </Card>
  );
}
