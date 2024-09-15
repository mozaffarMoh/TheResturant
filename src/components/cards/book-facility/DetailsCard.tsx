import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Divider from '@mui/joy/Divider';
import './detail-card.css';
import { Button } from '@mui/material';
import { useTranslations } from 'next-intl';
import { metadataIcons } from '@/constant/metadataIcons';
import { metadataKeys } from '@/constant/metadataKeys';

export default function DetailsCard({ facility, onClick }: any) {
  const t = useTranslations();

  return (
    <Card
      variant="outlined"
      sx={{
        width: 280,
        paddingTop: '1rem',
        borderRadius: '1.1rem',
        margin: '0.2rem',
      }}
    >
      <CardContent>
        <p className="text-med-fw700  p-0 ">{t('dialog.details')}</p>

        {facility?.itemMetaData &&
          facility.itemMetaData.map((item: any) => {
            let SvgIcon = metadataIcons(item.slug);

            return (
              item.slug !== 'capacity-range' && (
                <div key={item.id}>
                  <div className="sm-flex-row-row-center-between">
                    <span>
                      <span style={{ margin: '0px 4px' }}>
                        {' '}
                        {SvgIcon && <SvgIcon />}
                      </span>
                      {metadataKeys(item?.itemMetaKey?.slug, t)}
                    </span>
                    <p>{item.value}</p>
                  </div>
                  <Divider
                    sx={{
                      backgroundColor: 'rgb(200,200,200,0.5)',
                      borderRadius: '4px',
                      marginTop: '-.2rem',
                    }}
                  />
                </div>
              )
            );
          })}

        <Button
          className="general-button-primary mt-1"
          onClick={onClick}
        >
          {t('buttons.book-now')}
        </Button>
      </CardContent>
    </Card>
  );
}
