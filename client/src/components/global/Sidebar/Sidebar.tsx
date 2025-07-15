import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Layout, Menu } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { toggleSidebar } from '@/store/actions/user.action';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined,
  AppstoreOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  SettingOutlined,
  ControlOutlined,
  UserOutlined,
  BranchesOutlined,
} from '@ant-design/icons';

import './styles.scss';

const APP_NAME = import.meta.env.VITE_APP_NAME;

const { Sider } = Layout;

interface PropType {
  showToggle?: boolean;
}

const Sidebar = (props: PropType) => {
  const { showToggle = true } = props;

  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const isOpenSidebar: boolean = useSelector((state: RootState) => state.users.isOpenSidebar);

  const [openKeys, setOpenKeys] = useState<string[]>([]);

  const siderStyle: React.CSSProperties = {
    background: '#fff',
    overflow: 'auto',
    height: '100vh',
    position: 'sticky',
    top: 0,
    bottom: 0,
  };

  const menuItems = [
    {
      key: '/dashboard',
      icon: <HomeOutlined style={{ fontSize: '18px' }} />,
      label: t('dashboard'),
    },
    {
      key: '/management',
      icon: <AppstoreOutlined style={{ fontSize: '18px' }} />,
      label: t('management'),
      children: [
        {
          key: '/management/products',
          icon: <ShopOutlined style={{ fontSize: '18px' }} />,
          label: t('products'),
        },
        {
          key: '/management/carts',
          icon: <ShoppingCartOutlined style={{ fontSize: '18px' }} />,
          label: t('carts'),
        },
      ],
    },
    {
      key: '/role',
      icon: <ControlOutlined style={{ fontSize: '18px' }} />,
      label: t('role'),
      children: [
        {
          key: '/role/customers',
          icon: <UserOutlined style={{ fontSize: '18px' }} />,
          label: t('customers'),
        },
        {
          key: '/role/staffs',
          icon: <BranchesOutlined style={{ fontSize: '18px' }} />,
          label: t('staffs'),
        },
      ],
    },
    {
      key: '/settings',
      icon: <SettingOutlined style={{ fontSize: '18px' }} />,
      label: t('settings'),
    },
  ];

  const selectedKey = useMemo(() => {
    // Duyệt toàn bộ menuItems để tìm key phù hợp nhất
    const allKeys: string[] = [];

    menuItems.forEach((item) => {
      if (item.children) {
        item.children.forEach((child) => allKeys.push(child.key));
      } else {
        allKeys.push(item.key);
      }
    });

    // Tìm key dài nhất mà pathname bắt đầu bằng key đó
    const matchedKey = allKeys
      .filter((key) => location.pathname.startsWith(key))
      .sort((a, b) => b.length - a.length)[0];

    return matchedKey || location.pathname;
  }, [location.pathname]);

  useEffect(() => {
    for (const item of menuItems) {
      if (item.children?.some((child) => selectedKey === child.key)) {
        setOpenKeys([item.key]);
        return;
      }
    }

    setOpenKeys([]);
  }, [selectedKey]);

  return (
    <Sider style={siderStyle} width={250} collapsible collapsed={!isOpenSidebar} trigger={null}>
      <div className='w-full h-[64px] flex items-center px-[5px]'>
        <div
          className='flex items-center hover:cursor-pointer'
          onClick={() => {
            navigate('/dashboard');
          }}
        >
          <div className='w-[70px] flex items-center justify-center'>
            <img className='w-full h-full' src='/assets/images/logo.png' alt='logo' />
          </div>

          {isOpenSidebar && (
            <span className='text-primary-500 text-[1rem] font-bold'>{APP_NAME ?? 'APP NAME'}</span>
          )}
        </div>
      </div>

      <Menu
        className='[&_.ant-menu-item-selected]:font-[500]'
        theme='light'
        mode='inline'
        openKeys={openKeys}
        selectedKeys={[selectedKey]}
        onOpenChange={(keys) => setOpenKeys(keys)}
        onClick={(e) => navigate(e.key)}
        items={menuItems}
      />

      {showToggle && (
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            padding: '12px',
            textAlign: 'center',
            cursor: 'pointer',
          }}
          onClick={() => dispatch(toggleSidebar())}
        >
          {isOpenSidebar ? (
            <MenuUnfoldOutlined style={{ color: 'black', fontSize: '1rem' }} />
          ) : (
            <MenuFoldOutlined style={{ color: 'black', fontSize: '1rem' }} />
          )}
        </div>
      )}
    </Sider>
  );
};

export default Sidebar;
