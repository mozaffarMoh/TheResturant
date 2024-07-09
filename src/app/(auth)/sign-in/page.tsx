import type { NextPage } from 'next';
import Main from '@/components/main';
import styles from './page.module.css';

const SignIn: NextPage = () => {
  return (
    <div className={styles.signIn}>
      <Main />
    </div>
  );
};

export default SignIn;
