import { createContext, ReactNode, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../services/api';
import { Product, Stock } from '../types';

const LOCALSTORAGE_CART = "@RocketShoes:cart";

interface CartProviderProps {
  children: ReactNode;
}

interface UpdateProductAmount {
  productId: number;
  amount: number;
}

interface CartContextData {
  cart: Product[];
  addProduct: (productId: number) => Promise<void>;
  removeProduct: (productId: number) => void;
  updateProductAmount: ({ productId, amount }: UpdateProductAmount) => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [cart, setCart] = useState<Product[]>(() => {
    const storagedCart = localStorage.getItem(LOCALSTORAGE_CART);

    if (storagedCart) {
      return JSON.parse(storagedCart);
    }

    return [];
  });

  const addProduct = async (productId: number) => {
    try {
      const productResponse = await getProduct(productId);
      const product = productResponse.data;
      let hasSameProductInCart = false;

      // TODO: refatorar
      const cartUpdatedIfHasSameProduct = cart.map(productInCart => {
        if (productInCart.id === product.id) {
          hasSameProductInCart = true;
          productInCart.amount++;
        }
        return productInCart;
      })

      if (!hasSameProductInCart) {
        product.amount = 1;
        setCart([...cart, product])
      } else {
        setCart([...cartUpdatedIfHasSameProduct])
      }
    } catch {
      // TODO
    }
  };

  const getProduct = (productId: number) => {
    return api.get(`products/${productId}`);
  }

  const removeProduct = (productId: number) => {
    try {
      const cartWithProductRemoved = cart.filter(product => product.id !== productId)
      setCart([...cartWithProductRemoved]);
    } catch {
      // TODO
    }
  };

  const updateProductAmount = async ({
    productId,
    amount,
  }: UpdateProductAmount) => {
    try {
      const cartUpdated = cart.map(product => {
        if (product.id === productId) {
          product.amount = amount;
        }
        return product;
      })

      const productsWithAmount = cartUpdated.filter(product => product.amount > 0);
      setCart([...productsWithAmount])
    } catch {
      // TODO
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addProduct, removeProduct, updateProductAmount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextData {
  const context = useContext(CartContext);

  return context;
}
