import type {NextPage} from 'next';
import styles from '../styles/Home.module.css';
import Layout from '../components/layout/Layout';

const Home: NextPage = () => {
  return (
    <Layout>
      <div className={styles.container}>
        Home
      </div>
    </Layout>
  );
};

export default Home;
