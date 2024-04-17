import { useEffect, useState } from 'react';
import { Product } from '@shared/interfaces/productInterface';

import { getProducts, searchProducts } from '../services/api';

const useProductData = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async (searchParams?: any) => {
    try {
      setLoading(true);
      const productList = searchParams ? await searchProducts(searchParams) : await getProducts();
      setProducts(Array.isArray(productList) ? productList : []);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { products, loading, fetchData };
};

export default useProductData;
