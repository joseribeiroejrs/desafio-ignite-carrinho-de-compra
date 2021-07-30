import { MdAddShoppingCart } from "react-icons/md"

interface ProductItemProps {
  title: string;
  price: number;
  image: string;
}

export const ProductItem = (props: ProductItemProps) => {
  const { title, price, image } = props;
  return (
    <li>
      <img src={image} alt={title} />
      <strong>{title}</strong>
      <span>{price}</span>
      <button
        type="button"
        data-testid="add-product-button"
      // onClick={() => handleAddProduct(product.id)}
      >
        <div data-testid="cart-product-quantity">
          <MdAddShoppingCart size={16} color="#FFF" />
          {/* {cartItemsAmount[product.id] || 0} */} 2
        </div>

        <span>ADICIONAR AO CARRINHO</span>
      </button>
    </li>
  )
}
