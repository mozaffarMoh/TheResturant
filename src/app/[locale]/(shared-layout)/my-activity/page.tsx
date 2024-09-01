'use client';
import { primaryColor, secondaryColor } from '@/constant/color';
import {
  Container,
  Pagination,
  PaginationItem,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { endPoints } from '@/base-api/endPoints';
import Cookies from 'js-cookie';
import useGet from '@/custom-hooks/useGet';
import {
  ArrowBackIosNewRounded,
  ArrowForwardIosRounded,
} from '@mui/icons-material';
import { usePathname } from 'next/navigation';
import usePost from '@/custom-hooks/usePost';

const MyActivity = () => {
  const t = useTranslations();
  const token = Cookies.get('token') || '';
  const pathname = usePathname();
  let isArabic = pathname.startsWith('/ar');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [isClientSide, setIsClientSide] = useState(false);
  const labels = [
    t('my-activity.id'),
    t('my-activity.description'),
    t('my-activity.date'),
    t('my-activity.time'),
  ];

  const body = {
    modelName: 'Order',
    filters: {
      'user.id': 'm_auth_t_user_g',
    },
    fields: ['id', 'created_at'],
    relations: {
      orderType: {
        fields: ['name'],
      },
    },
    'with-pagination': true,
    limit: 15,
    page: page,
  };

  const [data, loading, getData, success, , , , fullData] = usePost(
    endPoints.DynamicFilter,
    body,
    token,
  );

  const handleChange = (e: any, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    getData();
    setIsClientSide(true);
  }, []);

  useEffect(() => {
    if (success) {
      let totalNum = fullData?.meta?.total || 0;
      const paginationCount = Math.ceil(totalNum / 15);
      setTotal(paginationCount);
      //page == 0 && setPage(1);
    }
  }, [success]);

  useEffect(() => {
    total > 0 && getData();
  }, [page]);

  return (
    <Container maxWidth="lg">
      {' '}
      {isClientSide && (
        <head>
          <title>{t('metadata.my_activity')}</title>
          <meta
            name="description"
            content="Welcome to the My-Activity page of The Platform Website"
          />
        </head>
      )}{' '}
      <Stack
        paddingY={5}
        gap={7}
      >
        <Stack textAlign={'center'}>
          <Typography
            color={primaryColor}
            variant="h4"
            fontWeight={600}
          >
            {t('header.my-activity')}
          </Typography>
        </Stack>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {labels.map((label: string, i: number) => (
                  <TableCell
                    key={i}
                    align="center"
                    sx={{ backgroundColor: primaryColor, color: 'white' }}
                  >
                    {label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {loading && !success
                ? // Render Skeletons when loading
                  Array.from(new Array(15)).map((_, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Skeleton variant="text" />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="text" />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="text" />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="text" />
                      </TableCell>
                    </TableRow>
                  ))
                : data &&
                  data.map((activity: any) => {
                    let date = activity?.created_at
                      ? activity?.created_at?.split(' ')?.[0]
                      : '';
                    let time = activity?.created_at
                      ? activity?.created_at?.split(' ')?.[1]
                      : '';

                    return (
                      <TableRow key={activity.id}>
                        <TableCell align="center">{activity?.id}</TableCell>
                        <TableCell align="center">
                          {activity?.orderType?.name}
                        </TableCell>
                        <TableCell align="center">{date}</TableCell>
                        <TableCell align="center">{time}</TableCell>
                      </TableRow>
                    );
                  })}
            </TableBody>
          </Table>
        </TableContainer>

        <Stack
          alignItems={'center'}
          paddingBottom={10}
        >
          <Pagination
            page={page}
            count={total}
            onChange={handleChange}
            siblingCount={2} // Number of siblings to show around the current page
            renderItem={(item) => (
              <PaginationItem
                {...item}
                sx={{
                  color: '#3F485E',
                  '&.Mui-selected': {
                    backgroundColor: '#3F485E',
                    color: '#fff',
                    '&:hover': { backgroundColor: '#3F485EDD' },
                  },
                }}
                slots={{
                  previous: isArabic
                    ? ArrowForwardIosRounded
                    : ArrowBackIosNewRounded,
                  next: isArabic
                    ? ArrowBackIosNewRounded
                    : ArrowForwardIosRounded,
                }}
              />
            )}
          />
        </Stack>
      </Stack>
    </Container>
  );
};

export default MyActivity;
