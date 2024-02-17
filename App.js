// App.js
import React, { useState } from 'react';
import './App.css';

const Navbar = () => {
  return (
    <nav>
      <div className="container">
        <h1>Flowers Shop</h1>
        <input type="text" placeholder="Search..." />
      </div>
    </nav>
  );
};

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="product-card">
      <img src={product.img} alt={product.name} />
      <div className="info">
        <h3>{product.name}</h3>
        <p>{product.price}</p>
        <div className="quantity">
          <button onClick={() => onAddToCart(product, -1)}>-</button>
          <span>{product.quantity}</span>
          <button onClick={() => onAddToCart(product, 1)}>+</button>
        </div>
        <button onClick={() => onAddToCart(product, 1)}>Add to Cart</button>
      </div>
    </div>
  );
};

const ProductList = ({ products, onAddToCart }) => {
  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
};

const ShoppingCart = ({ cart }) => {
  return (
    <div className="shopping-cart">
      <h2>Shopping Cart</h2>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            {item.name} - Quantity: {item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

const App = () => {
  const [cart, setCart] = useState([]);
  const [products] = useState([
    { id: 1, name: 'Blue Flowers', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd2Xl9oktF6Depx4gGgMzdMS5Rhsg-7eaVLw&usqp=CAU', price: 'Rs-400', quantity: 0 },
    { id: 2, name: 'Shades of blue', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8KD57i7QbbqGAOZTQgpv3dRjls4Iu_AUAfIEyZfffLn9zBmb88rxjngIO55AEKu_UcHU&usqp=CAU', price: 'Rs-450', quantity: 0 },
    // Add more products as needed
  ]);

  const handleAddToCart = (product, quantity) => {
    const updatedCart = [...cart];
    const existingItemIndex = updatedCart.findIndex((item) => item.id === product.id);

    if (existingItemIndex !== -1) {
      updatedCart[existingItemIndex].quantity += quantity;
    } else {
      updatedCart.push({ ...product, quantity: 1 });
    }

    setCart(updatedCart);
  };

  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <ProductList products={products} onAddToCart={handleAddToCart} />
        <ShoppingCart cart={cart} />
      </div>
    </div>
  );
};

export default App;