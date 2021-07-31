import React from 'react';
import { CartItem } from '../../components/CartItem';
import { ProductFormatted } from '../../components/ProductItem';

import { useCart } from '../../hooks/useCart';
import { formatPrice } from '../../util/format';
import { Container, ProductTable, Total } from './styles';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  amount: number;
}

const Cart = (): JSX.Element => {
  const { cart, removeProduct, updateProductAmount } = useCart();

  const cartFormatted: ProductFormatted[] = cart.map((product) => ({
    ...product,
    priceFormatted: formatPrice(product.price)
  }))

  const total =
    formatPrice(
      cart.reduce((sumTotal, product) => {
        sumTotal += product.price * product.amount;
        return sumTotal;
      }, 0)
    )

  const getAmountAndProductId = (product: Product) => {
    const productId = product.id;
    const amount = product.amount;

    return {
      productId,
      amount
    }
  }

  function handleProductIncrement(product: Product) {
    let { amount, productId } = getAmountAndProductId(product);
    amount++;
    updateProductAmount({ productId, amount })
  }

  function handleProductDecrement(product: Product) {
    let { amount, productId } = getAmountAndProductId(product);

    if (amount > 0) {
      amount--;
    }

    updateProductAmount({ productId, amount });

  }

  function handleRemoveProduct(productId: number) {
    removeProduct(productId);
  }

  const renderCartItems = () => {
    return cartFormatted.map(product => (
      <CartItem
        key={product.id}
        product={product}
        handleProductIncrement={handleProductIncrement}
        handleProductDecrement={handleProductDecrement}
        handleRemoveProduct={handleRemoveProduct}></CartItem>
    ))
  }

  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th aria-label="product image" />
            <th>PRODUTO</th>
            <th>QTD</th>
            <th>SUBTOTAL</th>
            <th aria-label="delete icon" />
          </tr>
        </thead>
        <tbody>
          {renderCartItems()}
        </tbody>
      </ProductTable>

      <footer>
        <button type="button">Finalizar pedido</button>

        <Total>
          <span>TOTAL</span>
          <strong>{total}</strong>
        </Total>
      </footer>
    </Container>
  );
};

export default Cart;
