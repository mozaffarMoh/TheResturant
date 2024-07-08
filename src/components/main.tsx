import type { NextPage } from "next";
import styles from "./main.module.css";

export type MainType = {
  className?: string;
};

const Main: NextPage<MainType> = ({ className = "" }) => {
  return (
    <section className={[styles.main, className].join(" ")}>
      <div className={styles.content}>
        <div className={styles.formContainer}>
          <div className={styles.form}>
            <img
              className={styles.logoIcon}
              loading="lazy"
              alt=""
              src="/logo3.svg"
            />
          </div>
          <div className={styles.registerLink}>
            <div className={styles.signInParent}>
              <h2 className={styles.signIn}>Sign in</h2>
              <div className={styles.register}>
                <div className={styles.ifYouDont}>
                  If you don’t have an account register
                </div>
                <div className={styles.youCanRegisterContainer}>
                  <span className={styles.youCan}>{`You can   `}</span>
                  <span className={styles.registerHere}>Register here !</span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.emailField}>
            <div className={styles.emailParent}>
              <div className={styles.email}>Email</div>
              <div className={styles.emailMessage}>
                <div className={styles.message}>
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
          </div>
          <div className={styles.passwordField}>
            <div className={styles.passwordInput}>
              <div className={styles.password}>Password</div>
            </div>
            <div className={styles.passwordMessage}>
              <div className={styles.password1}>
                <div className={styles.padlock}>
                  <div className={styles.icon}>
                    <img
                      className={styles.padlock1Icon}
                      loading="lazy"
                      alt=""
                      src="/padlock-12.svg"
                    />
                  </div>
                  <div className={styles.enterYourPassword}>
                    Enter your Password
                  </div>
                </div>
                <img
                  className={styles.invisible1Icon}
                  loading="lazy"
                  alt=""
                  src="/invisible-11.svg"
                />
              </div>
              <div className={styles.passwordMessageChild} />
            </div>
            <div className={styles.rememberForgot}>
              <div className={styles.remember}>
                <div className={styles.rememberCheckbox}>
                  <div className={styles.checkbox}>
                    <div className={styles.checkboxMark} />
                  </div>
                  <div className={styles.rememebrMe}>Rememebr me</div>
                </div>
                <div className={styles.forgotPassword}>Forgot Password ?</div>
              </div>
            </div>
          </div>
          <button className={styles.rectangleParent}>
            <div className={styles.frameChild} />
            <div className={styles.login}>Login</div>
          </button>
        </div>
      </div>
      <div className={styles.descriptionBackgroundParent}>
        <img
          className={styles.descriptionBackgroundIcon}
          loading="lazy"
          alt=""
          src="/rectangle-7@2x.png"
        />
        <h1 className={styles.signInTo}>Sign in to name</h1>
        <div className={styles.loremIpsumIs}>{`Lorem Ipsum is simply `}</div>
      </div>
    </section>
  );
};

export default Main;
