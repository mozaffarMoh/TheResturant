'use client';
import { primaryColor } from '@/constant/color';
import {
  Box,
  Container,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import './Statistics.css';
import { useTranslations } from 'next-intl';

const Statistics = () => {
  const theme = useTheme();
  const t = useTranslations();

  return (
    <Container className={'statistics-section'}>
      <Stack
        direction={'row'}
        justifyContent={'space-between'}
        sx={{
          padding: theme.spacing(2),
        }}
      >
        <StatItem
          label=  {t('subTitles.happyCustomers')}
          value="15K"
        />
        <StatItem
          label={t('subTitles.differentLocations')}
          value="500+"
        />
        <StatItem
          label={t('subTitles.monthlyVisitors')}
          value="150K"
        />
        <StatItem
          label={t('subTitles.topPartners')}
          value="100+"
        />
      </Stack>
    </Container>
  );
};

const StatItem = ({ label, value }: { label: string; value: string }) => {
  const isScreen450 = useMediaQuery('(max-width:450px)');
  const valueNum = value.slice(0, value.length - 1);
  const valueSign = value.slice(-1);
  return (
    <Box textAlign="center">
      <Typography
        variant={isScreen450 ? 'h6' : 'h4'}
        color={primaryColor}
        fontWeight={700}
      >
        <bdi>
          {valueNum}
          <span style={{ color: 'orange' }}>{valueSign}</span>
        </bdi>
      </Typography>
      <Typography
        variant="body2"
        fontWeight={600}
      >
        {label}
      </Typography>
    </Box>
  );
};

export default Statistics;
