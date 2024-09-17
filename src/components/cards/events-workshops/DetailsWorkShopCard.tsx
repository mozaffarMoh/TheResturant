import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Divider from '@mui/joy/Divider';
import './detail-workshop-card.css';
import { PlaceSVG } from '../../../../assets/icons';
import { Box, Button, CircularProgress, Stack } from '@mui/material';
import { useTranslations } from 'next-intl';
import { metadataIcons } from '@/constant/metadataIcons';
import { LoadingButton } from '@mui/lab';
import { metadataKeys } from '@/constant/metadataKeys';

export default function DetailsWorkShopCard({
  location,
  itemMetaData,
  loading,
  onClick,
  quantity,
  setErrorMessage,
}: {
  location: string;
  itemMetaData: any;
  loading: boolean;
  onClick: any;
  quantity: number;
  setErrorMessage: any;
}) {
  const t = useTranslations();

  const handleSubmit = () => {
    if (quantity > 0) {
      onClick();
    } else {
      setErrorMessage(t('messages.quantity'));
    }
  };
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
      {itemMetaData && (
        <CardContent>
          <p className="text-med-fw700  p-0 ">{t('dialog.details')}</p>

          {location && (
            <div className="sm-flex-row-row-center-between">
              <Stack
                direction={'row'}
                alignItems={'center'}
                gap={1}
              >
                <PlaceSVG /> {t('dialog.location')}
              </Stack>
              <p>{location}</p>
            </div>
          )}

          {itemMetaData.map((item: any) => {
            let SvgIcon = metadataIcons(item?.itemMetaKey?.slug);
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
                    {SvgIcon && <SvgIcon />}

                    {metadataKeys(item?.itemMetaKey?.slug, t)}
                  </Stack>
                  <p>{item.value}</p>
                </div>
              </Box>
            );
          })}

          <LoadingButton
            loading={loading}
            className={'general-button-primary mt-1'}
            onClick={handleSubmit}
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
