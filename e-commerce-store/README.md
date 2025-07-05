# E-Commerce Store

A modern e-commerce store built with React, Vite, and Tailwind CSS. This project features a responsive design with product listings, shopping cart functionality, search capabilities, and a checkout process.

## Features

- 🛍️ Product catalog with images and details
- 🔍 Product search functionality
- 🛒 Shopping cart with add/remove items
- 💳 Checkout process
- 📱 Responsive design for all devices
- ⚡ Fast development with Vite
- 🎨 Modern UI with Tailwind CSS

## Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (version 16 or higher)
- **npm** (comes with Node.js) or **yarn**

You can check your Node.js version by running:

```bash
node --version
npm --version
```

## Step-by-Step Setup Instructions

### Step 1: Clone or Download the Project

If you have the project files locally, navigate to the project directory:

```bash
cd e-commerce-store
```

### Step 2: Install Dependencies

Install all required packages using npm:

```bash
npm install
```

Or if you prefer using yarn:

```bash
yarn install
```

This will install all the dependencies listed in `package.json`, including:

- React 19.1.0
- React Router DOM 7.6.3
- Tailwind CSS 4.1.11
- Vite 7.0.0
- ESLint and other development tools

### Step 3: Start the Development Server

Run the development server:

```bash
npm run dev
```

Or with yarn:

```bash
yarn dev
```

The application will start and be available at `http://localhost:5173` (or another port if 5173 is busy).

### Step 4: Open in Browser

Open your web browser and navigate to:

```
http://localhost:5173
```

You should see the e-commerce store homepage with product listings.

## Available Scripts

- `npm run dev` - Start the development server with hot reload
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

## Project Structure

```
e-commerce-store/
├── public/                 # Static assets
│   └── images/            # Product images
├── src/
│   ├── components/        # React components
│   │   ├── Cart.jsx       # Shopping cart component
│   │   ├── Checkout.jsx   # Checkout process
│   │   ├── ProductList.jsx # Product catalog
│   │   ├── SearchBar.jsx  # Search functionality
│   │   └── Toast.jsx      # Notification component
│   ├── assets/            # Additional assets
│   ├── App.jsx            # Main application component
│   ├── App.css            # Application styles
│   ├── index.css          # Global styles
│   └── main.jsx           # Application entry point
├── package.json           # Dependencies and scripts
├── vite.config.js         # Vite configuration
├── tailwind.config.js     # Tailwind CSS configuration
└── README.md              # This file
```

## Troubleshooting

### Common Issues

1. **Port already in use**: If you see an error about port 5173 being busy, Vite will automatically try the next available port.

2. **Dependencies not found**: If you encounter module not found errors, try:

   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Build errors**: If the build fails, check that all dependencies are properly installed and try:
   ```bash
   npm run lint
   ```

## Technologies Used

- **React 19** - UI library
- **Vite** - Build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **ESLint** - Code linting

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run `npm run lint` to check code quality
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).
