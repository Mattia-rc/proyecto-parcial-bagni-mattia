import { checkAuhtUser, logout } from "../../../utils/auth";
import type { CartItem } from "../../../types/product";
import {
  getCart,
  calculateTotal,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} from "../../../utils/cart";

const buttonLogout = document.getElementById("logoutButton") as HTMLButtonElement;
const cartContainer = document.getElementById("cartContainer") as HTMLElement;
const cartTotal = document.getElementById("cartTotal") as HTMLSpanElement;
const clearCartButton = document.getElementById("clearCartButton") as HTMLButtonElement;

buttonLogout?.addEventListener("click", () => {
  logout();
});

const formatPrice = (price: number): string => {
  return price.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
  });
};

const renderCart = (): void => {
  const cart = getCart();

  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.innerHTML = `
      <div class="empty-cart">
        <p>El carrito está vacío.</p>
        <a href="../home/home.html">Volver al catálogo</a>
      </div>
    `;

    cartTotal.textContent = formatPrice(0);
    clearCartButton.disabled = true;
    return;
  }

  clearCartButton.disabled = false;

  cart.forEach((item: CartItem) => {
    const subtotal = item.precio * item.cantidad;

    const cartItem = document.createElement("article");
    cartItem.className = "cart-item";

    cartItem.innerHTML = `
      <div class="item-info">
        <h3>${item.nombre}</h3>
        <p>Precio unitario: ${formatPrice(item.precio)}</p>
        <p>Cantidad: ${item.cantidad}</p>
        <strong>Subtotal: ${formatPrice(subtotal)}</strong>
      </div>

      <div class="quantity-controls">
        <button class="quantity-button decrease-button">-</button>
        <span>${item.cantidad}</span>
        <button class="quantity-button increase-button">+</button>
      </div>

      <button class="remove-button">Eliminar</button>
    `;

    const decreaseButton = cartItem.querySelector(".decrease-button") as HTMLButtonElement;
    const increaseButton = cartItem.querySelector(".increase-button") as HTMLButtonElement;
    const removeButton = cartItem.querySelector(".remove-button") as HTMLButtonElement;

    decreaseButton.addEventListener("click", () => {
      decreaseQuantity(item.id);
      renderCart();
    });

    increaseButton.addEventListener("click", () => {
      increaseQuantity(item.id);
      renderCart();
    });

    removeButton.addEventListener("click", () => {
      removeFromCart(item.id);
      renderCart();
    });

    cartContainer.appendChild(cartItem);
  });

  cartTotal.textContent = formatPrice(calculateTotal(cart));
};

const initPage = (): void => {
  checkAuhtUser(
    "/src/pages/auth/login/login.html",
    "/src/pages/admin/home/home.html",
    "client"
  );

  renderCart();
};

clearCartButton.addEventListener("click", () => {
  clearCart();
  renderCart();
});

initPage();
