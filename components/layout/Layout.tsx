import styles from './Layout.module.css';
import Header from './Header';
import React from 'react';

const Layout: React.FC = (props) => {
  const {children} = props;
  const [isScrolled, setIsScrolled] = React.useState(false);

  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    if (scrollTop > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div style={{position: 'relative'}}>
      <Header isScrolled={isScrolled}/>
      <main className={styles.container}>
        {children}
      </main>
    </div>
  );
};

export default Layout;