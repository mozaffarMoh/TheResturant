import type { NextPage } from 'next';
import Main from '@/components/main';
import GroupComponent2 from '@/components/group-component2';
import styles from './page.module.css';

const SignIn: NextPage = () => {
  return (
    <div className={styles.signIn}>
      <Main />
      <GroupComponent2 propMarginRight="-4.625rem" />
    </div>
  );
};

export default SignIn;
