import React, { useState, useEffect } from 'react';

import { ProductList } from './styles';
import { api } from '../../services/api';
import { formatPrice } from '../../util/format';
import { useCart } from '../../hooks/useCart';
import { ProductFormatted, ProductItem } from '../../components/ProductItem';
import { AxiosResponse } from 'axios';


interface CartItemsAmount {
  [key: number]: number;
}

const Home = (): JSX.Element => {
  const [products, setProducts] = useState<ProductFormatted[]>([]);
  const { addProduct, cart } = useCart();

  const cartItemsAmount = cart.reduce((sumAmount, product) => {
    sumAmount[product.id] = product.amount;
    return sumAmount;
  }, {} as CartItemsAmount)

  useEffect(() => {
    async function loadProducts() {
      api.get("products")
        .then(successGetProducts)
    }

    const hasDataInResponse = (response: AxiosResponse) => response && response.data;

    const formatProducts = (response: AxiosResponse): ProductFormatted[] => {
      if (hasDataInResponse(response)) {
        const { data } = response;
        return data.map((product: ProductFormatted) => {
          product.priceFormatted = formatPrice(product.price);
          return product;
        })
      }
      return []
    }

    const successGetProducts = (response: AxiosResponse) => {
      const formattedProducts = formatProducts(response);
      setProducts(formattedProducts);
    }

    loadProducts();
  }, []);


  const handleAddProduct = (id: number) => {
    addProduct(id)
  }

  const renderProcucts = () => {
    return products.map(product => (
      <ProductItem
        key={product.id}
        product={product}
        handleAddProduct={handleAddProduct}
        cartItemsAmount={cartItemsAmount}></ProductItem>
    ))
  }

  return (
    <ProductList >
      {renderProcucts()}
    </ProductList>
  );
};

export default Home;
