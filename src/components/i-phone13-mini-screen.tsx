import type { NextPage } from "next";
import styles from "./i-phone13-mini-screen.module.css";

export type IPhone13MiniScreenType = {
  className?: string;
};

const IPhone13MiniScreen: NextPage<IPhone13MiniScreenType> = ({
  className = "",
}) => {
  return (
    <div className={[styles.iphone13MiniScreen, className].join(" ")}>
      <img className={styles.pasteHereIcon} alt="" src="/paste-here@2x.png" />
      <div className={styles.iphone13Mini22}>
        <div className={styles.fixedHeader}>
          <div className={styles.headerContent}>
            <div className={styles.termsOfUseParent}>
              <b className={styles.termsOfUse}>Terms of Use</b>
              <div className={styles.lastUpdatedOn}>
                Last updated on 6/12/2024
              </div>
            </div>
          </div>
          <div className={styles.fixedHeaderChild} />
        </div>
        <div className={styles.bodyContent}>
          <div className={styles.body}>
            <div className={styles.jenBiography}>
              <b className={styles.clause1}>
                <ol className={styles.clause11}>
                  <li>Clause 1</li>
                </ol>
              </b>
              <div className={styles.loremIpsumDolor}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra
                condimentum eget purus in. Consectetur eget id morbi amet amet,
                in. Ipsum viverra pretium tellus neque. Ullamcorper suspendisse
                aenean leo pharetra in sit semper et. Amet quam placerat sem.
              </div>
            </div>
            <div className={styles.jenBiography1}>
              <b className={styles.clause2}>2. Clause 2</b>
              <div className={styles.loremIpsumDolorContainer}>
                <p className={styles.loremIpsumDolor1}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Viverra condimentum eget purus in. Consectetur eget id morbi
                  amet amet, in. Ipsum viverra pretium tellus neque. Ullamcorper
                  suspendisse aenean leo pharetra in sit semper et. Amet quam
                  placerat sem.
                </p>
                <p className={styles.blankLine}>&nbsp;</p>
                <p className={styles.loremIpsumDolor2}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Viverra condimentum eget purus in. Consectetur eget id morbi
                  amet amet, in. Ipsum viverra pretium tellus neque. Ullamcorper
                  suspendisse aenean leo pharetra in sit semper et. Amet quam
                  placerat sem.
                </p>
              </div>
            </div>
            <div className={styles.jenBiography2}>
              <b className={styles.clause3}>3. Clause 3</b>
              <div className={styles.loremIpsumDolorContainer1}>
                <p className={styles.loremIpsumDolor3}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Viverra condimentum eget purus in. Consectetur eget id morbi
                  amet amet, in. Ipsum viverra pretium tellus neque. Ullamcorper
                  suspendisse aenean leo pharetra in sit semper et. Amet quam
                  placerat sem.
                </p>
                <p className={styles.blankLine1}>&nbsp;</p>
                <p className={styles.loremIpsumDolor4}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Viverra condimentum eget purus in. Consectetur eget id morbi
                  amet amet, in. Ipsum viverra pretium tellus neque. Ullamcorper
                  suspendisse aenean leo pharetra in sit semper et. Amet quam
                  placerat sem.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.scrollbar}>
          <div className={styles.scrollbarTrackParent}>
            <div className={styles.scrollbarTrack} />
            <div className={styles.scrollbarThumb} />
          </div>
        </div>
        <img
          className={styles.iphone13Mini22Child}
          loading="lazy"
          alt=""
          src="/group-1000006080.svg"
        />
      </div>
    </div>
  );
};

export default IPhone13MiniScreen;
