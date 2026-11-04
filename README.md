# NexusRig ⚡ // Cyberpunk PC Hardware & Battlestations

[![React](https://img.shields.io/badge/React-18.3-blue.svg?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF.svg?logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC.svg?logo=tailwind-css)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-R3F-black.svg?logo=three.js)](https://docs.pmnd.rs/react-three-fiber)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-FF0055.svg?logo=framer)](https://www.framer.com/motion/)

> A high-performance single-page e-commerce application for elite custom gaming rigs, liquid-cooled hardware, and esports peripherals, built with a cutting-edge cyberpunk aesthetic.

---

## ✨ Features

- **Cyberpunk Visual Architecture**: Dynamic glitch typography, ambient neon orbs, scanlines, and an animated noise shader overlay.
- **Three.js Ambient 3D Meshes**: Real-time rotating abstract geometries powered by `@react-three/fiber` and `@react-three/drei`.
- **Physics-Based 3D Card Hover**: Product cards calculate cursor angle and apply responsive 3D tilt with Framer Motion spring physics.
- **Cybernetic Terminal Boot Sequence**: Fast initialization screen with terminal status log, system diagnostics, progress bar, and instant `ESC` skip.
- **Multilingual Support (Italian & English)**: Real-time i18n language toggle (`IT` / `EN`), localized product specs, Milan tech hub contact info, and Euro (`€`) pricing.
- **Cart Drawer & Global State**: Slide-over cart drawer with quantity adjustments, free shipping threshold calculations, and persistent `localStorage` synchronization.
- **Wishlist Protocol**: Save favorite hardware drops with one-click toggling, persisted across sessions.
- **Real-Time Catalog Filtering & Search**: Instant filter by category, sort by price/rating, and URL-synchronized search parameters.
- **Mainframe Authentication**: Level 4 clearance sign-in and registration flow with active operator session indicators.
- **Interactive Checkout Flow**: Field validation, delivery cost calculations, and order confirmation dispatch.
- **Performance Optimized**: Route-level code splitting (`React.lazy`), throttled mousemove spark trails, and zero ESLint errors.

---

## 🛠️ Tech Stack

- **Framework**: [React 18](https://react.dev/) (Vite bundler)
- **Routing**: [React Router v6](https://reactrouter.com/) (Data-driven routes with page transition wrappers)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [DaisyUI](https://daisyui.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **3D Graphics**: [Three.js](https://threejs.org/) + [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- **Carousels**: [Swiper](https://swiperjs.com/) (Autoplay & fade transitions)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18.x or higher recommended)
- npm or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/benhebessatadjeddine/tech_shop.git
   cd tech_shop
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

5. **Run ESLint**:
   ```bash
   npm run lint
   ```

---

## 📂 Project Structure

```
tech_shop/
├── public/                 # Static assets, branding, and product imagery
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Header/         # Navigation, search modal, user status
│   │   ├── Home/           # Hero slider, 3D canvas, flash deals, product cards
│   │   ├── About/          # Statistics & Master Builder cards
│   │   ├── BootScreen.jsx  # Cyberpunk terminal boot sequence
│   │   ├── CartDrawer.jsx  # Slide-over shopping cart
│   │   └── CursorTrail.jsx # Ambient cursor particle trail
│   ├── context/            # StoreContext (Cart, Wishlist, User, Toasts)
│   ├── data/               # Product catalog specifications
│   ├── pages/              # Routed pages (Home, Products, Detail, Checkout, etc.)
│   ├── routes.jsx          # Lazy-loaded route architecture
│   └── App.jsx             # Main shell
```

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
