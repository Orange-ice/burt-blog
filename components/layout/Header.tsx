import styles from './Header.module.css';
import Link from 'next/link';
import initLogo from '../../public/logo.png';
import Image from 'next/image';
import {IconGithub, IconSun, IconWechatpay} from '@arco-design/web-react/icon';
import React from 'react';

interface HeaderProps {
  /**
   * Layout 是否已滚动 50px
   */
  isScrolled?: boolean;
}

const Header: React.FC<HeaderProps> = (props) => {
  const {isScrolled} = props;
  const headerClass = isScrolled ? `${styles.container} ${styles.headerScrolled}` : styles.container;
  return (
    <header className={headerClass}>
      <div className={styles.logo}>
        <Image src={initLogo} alt="logo" width={38} height={38} className={styles.image}/>
        <span className={styles.title}>Burt</span>
      </div>

      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li>
            <Link href="/">
              <a className={styles.links}>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/posts">
              <a className={styles.links}>Posts</a>
            </Link>
          </li>
          <li>
            <Link href="/projects">
              <a className={styles.links}>Projects</a>
            </Link>
          </li>
          <li>
            <Link href="/tags">
              <a className={styles.links}>Tags</a>
            </Link>
          </li>
          <li>
            <IconGithub className={styles.links} height={20} width={20}/>
          </li>
          <li>
            <IconWechatpay className={styles.links} height={20} width={20}/>
          </li>
          <li>
            <IconSun className={styles.links} height={20} width={20}/>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;