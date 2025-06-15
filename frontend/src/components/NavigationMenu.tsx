import React from 'react';
import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';

const NavigationMenu: React.FC = () => {
  const location = useLocation();

  const items = [
    {
      key: '/domains',
      label: <Link to="/domains">域名管理</Link>,
    },
    {
      key: '/certificates',
      label: <Link to="/certificates">证书管理</Link>,
    },
  ];

  return (
    <Menu
      mode="horizontal"
      selectedKeys={[location.pathname]}
      items={items}
      style={{ borderBottom: 'none' }}
    />
  );
};

export default NavigationMenu;