'use client';
import type { NextPage } from 'next';
import { useCallback } from 'react';
import GroupComponent from '@/components/group-component';
import { useRouter } from 'next/navigation';
import GroupComponent1 from '@/components/group-component1';
import styles from './page.module.css';

const SignUp: NextPage = () => {
  const router = useRouter();

  const onGroupContainerClick = useCallback(() => {
    router.push('/details');
  }, [router]);

  return (
    <div className={styles.signUp}>
      <GroupComponent />
      <div
        className={styles.nextButtonParent}
        onClick={onGroupContainerClick}
      >
        <div className={styles.nextButton}>
          <h3 className={styles.next}> Next</h3>
          <div className={styles.nextButtonChild} />
        </div>
        <div className={styles.progressContainer}>
          <div className={styles.progressDots}>
            <img
              className={styles.progressDotIcon}
              loading="lazy"
              alt=""
              src="/vector.svg"
            />
            <img
              className={styles.progressDotIcon1}
              loading="lazy"
              alt=""
              src="/vector.svg"
            />
          </div>
        </div>
      </div>
      <img
        className={styles.logoIcon}
        loading="lazy"
        alt=""
        src="/logo1.svg"
      />
      <GroupComponent1 />
      <h2 className={styles.signUp1}>Sign up</h2>
      <div className={styles.ifYouAlready}>
        If you already have an account register
      </div>
      <div className={styles.youCanLoginContainer}>
        <span className={styles.youCan}>{`You can   `}</span>
        <span className={styles.loginHere}>Login here !</span>
      </div>
      <div className={styles.emailParent}>
        <div className={styles.email}>Email</div>
        <div className={styles.emailFieldContainer}>
          <div className={styles.messageContainer}>
            <img
              className={styles.message1Icon}
              alt=""
              src="/message-1.svg"
            />
          </div>
          <input
            className={styles.enterYourEmail}
            placeholder="Enter your email address"
            type="text"
          />
        </div>
        <div className={styles.instanceChild} />
      </div>
      <div className={styles.passwordInput} />
      <div className={styles.confrimYourPassword}>Confrim your Password</div>
      <img
        className={styles.padlock1Icon}
        loading="lazy"
        alt=""
        src="/padlock-11.svg"
      />
      <img
        className={styles.invisible1Icon}
        loading="lazy"
        alt=""
        src="/invisible-1.svg"
      />
      <div className={styles.password}>Password</div>
      <div className={styles.passwordInput1} />
      <div className={styles.enterYourPassword}>Enter your Password</div>
      <img
        className={styles.padlock1Icon1}
        loading="lazy"
        alt=""
        src="/padlock-11.svg"
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
      <div className={styles.icon}>
        <div className={styles.color} />
        <img
          className={styles.iconColor2}
          loading="lazy"
          alt=""
          src="/-icon-color2.svg"
        />
      </div>
    </div>
  );
};

export default SignUp;
