'use client';
import { Button, Container, Grid, Stack } from '@mui/material';
import styles from './work-shops.module.css';
import { primaryColor } from '@/constant/color';
import { ArrowLeft, ArrowRight } from '@mui/icons-material';
import WorkShopCardV1 from '@/components/cards/home-section/WorkShopCardV1';
import WorkShopCardV2 from '@/components/cards/home-section/WorkShopCardV2';
import { useTranslations } from 'next-intl';
import { endPoints } from '@/base-api/endPoints';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { usePathname, useRouter } from 'next/navigation';
import usePost from '@/custom-hooks/usePost';

const WorkShopsSection = () => {
  const t = useTranslations();
  const router = useRouter();
  const langCookie = Cookies.get('NEXT_LOCALE') || 'en';
  const pathname = usePathname();
  let isArabic = pathname.startsWith('/ar');

  const body = {
    modelName: 'Item',
    filters: { 'itemType.slug': 'News' },
    fields: ['slug', 'title', 'subTitle', 'media'],
    add_fields: {
      categories: 'first,name,category',
    },
    'with-pagination': false,
  };

  const [data, , getData] = usePost(endPoints.DynamicFilter, body);

  useEffect(() => {
    getData();
  }, []);

//  console.log(data);

  return (
    <section
      style={{
        width: '100%',
        paddingTop: '1rem',
        paddingBottom: '1rem',
        backgroundColor: primaryColor,
      }}
    >
      <Container maxWidth="lg">
        <div className="sm-flex-col-col-center-center  ">
          <div className="mt-2 w-full md-padding-start-1 ">
            <div
              className="sm-flex-colo-col  md-margin-0 "
              style={{ marginLeft: '10px', marginRight: '10px' }}
            >
              <div className="general-title  text-white-new">
                {t('header.news')}
              </div>
              {/* cards horizontal cards  section */}
              {/*                 <div className={styles.workShopCardsContainer}>
                  <div className={styles.leftCardsContainer}>
                    <div className="sm-flex-col-col-center-center gap1">
                      {data &&
                        data.length > 1 &&
                        data.map(
                          (item: any, i: number) =>
                            i > 1 &&
                            i < 5 && (
                              <WorkShopCardV1
                                key={i}
                                title={item.title}
                                metadata={item.metadata}
                                place={item.place}
                              />
                            ),
                        )}
                    </div>
                  </div> */}

              {/* cards Vertical cards  section */}
              <Stack
                direction={'row'}
                justifyContent={'space-evenly'}
                flexWrap={'wrap'}
                marginTop={5}
              >
                {data &&
                  data.length > 0 &&
                  data.map((item: any, i: number) => {
                    if (i < 3) {
                      return (
                        <div className={styles.rightCardsContainer}>
                          <div>
                            <div className="sm-flex-row-col-center-center">
                              <WorkShopCardV2
                                key={i}
                                title={item?.title}
                                subTitle={item?.subTitle}
                                media={item?.media}
                              />
                            </div>
                          </div>
                        </div>
                      );
                    }
                  })}
              </Stack>

              <div className="mt-2 sm-flex-row-row-center-end  m-inline-end-2">
                <Button
                  variant="outlined"
                  sx={{
                    border: 'none',
                    paddingInline: '2rem',
                    color: 'white',
                    textDecoration: 'none',
                    '&:hover': {
                      border: 'none',
                      textDecoration: 'underline',
                    },
                  }}
                  onClick={() =>
                    router.push(`/${langCookie}/home/industry/news`)
                  }
                  endIcon={isArabic ? <ArrowLeft /> : <ArrowRight />}
                >
                  {t('buttons.view')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default WorkShopsSection;
