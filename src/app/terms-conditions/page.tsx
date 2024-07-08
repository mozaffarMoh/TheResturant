'use client';
import type { NextPage } from 'next';
import { useCallback } from 'react';
import GroupComponent from '@/components/group-component';
import { useRouter } from 'next/navigation';

import GroupComponent1 from '@/components/group-component1';
import FrameComponent from '@/components/frame-component';
import styles from './page.module.css';

const TermsConditionAndPrivacyPo: NextPage = () => {
  const router = useRouter();

  const onGroupContainerClick = useCallback(() => {
    router.push('/details');
  }, [router]);

  return (
    <div className={styles.termsConditionAndPrivacyPo}>
      <GroupComponent />
      <div
        className={styles.frameParent}
        onClick={onGroupContainerClick}
      >
        <div className={styles.nextParent}>
          <div className={styles.next}> Next</div>
          <div className={styles.frameChild} />
        </div>
        <img
          className={styles.vectorIcon}
          alt=""
          src="/vector.svg"
        />
        <img
          className={styles.vectorIcon1}
          alt=""
          src="/vector.svg"
        />
      </div>
      <GroupComponent1 />
      <div className={styles.signUp}>Sign up</div>
      <div className={styles.ifYouAlready}>
        If you already have an account register
      </div>
      <div className={styles.youCanLoginContainer}>
        <span className={styles.youCan}>{`You can   `}</span>
        <span className={styles.loginHere}>Login here !</span>
      </div>
      <div className={styles.emailParent}>
        <div className={styles.email}>Email</div>
        <div className={styles.enterYourEmail}>Enter your email address</div>
        <div className={styles.instanceChild} />
        <img
          className={styles.message1Icon}
          alt=""
          src="/message-1.svg"
        />
      </div>
      <div className={styles.termsConditionAndPrivacyPoChild} />
      <div className={styles.confrimYourPassword}>Confrim your Password</div>
      <img
        className={styles.padlock1Icon}
        loading="lazy"
        alt=""
        src="/padlock-1.svg"
      />
      <img
        className={styles.invisible1Icon}
        alt=""
        src="/invisible-1.svg"
      />
      <div className={styles.password}>Password</div>
      <div className={styles.termsConditionAndPrivacyPoItem} />
      <div className={styles.enterYourPassword}>Enter your Password</div>
      <img
        className={styles.padlock1Icon1}
        loading="lazy"
        alt=""
        src="/padlock-1.svg"
      />
      <img
        className={styles.invisible1Icon1}
        loading="lazy"
        alt=""
        src="/invisible-1.svg"
      />
      <div className={styles.termsConditionAnd}>
        terms condition and privacy policy
      </div>
      <div className={styles.color} />
      <img
        className={styles.iconColor2}
        alt=""
        src="/-icon-color2.svg"
      />
      <FrameComponent />
    </div>
  );
};

export default TermsConditionAndPrivacyPo;
