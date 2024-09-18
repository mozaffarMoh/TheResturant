import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Paper,
  Stack,
} from '@mui/material';
import { ClockSVG, PlaceSVG } from '../../../../assets/icons';
import { useTranslations } from 'next-intl';
import { DefautImage1 } from '@/constant/images';
import { domain } from '@/base-api/endPoints';
import { primaryColor } from '@/constant/color';
import { metadataIcons } from '@/constant/metadataIcons';

const AnnounceCard = ({ item, handleShowDetails }: any) => {
  const t = useTranslations();
  let imageURL =
    item && item?.media?.main_image?.[0]?.url
      ? domain + item?.media?.main_image?.[0]?.url
      : DefautImage1;

  const stripHTML = (html: string) => {
    if (html) {
      const div = document.createElement('div');
      div.innerHTML = html;
      return div.textContent || div.innerText || '';
    } else {
      return '';
    }
  };

  const plainText = stripHTML(item?.description);
  const truncatedText =
    plainText.length > 200 ? plainText.substring(0, 200) + '...' : plainText;

  return (
    <Paper
      className="event-card-paper"
      style={{ padding: '0px' }}
    >
      <Card
        sx={{
          display: 'flex',
          border: 'none',
          boxShadow: 'none',
          backgroundColor: 'whitesmoke',
        }}
      >
        <Grid container>
          {/* Image section */}
          <Grid
            item
            xs={12}
            md={6}
            display={'flex'}
            alignItems={'flex-end'}
          >
            <CardMedia
              component="img"
              sx={{
                width: '90%',
                height: '300px',
                minHeight: '12rem',
                borderRadius: '1.1rem',
              }}
              image={imageURL}
              alt="Live from space album cover"
            />
          </Grid>
          {/* title,subtitle,buttons section */}
          <Grid
            item
            xs={12}
            md={6}
          >
            <p className="general-title-v2  primary-color  fw600">
              {item?.title}
              {item?.category && (
                <Button
                  variant="contained"
                  sx={{
                    borderRadius: '50px',
                    marginX: 2,
                    fontSize: '11px',
                    height: '23px',
                    background: '#EB6B2A',
                    boxShadow: 'none',
                    '&:hover': {
                      background: '#EB6B2A',
                      cursor: 'default',
                      boxShadow: 'none',
                    },
                  }}
                >
                  {item?.category}
                </Button>
              )}
            </p>
            <p className="text-med-fw400 ">{truncatedText}</p>

            <Stack
              direction={'row'}
              gap={1}
            >
              {item?.place && item?.place?.name && (
                <Stack
                  direction={'row'}
                  alignItems={'center'}
                >
                  <PlaceSVG />
                  <span
                    style={{ marginInline: '0.4rem' }}
                    className="text-med-fw400  opacity-80"
                  >
                    {' '}
                    {item?.place && item?.place?.name}
                  </span>{' '}
                </Stack>
              )}

              {item?.itemMetaData &&
                item?.itemMetaData?.map((val: any, i: number) => {
                  if (
                    val?.itemMetaKey?.slug == 'time' ||
                    val?.itemMetaKey?.slug == 'date'
                  ) {
                    let SvgIcon = metadataIcons(val?.itemMetaKey?.slug);
                    return (
                      <Stack
                        key={i}
                        direction={'row'}
                        alignItems={'center'}
                      >
                        {SvgIcon && <SvgIcon />}
                        <bdi
                          style={{ marginInline: '0.4rem' }}
                          className="text-med-fw400  opacity-80"
                        >
                          {val?.value}{' '}
                        </bdi>
                      </Stack>
                    );
                  }
                })}
            </Stack>

            <Button
              variant="outlined"
              style={{
                borderRadius: '50px',
                paddingInline: '2rem',
                marginTop: 10,
                marginBottom: 1,
                color: primaryColor,
                borderColor: primaryColor,
              }}
              onClick={() => handleShowDetails(item?.slug)}
            >
              {t('buttons.view')}
            </Button>
          </Grid>
        </Grid>
      </Card>
    </Paper>
  );
};

export default AnnounceCard;
