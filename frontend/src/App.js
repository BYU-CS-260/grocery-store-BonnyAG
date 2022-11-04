import React, { useEffect, useState } from 'react';
import './App.css';
import axios, * as others from 'axios';
import Product from './Product';
import Error from './Error';
import Cart from './Cart';

const baseURL = "http://localhost:3000";

function App() {
  // setup state
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [error, setError] = useState("");
  const [update, setUpdate] = useState(false);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/products`);
      setProducts(response.data);
    } catch (error) {
      setError("error retrieving tasks: " + error);
    }
  }

  const fetchCart = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/cart`);
      setCart(response.data);
    } catch (error) {
      setError("error retrieving tasks: " + error);
    }
  }

  const updateCart = () => {
    setUpdate(true);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect((updateCart) => {
    fetchCart();
    setUpdate(false);
  }, [update])

  return (
    <div className="App">
      <header>
        <h1>Our Fancy Store</h1>
      </header>
      <main>
        {error != "" ? <Error error={error} /> : ""}
        <section className='products'>
          <h1>Products</h1>
          {products.map(item => (
            <Product key={item.id} product={item} setError={setError} updateCart={updateCart} />
          ))}  
        </section>
        <section>
          <h1>Cart</h1>
          <Cart cart={cart} products={products} setError={setError} updateCart={updateCart} />
        </section>
      </main>
    </div>
  );
}

export default App;
