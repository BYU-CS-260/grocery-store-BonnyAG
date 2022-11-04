import React, { useEffect, useState } from 'react';
import './App.css';
import axios, * as others from 'axios';
import Product from './Product';

const baseURL = "http://localhost:3000";

const fetchProducts = async () => {
  const response = await axios.get(`${baseURL}/api/products`);
  console.log(response);
  return response;
}

function App() {
  const [products, setProduct] = useState();

  useEffect(() => {
    setProduct(fetchProducts());
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Products</h1>
      </header>
      <main>
        products.map((item) => {
          <Product product={item} setError={false} updateCart={item} />
        })
      </main>
    </div>
  );
}

export default App;
