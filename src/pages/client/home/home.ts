import { checkAuhtUser, logout } from "../../../utils/auth";
import { PRODUCTS, getCategories } from "../../../data/data";
import type { Product } from "../../../types/product";
import type { ICategory } from "../../../types/category";
import { addToCart, getCartQuantity } from "../../../utils/cart";

const buttonLogout = document.getElementById("logoutButton") as HTMLButtonElement;
const productsContainer = document.getElementById("productsContainer") as HTMLDivElement;
const categoriesContainer = document.getElementById("categoriesContainer") as HTMLDivElement;
const searchInput = document.getElementById("searchInput") as HTMLInputElement;
const message = document.getElementById("message") as HTMLParagraphElement;
const cartCount = document.getElementById("cartCount") as HTMLSpanElement;

let selectedCategoryId: number | null = null;
let searchText = "";

buttonLogout?.addEventListener("click", () => {
  logout();
});

const formatPrice = (price: number): string => {
  return price.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
  });
};

const updateCartCount = (): void => {
  cartCount.textContent = String(getCartQuantity());
};

const getFilteredProducts = (): Product[] => {
  let products = PRODUCTS.filter((product) => !product.eliminado);

  if (selectedCategoryId !== null) {
    products = products.filter((product) =>
      product.categorias.some((category) => category.id === selectedCategoryId)
    );
  }

  if (searchText.trim() !== "") {
    products = products.filter((product) =>
      product.nombre.toLowerCase().includes(searchText.toLowerCase())
    );
  }

  return products;
};

const renderCategories = (categories: ICategory[]): void => {
  categoriesContainer.innerHTML = "";

  const allButton = document.createElement("button");
  allButton.textContent = "Todos";
  allButton.className =
    selectedCategoryId === null ? "category-button active" : "category-button";

  allButton.addEventListener("click", () => {
    selectedCategoryId = null;
    renderPage();
  });

  categoriesContainer.appendChild(allButton);

  categories.forEach((category) => {
    const button = document.createElement("button");
    button.textContent = category.nombre;
    button.className =
      selectedCategoryId === category.id
        ? "category-button active"
        : "category-button";

    button.addEventListener("click", () => {
      selectedCategoryId = category.id;
      renderPage();
    });

    categoriesContainer.appendChild(button);
  });
};

const renderProducts = (products: Product[]): void => {
  productsContainer.innerHTML = "";

  if (products.length === 0) {
    message.textContent = "No se encontraron productos con esa búsqueda o categoría.";
    return;
  }

  message.textContent = "";

  products.forEach((product) => {
    const categoryName = product.categorias[0]?.nombre ?? "Sin categoría";
    const isDisabled = !product.disponible || product.stock <= 0;

    const card = document.createElement("article");
    card.className = "product-card";

    const imageSrc = product.imagen.startsWith("http")
      ? product.imagen
      : `/${product.imagen}`;

    card.innerHTML = `
      <div class="image-wrapper">
        <img class="product-image" src="${imageSrc}" alt="${product.nombre}" />
        <span class="availability ${isDisabled ? "unavailable" : "available"}">
          ${isDisabled ? "Sin stock" : "Disponible"}
        </span>
      </div>
      <div class="product-body">
        <span class="badge">${categoryName}</span>
        <h3>${product.nombre}</h3>
        <p>${product.descripcion}</p>
        <div class="product-footer">
          <div>
            <p class="price">${formatPrice(product.precio)}</p>
            <p class="stock">Stock: ${product.stock}</p>
          </div>
          <button class="add-button" ${isDisabled ? "disabled" : ""}>
            ${isDisabled ? "No disponible" : "Agregar"}
          </button>
        </div>
      </div>
    `;

    const addButton = card.querySelector(".add-button") as HTMLButtonElement;

    addButton.addEventListener("click", () => {
      addToCart(product);
      updateCartCount();
      message.textContent = `${product.nombre} agregado al carrito correctamente.`;
    });

    productsContainer.appendChild(card);
  });
};

const renderPage = (): void => {
  renderCategories(getCategories());
  renderProducts(getFilteredProducts());
  updateCartCount();
};

searchInput.addEventListener("input", () => {
  searchText = searchInput.value;
  renderPage();
});

const initPage = (): void => {
  checkAuhtUser(
    "/src/pages/auth/login/login.html",
    "/src/pages/admin/home/home.html",
    "client"
  );

  renderPage();
};

initPage();
