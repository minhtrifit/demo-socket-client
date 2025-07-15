import ProductForm from '@/components/ui/ProductForm/ProductForm';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { useAddProduct } from './hooks/useAddProduct';

const AddProductPage = () => {
  const navigate = useNavigate();

  const { addProduct, loading } = useAddProduct();

  const handleSubmit = async (data: any) => {
    try {
      const res = await addProduct(data);

      console.log('Add Product:', res);

      message.success('Add product successfully');
      navigate('/management/products');
    } catch (error) {
      console.log('Add product failed:', error);
    }
  };

  return (
    <ProductForm
      defaultValues={null}
      isEdit={false}
      submitLoading={loading}
      onFinish={handleSubmit}
    />
  );
};

export default AddProductPage;
