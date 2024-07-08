import type { NextPage } from "next";
import styles from "./group-component.module.css";

export type GroupComponent1Type = {
  className?: string;
  downArrow1?: string;
};

const GroupComponent1: NextPage<GroupComponent1Type> = ({
  className = "",
  downArrow1,
}) => {
  return (
    <section className={[styles.footerWrapper, className].join(" ")}>
      <div className={styles.footer}>
        <footer className={styles.bg} />
        <div className={styles.footerContent}>
          <div className={styles.parent}>
            <div className={styles.div}></div>
            <div className={styles.div1}></div>
            <div className={styles.div2}></div>
            <div className={styles.div3}></div>
          </div>
        </div>
        <div className={styles.newsletter}>
          <div className={styles.newsletterChild} />
          <div className={styles.inner}>
            <div className={styles.pageH1Center} />
          </div>
          <div className={styles.newsletterItem} />
          <div className={styles.newsletterInner} />
        </div>
        <div className={styles.bottom}>
          <div className={styles.bottomBg} />
          <div className={styles.bottomInner}>
            <div className={styles.frameParent}>
              <div className={styles.copyright2024theplatformWrapper}>
                <div className={styles.copyright2024theplatformContainer}>
                  <span>Copyright © 2024ThePlatform . All Right Reserved.</span>
                </div>
              </div>
              <div className={styles.languange}>
                <div className={styles.dropdownBg} />
                <div className={styles.english}>English</div>
                <div className={styles.downArrow1Wrapper}>
                  <img
                    className={styles.downArrow1Icon}
                    alt=""
                    src={downArrow1}
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
          <div className={styles.subscribeWrapper}>
            <div className={styles.subscribe}>Subscribe</div>
          </div>
        </div>
        <div className={styles.modeeParent}>
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

export default GroupComponent1;
