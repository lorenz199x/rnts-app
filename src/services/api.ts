import { Platform } from 'react-native';
import axios from 'axios';

const url = Platform.OS === 'ios' ? 'localhost' : '10.0.2.2';
const baseURL = `http://${url}:3000/products`;
const api = axios.create({
  baseURL,
});

/**Function to get all existing product */
export const getProducts = async () => {
  try {
    const response = await api.get('');
    const list = response.data.data;
    return list;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

/**Function to fetch a specific product by ID */
export const getProductById = async (productId: number) => {
  try {
    const response = await api.get(`/${productId}`);
    const product = response.data;
    return product;
  } catch (error) {
    console.error(`Error fetching product with ID ${productId}:`, error);
    throw error;
  }
};

/**Function to fetch products based on search criteria */
export const searchProducts = async (searchParams: any) => {
  try {
    const name = searchParams?.searchKey ?? '';
    const category = searchParams?.category ?? '';
    const searchURL = `/search?name=${name}&category=${category}`;
    const response = await api.get(searchURL);
    const productList = response.data.data;
    return productList;
  } catch (error) {
    console.error('Error fetching products based on search criteria:', error);
    throw error;
  }
};

/**Function to add a new product */
export const addProduct = async (productData: any) => {
  try {
    const response = await api.post('', productData);
    const newProduct = response.data;
    return newProduct;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

/**Function to update an existing product */
export const updateProduct = async (productId: number, updatedProductData: any) => {
  try {
    const response = await api.put(`/${productId}`, updatedProductData);
    const updatedProduct = response.data;
    return updatedProduct;
  } catch (error) {
    console.error(`Error updating product with ID ${productId}:`, error);
    throw error;
  }
};

/**Function to delete an existing product */
export const deleteTodo = async (todoId: number) => {
  try {
    await api.delete(`/${todoId}`);
    console.log(`Todo item with ID ${todoId} deleted successfully.`);
  } catch (error) {
    console.error(`Error deleting todo item with ID ${todoId}:`, error);
    throw error;
  }
};
