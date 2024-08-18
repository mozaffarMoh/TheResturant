import * as React from 'react';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import './workshop-card-v2.css';
import { ClockSVG, PlaceSVG } from '../../../../assets/icons';
import { domain } from '@/base-api/endPoints';
import { DefautImage1 } from '@/constant/images';

export default function WorkShopCardV2({ title, media, metadata, place }: any) {
  let imageURL =
    media && media.length > 0 && media[0]?.url
      ? domain + media[0]?.url
      : DefautImage1;
  return (
    <Card
      variant="outlined"
      sx={{
        width: 320,
        paddingTop: '1rem',
        borderRadius: '1.1rem',
        margin: '0.2rem',
      }}
      className="workshop-v2-repo"
    >
      <CardOverflow className="md-workshop-media">
        <img
          src={imageURL}
          loading="lazy"
          alt="workshop image card"
          className="md-workshop-media-image pt-1 pb-1"
          style={{ height: 200 }}
        />
      </CardOverflow>
      <CardContent>
        <div className="sm-flex-row-col-425  align-center-425 gap1 ">
          <span className="text-reg-fw500 opacity-80">
            <PlaceSVG />
            {place.name}
          </span>
          {metadata.map(
            (item: any) =>
              item.slug == 'time' && (
                <span
                  key={item?.id}
                  className="text-reg-fw500 opacity-80"
                >
                  <ClockSVG /> {item.value}
                </span>
              ),
          )}
        </div>
        <p className="text-med-fw700 max-subtile-80 ">{title}</p>
      </CardContent>
    </Card>
  );
}
