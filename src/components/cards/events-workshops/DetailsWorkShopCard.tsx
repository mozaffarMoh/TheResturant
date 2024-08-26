import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Divider from '@mui/joy/Divider';
import './detail-workshop-card.css';
import { PlaceSVG } from '../../../../assets/icons';
import { Box, Button, CircularProgress, Stack } from '@mui/material';
import { useTranslations } from 'next-intl';
import { metadataIcons } from '@/constant/metadataIcons';
import { LoadingButton } from '@mui/lab';

export default function DetailsWorkShopCard({
  location,
  metadata,
  loading,
  onClick,
  quantity,
}: {
  location: string;
  metadata: any;
  loading: boolean;
  onClick: any;
  quantity: number;
}) {
  const t = useTranslations();

  return (
    <Card
      variant="outlined"
      sx={{
        width: 380,
        paddingTop: '1rem',
        borderRadius: '1.1rem',
        margin: '0.2rem',
      }}
    >
      {metadata && (
        <CardContent>
          <p className="text-med-fw700  p-0 ">{t('dialog.details')}</p>

          <div className="sm-flex-row-row-center-between">
            <span>
              <PlaceSVG /> {t('dialog.location')}
            </span>
            <p>{location}</p>
          </div>

          {metadata.map((item: any) => {
            let SvgIcon = metadataIcons(item.slug);
            return (
              <Box key={item.id}>
                <Divider
                  sx={{
                    backgroundColor: 'rgb(200,200,200,0.5)',
                    borderRadius: '4px',
                    marginTop: '-.2rem',
                  }}
                />
                <div className="sm-flex-row-row-center-between">
                  <Stack
                    direction={'row'}
                    gap={1}
                  >
                    {SvgIcon && <SvgIcon />} {item.name}
                  </Stack>
                  <p>{item.value}</p>
                </div>
              </Box>
            );
          })}

          <LoadingButton
            loading={loading}
            className={`${quantity ? 'general-button-primary' : 'disabled-button'} mt-1`}
            disabled={quantity ? false : true}
            onClick={quantity ? onClick : () => {}}
            loadingIndicator={
              <CircularProgress
                color="warning"
                size={18}
              />
            }
          >
            {t('buttons.book-now')}
          </LoadingButton>
        </CardContent>
      )}
    </Card>
  );
}
