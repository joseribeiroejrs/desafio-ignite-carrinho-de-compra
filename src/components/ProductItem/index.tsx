import { MdAddShoppingCart } from "react-icons/md"
import { Product } from "../../types";

export interface ProductFormatted extends Product {
  priceFormatted: string;
}

interface ProductItemProps {
  product: ProductFormatted;
  cartItemsAmount: any;
  handleAddProduct: (product: number) => void;
}

export const ProductItem = (props: ProductItemProps) => {
  const { product, cartItemsAmount, handleAddProduct } = props;
  const { title, priceFormatted, image } = product;
  return (
    <li>
      <img src={image} alt={title} />
      <strong>{title}</strong>
      <span>{priceFormatted}</span>
      <button
        type="button"
        data-testid="add-product-button"
        onClick={() => handleAddProduct(product.id)}
      >
        <div data-testid="cart-product-quantity">
          <MdAddShoppingCart size={16} color="#FFF" />
          {cartItemsAmount[product.id] || 0}
        </div>

        <span>ADICIONAR AO CARRINHO</span>
      </button>
    </li>
  )
}
