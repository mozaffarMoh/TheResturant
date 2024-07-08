'use client';
import type { NextPage } from 'next';
import { useCallback } from 'react';
import { useRouter } from 'next/navigation';

import GroupComponent2 from '@/components/group-component2';
import styles from './page.module.css';

const Details: NextPage = () => {
  const router = useRouter();

  const onGroupContainerClick = useCallback(() => {
    router.push('/sign-up');
  }, [router]);

  const onGroupContainerClick1 = useCallback(() => {
    router.push('/entrepreneurs-details');
  }, [router]);

  return (
    <div className={styles.details}>
      <section className={styles.frameParent}>
        <div className={styles.frameWrapper}>
          <div className={styles.roleSelectionParent}>
            <div className={styles.roleSelection}>
              <div className={styles.logoWrapper}>
                <img
                  className={styles.logoIcon}
                  loading="lazy"
                  alt=""
                  src="/logo2.svg"
                />
              </div>
              <div className={styles.userSelection}>
                <h1 className={styles.whoAreYouContainer}>
                  <span>{`Who are `}</span>
                  <span className={styles.you}>{`you ? `}</span>
                </h1>
              </div>
              <div className={styles.roleOptions}>
                <div className={styles.component30}>
                  <div className={styles.component30Child} />
                </div>
                <h3 className={styles.student}>
                  <p className={styles.student1}>student</p>
                  <p className={styles.blankLine}>&nbsp;</p>
                  <p className={styles.blankLine1}>&nbsp;</p>
                  <p className={styles.blankLine2}>&nbsp;</p>
                  <p className={styles.blankLine3}>&nbsp;</p>
                </h3>
              </div>
              <div className={styles.roleOptions1}>
                <div className={styles.component31}>
                  <div className={styles.component31Child} />
                </div>
                <h3 className={styles.mentor}> Mentor</h3>
              </div>
              <div className={styles.roleOptions2}>
                <div className={styles.component32}>
                  <div className={styles.component32Child} />
                </div>
                <h3 className={styles.entrepreneurs}>Entrepreneurs</h3>
              </div>
            </div>
            <div className={styles.selectionContainerWrapper}>
              <div className={styles.selectionContainer}>
                <div className={styles.instruction}>
                  <div className={styles.pleaseSelectOnly}>
                    Please select only one
                  </div>
                </div>
                <div className={styles.navigation}>
                  <div className={styles.backButtonContainer}>
                    <div className={styles.backButtonContainerInner}>
                      <div className={styles.vectorParent}>
                        <img
                          className={styles.vectorIcon}
                          loading="lazy"
                          alt=""
                          src="/vector.svg"
                        />
                        <img
                          className={styles.vectorIcon1}
                          loading="lazy"
                          alt=""
                          src="/vector.svg"
                        />
                      </div>
                    </div>
                    <div
                      className={styles.backParent}
                      onClick={onGroupContainerClick}
                    >
                      <h2 className={styles.back}>Back</h2>
                      <div className={styles.frameChild} />
                    </div>
                  </div>
                  <div className={styles.nextButtonContainer}>
                    <div
                      className={styles.nextParent}
                      onClick={onGroupContainerClick1}
                    >
                      <h2 className={styles.next}> Next</h2>
                      <div className={styles.frameItem} />
                    </div>
                    <div className={styles.nextButtonContainerInner}>
                      <div className={styles.vectorGroup}>
                        <img
                          className={styles.vectorIcon2}
                          loading="lazy"
                          alt=""
                          src="/vector.svg"
                        />
                        <img
                          className={styles.vectorIcon3}
                          loading="lazy"
                          alt=""
                          src="/vector.svg"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.containerParent}>
          <img
            className={styles.containerIcon}
            loading="lazy"
            alt=""
            src="/container1@2x.png"
          />
          <h1 className={styles.whoAreYouContainer1}>
            <span>{`Who are `}</span>
            <span className={styles.you1}>{`you ? `}</span>
          </h1>
          <h3 className={styles.loremIpsumIs}>{`Lorem Ipsum is simply `}</h3>
        </div>
      </section>
      <GroupComponent2 />
    </div>
  );
};

export default Details;
