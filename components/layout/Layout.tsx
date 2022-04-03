import Header from './Header';
import React from 'react';

interface LayoutProps {
}

const Layout: React.FC = (props) => {
  const {children} = props;
  return (
    <>
      <Header/>
      <main>
        {children}
      </main>
    </>
  );
};

export default Layout;