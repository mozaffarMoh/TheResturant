import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";
import styles from "./group-component2.module.css";

export type GroupComponent2Type = {
  className?: string;

  /** Style props */
  propMarginRight?: CSSProperties["marginRight"];
};

const GroupComponent2: NextPage<GroupComponent2Type> = ({
  className = "",
  propMarginRight,
}) => {
  const groupSectionStyle: CSSProperties = useMemo(() => {
    return {
      marginRight: propMarginRight,
    };
  }, [propMarginRight]);

  return (
    <section
      className={[styles.footerWrapper, className].join(" ")}
      style={groupSectionStyle}
    >
      <div className={styles.footer}>
        <footer className={styles.bg} />
        <div className={styles.socialMedia}>
          <div className={styles.socialMediaIcons}>
            <div className={styles.div}></div>
            <div className={styles.div1}></div>
            <div className={styles.div2}></div>
            <div className={styles.div3}></div>
          </div>
        </div>
        <div className={styles.newsletter}>
          <div className={styles.newsletterBackground} />
          <div className={styles.inner}>
            <div className={styles.pageH1Center} />
          </div>
          <div className={styles.newsletterInput} />
          <div className={styles.newsletterButton} />
        </div>
        <div className={styles.bottom}>
          <div className={styles.copyrightBackground} />
          <div className={styles.copyrightContent}>
            <div className={styles.copyrightNoticeContainerParent}>
              <div className={styles.copyrightNoticeContainer}>
                <div className={styles.copyright2024theplatformContainer}>
                  <span>Copyright © 2024ThePlatform . All Right Reserved.</span>
                </div>
              </div>
              <div className={styles.languange}>
                <div className={styles.languageDropdown} />
                <div className={styles.english}>English</div>
                <div className={styles.downArrow1Wrapper}>
                  <img
                    className={styles.downArrow1Icon}
                    alt=""
                    src="/downarrow-1@2x.png"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <h1 className={styles.subscribeOurNewsletter}>
          Subscribe our newsletter
        </h1>
        <div className={styles.yourDownloadShould}>
          Your download should start automatically, if not Click here. Should I
          give up, huh?.
        </div>
        <div className={styles.component2}>
          <input className={styles.inputFields} type="text" />
          <div className={styles.enterYourEmail}>Enter your email</div>
          <div className={styles.inputFields1} />
          <div className={styles.subscribeButtonContainer}>
            <div className={styles.subscribe}>Subscribe</div>
          </div>
        </div>
        <div className={styles.modeeInfo}>
          <b className={styles.modee}> modee</b>
          <div className={styles.ministerofficemodeegovjo00Wrapper}>
            <div className={styles.ministerofficemodeegovjo00}>
              <p className={styles.ministerofficemodeegovjo}>
                MinisterOffice@modee.gov.jo
              </p>
              <p className={styles.p}>0096265805700</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GroupComponent2;
