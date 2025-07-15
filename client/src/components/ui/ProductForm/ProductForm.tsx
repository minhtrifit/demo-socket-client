import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { Input, InputNumber, Button, Select, Typography, Upload } from 'antd';
import type { UploadProps } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface PropType {
  defaultValues: any;
  isEdit: boolean;
  submitLoading: boolean;
  onFinish: (data: any) => void;
}

const ProductForm = (props: PropType) => {
  const { defaultValues, isEdit, submitLoading, onFinish } = props;

  const navigate = useNavigate();

  const categories = ['electronics', 'jewelery', "men's clothing", "women's clothing"];

  const [uploadingImage, setUploadingImage] = useState(false);

  const productSchema = z.object({
    title: z.string().min(1, 'Vui lòng nhập tên sản phẩm'),
    category: z
      .string()
      .nullable()
      .refine((val) => val && val.length > 0, {
        message: 'Vui lòng chọn danh mục',
      }),
    price: z.number().min(1, 'Giá phải lớn hơn 0'),
    image: z.string().min(1, 'Vui lòng chọn ảnh sản phẩm'),
    description: z.string().min(1, 'Vui lòng nhập mô tả'),
  });

  type ProductFormData = z.infer<typeof productSchema>;

  const {
    handleSubmit,
    control,
    formState: { errors },
    setFocus,
    setValue,
    reset,
    watch,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: defaultValues ?? {
      title: '',
      category: null,
      price: 0,
      image: '',
      description: '',
    },
  });

  const imageUrl = watch('image');

  const handleChange: UploadProps['onChange'] = (info) => {
    console.log(info);

    setUploadingImage(true);

    setTimeout(() => {
      setValue('image', 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg');
      setUploadingImage(false);
    }, 2000);
  };

  const onSubmit = async (data: ProductFormData) => {
    onFinish(data);
    reset();
  };

  const onError = (errors: any) => {
    console.error('Lỗi submit:', errors);

    const firstErrorKey = Object.keys(errors)[0];
    setFocus(firstErrorKey as any);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <span className='font-bold text-xl text-primary-500'>
        {!isEdit ? 'Thêm mới' : 'Chỉnh sửa'} sản phẩm
      </span>

      <div className='mt-5 grid grid-cols-1 xl:grid-cols-2 gap-5'>
        <Controller
          name='title'
          control={control}
          render={({ field }) => {
            return (
              <div className='flex flex-col gap-2'>
                <label>Title</label>

                <Input {...field} placeholder='Nhập tên sản phẩm' />

                {errors.title && (
                  <Text type='danger' style={{ fontSize: 12 }}>
                    {errors.title.message}
                  </Text>
                )}
              </div>
            );
          }}
        />

        <Controller
          name='category'
          control={control}
          render={({ field }) => {
            return (
              <div className='flex flex-col gap-2'>
                <label>Category</label>

                <Select
                  {...field}
                  onChange={(value) => field.onChange(value)}
                  placeholder='Chọn danh mục'
                >
                  {categories.map((cat) => (
                    <Select.Option key={cat} value={cat}>
                      {cat}
                    </Select.Option>
                  ))}
                </Select>

                {errors.category && (
                  <Text type='danger' style={{ fontSize: 12 }}>
                    {errors.category.message}
                  </Text>
                )}
              </div>
            );
          }}
        />

        <Controller
          name='price'
          control={control}
          render={({ field }) => {
            return (
              <div className='w-full flex flex-col gap-2'>
                <label>Price</label>

                <InputNumber
                  {...field}
                  min={0}
                  style={{ width: '100%' }}
                  onChange={(value) => field.onChange(value ?? 0)}
                />

                {errors.price && (
                  <Text type='danger' style={{ fontSize: 12 }}>
                    {errors.price.message}
                  </Text>
                )}
              </div>
            );
          }}
        />

        <Controller
          name='image'
          control={control}
          render={() => {
            return (
              <div className='w-full flex flex-col gap-2'>
                <label>Image</label>

                <div className='flex items-center gap-5'>
                  <Upload
                    name='avatar'
                    listType='picture-card'
                    className='avatar-uploader'
                    showUploadList={false}
                    beforeUpload={() => false}
                    onChange={handleChange}
                  >
                    <button
                      type='button'
                      className='hover:cursor-pointer'
                      style={{ border: 0, background: 'none' }}
                    >
                      {uploadingImage ? <LoadingOutlined /> : <PlusOutlined />}
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </button>
                  </Upload>

                  {imageUrl && (
                    <div className='w-[102px] h-[102px] flex items-center justify-center'>
                      <img src={imageUrl} className='w-full h-full object-cover' alt='avatar' />
                    </div>
                  )}
                </div>

                {errors.image && (
                  <Text type='danger' style={{ fontSize: 12 }}>
                    {errors.image.message}
                  </Text>
                )}
              </div>
            );
          }}
        />
      </div>

      <div className='w-full mt-5'>
        <Controller
          name='description'
          control={control}
          render={({ field }) => {
            return (
              <div className='w-full flex flex-col gap-2'>
                <label>Description</label>

                <Input.TextArea {...field} autoSize={{ minRows: 5, maxRows: 5 }} />

                {errors.description && (
                  <Text type='danger' style={{ fontSize: 12 }}>
                    {errors.description.message}
                  </Text>
                )}
              </div>
            );
          }}
        />
      </div>

      <div className='w-full mt-5 flex items-center justify-end gap-2'>
        <Button
          type='default'
          disabled={submitLoading}
          onClick={() => {
            navigate('/management/products');
          }}
        >
          Hủy
        </Button>

        <Button type='primary' htmlType='submit' disabled={submitLoading} loading={submitLoading}>
          Lưu
        </Button>
      </div>
    </form>
  );
};

export default ProductForm;
