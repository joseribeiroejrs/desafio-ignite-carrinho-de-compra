import { MdAddCircleOutline, MdDelete, MdRemoveCircleOutline } from "react-icons/md"
import { Product } from "../../types"
import { formatPrice } from "../../util/format"
import { ProductFormatted } from "../ProductItem"

interface CartItemProps {
  product: ProductFormatted;
  handleProductIncrement: (product: Product) => void;
  handleProductDecrement: (product: Product) => void;
  handleRemoveProduct: (productId: number) => void;
}

export const CartItem = (props: CartItemProps) => {
  const {
    product,
    handleProductDecrement,
    handleProductIncrement,
    handleRemoveProduct
  } = props

  return (
    <tr data-testid="product">
      <td>
        <img src={product.image} alt={product.title} />
      </td>
      <td>
        <strong>{product.title}</strong>
        <span>{product.priceFormatted}</span>
      </td>
      <td>
        <div>
          <button
            type="button"
            data-testid="decrement-product"
            disabled={product.amount <= 1}
            onClick={() => handleProductDecrement(product)}
          >
            <MdRemoveCircleOutline size={20} />
          </button>
          <input
            type="text"
            data-testid="product-amount"
            readOnly
            value={product.amount}
          />
          <button
            type="button"
            data-testid="increment-product"
            onClick={() => handleProductIncrement(product)}
          >
            <MdAddCircleOutline size={20} />
          </button>
        </div>
      </td>
      <td>
        <strong>{formatPrice(product.price * product.amount)}</strong>
      </td>
      <td>
        <button
          type="button"
          data-testid="remove-product"
          onClick={() => handleRemoveProduct(product.id)}
        >
          <MdDelete size={20} />
        </button>
      </td>
    </tr>


  )
}
