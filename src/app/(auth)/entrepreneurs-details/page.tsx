'use client';
import type { NextPage } from 'next';
import { useCallback } from 'react';
import { useRouter } from 'next/navigation';

import styles from './page.module.css';

const EntrepreneursDetails: NextPage = () => {
  const router = useRouter();

  const onPersonalInfoFieldsClick = useCallback(() => {
    // Please sync "13_home" to the project
  }, []);

  const onGroupContainerClick = useCallback(() => {
    router.push('/sign-up');
  }, [router]);

  const onGroupContainerClick1 = useCallback(() => {
    router.push('/entrepreneurs-details');
  }, [router]);

  return (
    <div className={styles.entrepreneursDetails}>
      <main className={styles.frameParent}>
        <div className={styles.frameWrapper}>
          <div className={styles.frameGroup}>
            <div className={styles.frameContainer}>
              <div className={styles.frameDiv}>
                <div className={styles.logoWrapper}>
                  <img
                    className={styles.logoIcon}
                    loading="lazy"
                    alt=""
                    src="/logo1.svg"
                  />
                </div>
                <h1 className={styles.entrepreneursDetails1}>
                  <span>Entrepreneurs</span>
                  <span className={styles.details}> details</span>
                  <span>!</span>
                </h1>
              </div>
            </div>
            <div className={styles.frameParent1}>
              <div className={styles.frameParent2}>
                <div className={styles.personalInfoFieldsWrapper}>
                  <div
                    className={styles.personalInfoFields}
                    onClick={onPersonalInfoFieldsClick}
                  >
                    <div className={styles.personalInfoFieldsChild} />
                    <div className={styles.personalInfoFieldsItem} />
                    <div className={styles.personalInfoFieldsInner} />
                    <div className={styles.fullName}>Full Name</div>
                    <input
                      className={styles.personalInfoLabels}
                      type="text"
                    />
                    <div className={styles.rectangleDiv} />
                    <div className={styles.personalInfoFieldsChild1} />
                    <div className={styles.personalInfoFieldsChild2} />
                    <div className={styles.personalInfoFieldsChild3} />
                    <div className={styles.personalInfoLabels1} />
                    <div className={styles.personalInfoFieldsChild4} />
                    <div className={styles.frameParent3}>
                      <div className={styles.personalInformationWrapper}>
                        <div className={styles.personalInformation}>
                          Personal Information
                        </div>
                      </div>
                      <input
                        className={styles.frameChild}
                        type="text"
                      />
                      <div className={styles.nationalpersonalNumberWrapper}>
                        <div className={styles.nationalpersonalNumber}>
                          National/personal number
                        </div>
                      </div>
                    </div>
                    <div className={styles.personalInfoFieldsChild5} />
                    <div className={styles.phoneNumber}>phone number</div>
                    <div className={styles.lineDiv} />
                    <div className={styles.personalInfoFieldsChild6} />
                    <div className={styles.demographicFields}>
                      <div className={styles.ageGenderFieldsParent}>
                        <input
                          className={styles.ageGenderFields}
                          placeholder="Age"
                          type="text"
                        />
                        <div className={styles.ageGenderIcons}>
                          <div className={styles.ageGenderIconsChild} />
                          <img
                            className={styles.ageGenderIconsItem}
                            alt=""
                            src="/polygon-3.svg"
                          />
                        </div>
                      </div>
                      <div className={styles.frameParent4}>
                        <input
                          className={styles.frameItem}
                          placeholder="Gender"
                          type="text"
                        />
                        <div className={styles.rectangleParent}>
                          <div className={styles.frameInner} />
                          <img
                            className={styles.polygonIcon}
                            alt=""
                            src="/polygon-3.svg"
                          />
                        </div>
                      </div>
                      <div className={styles.contactFields}>
                        <div className={styles.phoneNumberFieldsParent}>
                          <input
                            className={styles.phoneNumberFields}
                            placeholder="Phone Number"
                            type="text"
                          />
                          <div className={styles.emailField}>
                            <div className={styles.emailFieldChild} />
                            <img
                              className={styles.emailIcon}
                              alt=""
                              src="/polygon-3.svg"
                            />
                          </div>
                        </div>
                        <div className={styles.frameParent5}>
                          <div className={styles.frameWrapper1}>
                            <div className={styles.rectangleGroup}>
                              <div className={styles.frameChild1} />
                              <img
                                className={styles.phoneIcon}
                                alt=""
                                src="/polygon-3.svg"
                              />
                            </div>
                          </div>
                          <div className={styles.email}>Email</div>
                        </div>
                      </div>
                      <div className={styles.targetCustomersParent}>
                        <div className={styles.targetCustomers}>
                          Target customers
                        </div>
                        <div className={styles.rectangleContainer}>
                          <div className={styles.frameChild2} />
                          <input
                            className={styles.eMail}
                            placeholder="E-mail"
                            type="text"
                          />
                        </div>
                      </div>
                    </div>
                    <div className={styles.personalInfoLabels2} />
                  </div>
                </div>
                <div className={styles.frameChild3} />
              </div>
              <div className={styles.rectangleWrapper}>
                <div className={styles.frameChild4} />
              </div>
            </div>
            <div className={styles.navigationContainer}>
              <div className={styles.backButtonContainer}>
                <div className={styles.frameParent6}>
                  <div className={styles.backButtonIconsWrapper}>
                    <div className={styles.backButtonIcons}>
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
                    <h3 className={styles.back}>Back</h3>
                    <div className={styles.frameChild5} />
                  </div>
                </div>
                <div className={styles.continueButtonContainer}>
                  <div
                    className={styles.continueParent}
                    onClick={onGroupContainerClick1}
                  >
                    <h3 className={styles.continue}>Continue</h3>
                    <div className={styles.frameChild6} />
                  </div>
                  <div className={styles.forwardButtonIconsWrapper}>
                    <div className={styles.forwardButtonIcons}>
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
        <div className={styles.containerParent}>
          <img
            className={styles.containerIcon}
            alt=""
            src="/container@2x.png"
          />
          <h1 className={styles.fillInYour}>
            Fill in your Entrepreneurs details and let's get started
          </h1>
          <div className={styles.lookForwardTo}>look forward to success</div>
        </div>
      </main>
    </div>
  );
};

export default EntrepreneursDetails;
