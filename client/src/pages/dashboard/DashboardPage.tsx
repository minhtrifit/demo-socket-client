import { useEffect } from 'react';
import { useSocketContext } from '@/+core/provider/SocketProvider';
import { Card, Statistic } from 'antd';
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  DropboxOutlined,
  ShoppingOutlined,
} from '@ant-design/icons';
import { StartListeners } from '@/helpers/socket.helper';

const DashboardPage = () => {
  const socket = useSocketContext();

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    StartListeners(socket);
  }, [socket]);

  return (
    <div>
      <section className='grid grid-cols-2 xl:grid-cols-4 gap-5'>
        <Card variant='borderless' className='bg-violet-700'>
          <div>
            <Statistic
              title={<span className='text-[#FFF]'>Đơn hàng</span>}
              value={150}
              precision={1}
              prefix={<ShoppingOutlined className='text-[#FFF] text-[30px]' />}
              valueStyle={{ color: '#FFF' }}
            />
          </div>
        </Card>

        <Card variant='borderless' className='bg-blue-500'>
          <Statistic
            title={<span className='text-[#FFF]'>Sản phẩm</span>}
            value={120}
            prefix={<DropboxOutlined />}
            valueStyle={{ color: '#FFF' }}
          />
        </Card>

        <Card variant='borderless' className='bg-yellow-500'>
          <Statistic
            title={<span className='text-[#FFF]'>Doanh số</span>}
            value={9.3}
            precision={2}
            prefix={<ArrowUpOutlined />}
            suffix='%'
            valueStyle={{ color: '#FFF' }}
          />
        </Card>

        <Card variant='borderless' className='bg-red-500'>
          <Statistic
            title={<span className='text-[#FFF]'>Lượt truy cập</span>}
            value={9.3}
            precision={2}
            prefix={<ArrowDownOutlined />}
            suffix='%'
            valueStyle={{ color: '#FFF' }}
          />
        </Card>
      </section>
    </div>
  );
};

export default DashboardPage;
