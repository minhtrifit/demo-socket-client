import { useMemo, useState } from 'react';
import { Button, Input, Pagination, Table, Select } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGetProducts } from './hooks/useGetProducts';
import Loading from './components/Loading';

const { Column } = Table;

const ProductPage = () => {
  const LIMIT_PRODUCTS_PER_PAGE = 5;
  const TOTAL_PRODUCTS = 10;

  const options = [
    { label: `Men's Clothing`, value: `men's clothing` },
    { label: 'Jewelery', value: 'jewelery' },
    { label: 'Electronics', value: 'electronics' },
  ];

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const page = searchParams.get('page');
  const query = searchParams.get('query');
  const category = searchParams.get('category');

  const paramsObject = Object.fromEntries(searchParams.entries());

  const [filter, setFilter] = useState({
    page: Number(page ?? 1),
    query: query ?? '',
    category: category ?? undefined,
  });

  const { data, loading, total, params, setParams } = useGetProducts({
    page: filter.page,
    search: filter.query,
    category: filter.category,
    limit: LIMIT_PRODUCTS_PER_PAGE,
  });

  const TABLE_DATA = useMemo(() => {
    return data?.map((item) => {
      return { ...item, key: item?.id };
    });
  }, [data]);

  const handlePageChange = (page: number) => {
    setFilter({ ...filter, page: page });
    setParams({ ...params, page: page });
    setSearchParams({ ...paramsObject, page: page.toString() });
  };

  const handleChangeFilter = (key: string, value: string) => {
    setFilter({
      ...filter,
      [key]: value,
    });
  };

  const handleApplyFilter = () => {
    console.log('APPLY FILTER:', filter);

    setFilter({ ...filter, page: 1 });

    setParams({
      page: 1,
      query: filter.query,
      category: filter.category,
      limit: LIMIT_PRODUCTS_PER_PAGE,
    });

    setSearchParams({
      page: '1',
      query: filter.query,
      category: filter.category ?? '',
    });
  };

  return (
    <div className='flex flex-col gap-5'>
      <div className='w-full flex flex-wrap items-center justify-between gap-3'>
        <div className='flex flex-wrap items-center gap-3'>
          <Input
            style={{ width: 300 }}
            placeholder='Tìm theo tên...'
            allowClear
            value={filter.query}
            onChange={(e) => {
              handleChangeFilter('query', e.target.value);
            }}
          />

          <Select
            style={{ width: 200 }}
            placeholder='Chọn phân loại'
            showSearch
            allowClear
            options={options}
            optionFilterProp='label'
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            value={filter.category}
            onChange={(value) => {
              handleChangeFilter('category', value);
            }}
          />

          <Button
            color='primary'
            variant='solid'
            icon={<SearchOutlined />}
            onClick={handleApplyFilter}
          >
            Tìm kiếm
          </Button>
        </div>

        <Button
          color='primary'
          variant='solid'
          icon={<PlusOutlined />}
          onClick={() => {
            navigate('/management/products/add');
          }}
        >
          Thêm mới
        </Button>
      </div>

      {loading ? (
        <Loading />
      ) : (
        <>
          <Table dataSource={TABLE_DATA} pagination={false} bordered scroll={{ x: 'max-content' }}>
            <Column title='ID' dataIndex='id' key='id' width={60} align='center' />
            <Column title='Tên sản phẩm' dataIndex='title' key='title' width={400} />
            <Column title='Phân loại' dataIndex='category' key='category' width={200} />
            <Column title='Giá' dataIndex='price' key='price' width={200} />
            <Column
              title='Hình ảnh'
              dataIndex='image'
              key='image'
              width={150}
              render={(value, record) => {
                return (
                  <div className='w-full flex items-center justify-center'>
                    <div className='w-[50px] h-[50px] flex items-center justify-center'>
                      <img
                        className='w-full h-full object-cover'
                        src={value}
                        alt={`${record?.id}-img`}
                      />
                    </div>
                  </div>
                );
              }}
            />
            <Column
              title='Thao tác'
              key='action'
              width={200}
              render={(_, record) => {
                return (
                  <div className='flex items-center gap-2'>
                    <Button
                      color='geekblue'
                      variant='solid'
                      onClick={() => {
                        navigate(`/management/products/detail/${record?.id}`);
                      }}
                    >
                      Xem
                    </Button>

                    <Button
                      color='gold'
                      variant='solid'
                      onClick={() => {
                        navigate(`/management/products/edit/${record?.id}`);
                      }}
                    >
                      Sửa
                    </Button>
                  </div>
                );
              }}
            />
          </Table>

          <div className='flex items-center justify-between'>
            <span>
              {total}/{TOTAL_PRODUCTS}
            </span>

            <Pagination
              current={filter.page}
              pageSize={LIMIT_PRODUCTS_PER_PAGE}
              total={TOTAL_PRODUCTS}
              onChange={handlePageChange}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ProductPage;
