import type { NextPage } from "next";
import styles from "./group-component1.module.css";

export type GroupComponentType = {
  className?: string;
};

const GroupComponent: NextPage<GroupComponentType> = ({ className = "" }) => {
  return (
    <div className={[styles.containerParent, className].join(" ")}>
      <img
        className={styles.containerIcon}
        loading="lazy"
        alt=""
        src="/container@2x.png"
      />
      <h1 className={styles.signUpTo}>Sign Up to name</h1>
      <div className={styles.loremIpsumIs}>{`Lorem Ipsum is simply `}</div>
    </div>
  );
};

export default GroupComponent;
