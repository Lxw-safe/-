import React from 'react';
import { Layout, Menu, Button, Dropdown } from 'antd';
import { 
  HomeOutlined, 
  SendOutlined, 
  InboxOutlined, 
  UserSwitchOutlined,
  SearchOutlined,
  UserOutlined,
  LoginOutlined
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';

const { Header } = Layout;

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 根据当前路径确定选中的菜单项
  const getCurrentKey = () => {
    const path = location.pathname;
    switch (path) {
      case '/':
        return 'home';
      case '/send':
        return 'send';
      case '/pickup':
        return 'pickup';
      case '/deliver':
        return 'deliver';
      case '/track':
        return 'track';
      case '/user':
        return 'user';
      default:
        return 'home';
    }
  };

  const menuItems = [
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: '首页',
      onClick: () => navigate('/')
    },
    {
      key: 'send',
      icon: <SendOutlined />,
      label: '我要寄件',
      onClick: () => navigate('/send')
    },
    {
      key: 'pickup',
      icon: <InboxOutlined />,
      label: '我要取件',
      onClick: () => navigate('/pickup')
    },
    {
      key: 'deliver',
      icon: <UserSwitchOutlined />,
      label: '成为配送员',
      onClick: () => navigate('/deliver')
    },
    {
      key: 'track',
      icon: <SearchOutlined />,
      label: '物流追踪',
      onClick: () => navigate('/track')
    },
    {
      key: 'user',
      icon: <UserOutlined />,
      label: '个人中心',
      onClick: () => navigate('/user')
    }
  ];

  return (
    <Header className="bg-white shadow-md px-4 md:px-8">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div 
          className="flex items-center space-x-2 flex-shrink-0 cursor-pointer"
          onClick={() => navigate('/')}
        >
          <div className="text-2xl font-bold text-primary whitespace-nowrap">
            📦 青年驿站
          </div>
        </div>

        <Menu
          mode="horizontal"
          selectedKeys={[getCurrentKey()]}
          items={menuItems}
          className="hidden md:flex border-none bg-transparent flex-1 justify-center"
        />

        <div className="flex items-center space-x-4">
          <Button 
            type="primary" 
            icon={<LoginOutlined />}
            className="bg-primary hover:bg-blue-600"
          >
            登录/注册
          </Button>
        </div>
      </div>
    </Header>
  );
};

export default Navbar;