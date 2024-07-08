import type { NextPage } from 'next';
import IPhone13MiniScreen from './i-phone13-mini-screen';
import styles from './frame-component.module.css';

export type FrameComponentType = {
  className?: string;
};

const FrameComponent: NextPage<FrameComponentType> = ({ className = '' }) => {
  return (
    <div className={[styles.logoParent, className].join(' ')}>
      <img
        className={styles.logoIcon}
        loading="lazy"
        alt=""
        src="/logo.svg"
      />
      <div className={styles.logoBg} />
      <IPhone13MiniScreen />
    </div>
  );
};

export default FrameComponent;
