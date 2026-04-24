import type { Product, CartItem } from "../types/product";

const CART_KEY = "food_store_cart";

export const getCart = (): CartItem[] => {
  const cart = localStorage.getItem(CART_KEY);

  if (!cart) {
    return [];
  }

  try {
    return JSON.parse(cart) as CartItem[];
  } catch {
    return [];
  }
};

export const saveCart = (cart: CartItem[]): void => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

export const addToCart = (product: Product): void => {
  const cart = getCart();
  const productInCart = cart.find((item) => item.id === product.id);

  if (productInCart) {
    productInCart.cantidad += 1;
  } else {
    cart.push({
      id: product.id,
      nombre: product.nombre,
      precio: product.precio,
      cantidad: 1,
    });
  }

  saveCart(cart);
};

export const increaseQuantity = (productId: number): void => {
  const cart = getCart();
  const item = cart.find((cartItem) => cartItem.id === productId);

  if (item) {
    item.cantidad += 1;
  }

  saveCart(cart);
};

export const decreaseQuantity = (productId: number): void => {
  let cart = getCart();
  const item = cart.find((cartItem) => cartItem.id === productId);

  if (item) {
    item.cantidad -= 1;
  }

  cart = cart.filter((cartItem) => cartItem.cantidad > 0);
  saveCart(cart);
};

export const removeFromCart = (productId: number): void => {
  const cart = getCart().filter((item) => item.id !== productId);
  saveCart(cart);
};

export const clearCart = (): void => {
  localStorage.removeItem(CART_KEY);
};

export const calculateTotal = (cart: CartItem[]): number => {
  return cart.reduce((total, item) => total + item.precio * item.cantidad, 0);
};

export const getCartQuantity = (): number => {
  return getCart().reduce((total, item) => total + item.cantidad, 0);
};
