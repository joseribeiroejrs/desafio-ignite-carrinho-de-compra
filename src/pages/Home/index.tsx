import React, { useState, useEffect } from 'react';
import { MdAddShoppingCart } from 'react-icons/md';

import { ProductList } from './styles';
import { api } from '../../services/api';
import { formatPrice } from '../../util/format';
import { useCart } from '../../hooks/useCart';
import { ProductItem } from '../../components/ProductItem';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface ProductFormatted extends Product {
  priceFormatted: string;
}

interface CartItemsAmount {
  [key: number]: number;
}

const Home = (): JSX.Element => {
  const [products, setProducts] = useState<ProductFormatted[]>([]);
  // const { addProduct, cart } = useCart();

  // const cartItemsAmount = cart.reduce((sumAmount, product) => {
  //   // TODO
  // }, {} as CartItemsAmount)

  useEffect(() => {
    async function loadProducts() {
      api.get("products")
        .then(response => {
          setProducts(response.data)
        })

    }

    loadProducts();
  }, []);

  function handleAddProduct(id: number) {
    // TODO
  }

  const renderProcucts = () => {
    return products.map(product => (
      <ProductItem key={product.id} title={product.title} image={product.image} price={product.price}></ProductItem>
    ))
  }

  return (
    <ProductList>
      {renderProcucts()}
    </ProductList>
  );
};

export default Home;
