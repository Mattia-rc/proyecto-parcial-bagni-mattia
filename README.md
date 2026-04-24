<<<<<<< HEAD
# Food Store - Parcial Programación III

Proyecto frontend desarrollado con HTML, CSS, JavaScript y TypeScript sobre Vite.

## Funcionalidades implementadas

- Login y control de acceso según rol del proyecto base.
- Catálogo de productos renderizado dinámicamente desde `src/data/data.ts`.
- Búsqueda de productos por nombre.
- Filtrado de productos por categoría.
- Carrito de compras persistido en `localStorage`.
- Si un producto ya existe en el carrito, se incrementa su cantidad.
- Vista de carrito con nombre, precio, cantidad y subtotal.
- Cálculo del total general de la compra.
- Posibilidad de aumentar, disminuir, eliminar productos y vaciar el carrito.

## Estructura principal

```txt
src/
├── data/
│   └── data.ts
├── pages/
│   └── client/
│       ├── home/
│       │   ├── home.html
│       │   ├── home.css
│       │   └── home.ts
│       └── cart/
│           ├── cart.html
│           ├── cart.css
│           └── cart.ts
├── types/
│   ├── category.ts
│   └── product.ts
└── utils/
    └── cart.ts
```

## Cómo ejecutar el proyecto

Instalar dependencias:

```bash
pnpm install
```

Ejecutar servidor de desarrollo:

```bash
pnpm dev
```

Abrir en el navegador:

```txt
http://localhost:5173
```

## Páginas registradas en Vite

- `index.html`
- `src/pages/auth/login/login.html`
- `src/pages/auth/registro/registro.html`
- `src/pages/admin/home/home.html`
- `src/pages/client/home/home.html`
- `src/pages/client/cart/cart.html`


## Diseño e imágenes

El proyecto usa CSS propio y URLs de imágenes externas para mejorar la presentación visual del catálogo, carrito e inicio de sesión.

Si alguna imagen externa no carga por conexión a internet, la lógica del proyecto sigue funcionando correctamente.
=======
# proyecto-parcial-bagni-mattia
>>>>>>> 66409812f99b70e9daa2f2d633498b7d14eb72e2
