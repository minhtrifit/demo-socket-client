import { useNavigate, useParams } from 'react-router-dom';
import { message } from 'antd';
import { useGetDetailProduct } from './hooks/useGetDetailProduct';
import ProductForm from '@/components/ui/ProductForm/ProductForm';
import { useEditProduct } from './hooks/useEditProduct';

const EditProductPage = () => {
  const navigate = useNavigate();
  const params = useParams();

  const id = params?.id ?? '';

  const { data, loading } = useGetDetailProduct(id);
  const { updateProduct, loading: editLoading } = useEditProduct();

  const handleSubmit = async (data: any) => {
    try {
      const res = await updateProduct(id, data);

      console.log('Update Product:', res);

      message.success('Update product successfully');
      navigate('/management/products');
    } catch (error) {
      console.log('Update product failed:', error);
    }
  };

  if (loading) {
    return <div>Loading</div>;
  }

  if (!loading && data) {
    return (
      <ProductForm
        defaultValues={data}
        isEdit={true}
        submitLoading={editLoading}
        onFinish={handleSubmit}
      />
    );
  }
};

export default EditProductPage;
