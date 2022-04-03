import styles from './Header.module.css';
import Link from 'next/link';

const Header = () => {
  return (
    <header className={styles.container}>
      <div>
        <div/>
        <span>Burt</span>
      </div>

      <nav>
        <ul>
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/posts">
              <a>Posts</a>
            </Link>
          </li>
          <li>
            <Link href="/projects">
              <a>Projects</a>
            </Link>
          </li>
          <li>
            <Link href="/tags">
              <a>Tags</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;