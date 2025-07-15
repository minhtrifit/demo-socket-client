import { ConfigProvider } from 'antd';

export default function AntDesignProvider({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#78c6e3',
          fontFamily: 'Inter, sans-serif',
        },
        components: {
          Form: {
            itemMarginBottom: 0,
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
