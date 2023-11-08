import { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";

import ProductList from "./components/product-list/ProductList";

import testImage from "/home/juho/kurssit/using-ai-to-tailor-product-listings-for-an-online-marketplace/frontend/src/assets/shark-in-a-glass.png";

import "./Store.css";

const DUMMY_PRODUCTS = [
  {
    id: 1,
    name: "Shark in a glass of water",
    price: 100,
    image: testImage,
  },
  {
    id: 2,
    name: "Water",
    price: 5,
    image: testImage,
  },
  {
    id: 3,
    name: "Water glass",
    price: 8.5,
    image: testImage,
  },
  {
    id: 4,
    name: "Small shark",
    price: 86.5,
    image: testImage,
  },
  {
    id: 5,
    name: "White table",
    price: 50,
    image: testImage,
  },
];

const Store = () => {
  const [products, setProducts] = useState(useLoaderData());

  useEffect(() => {
    console.log(products);
  }, [products]);

  const showProductHandler = () => {
    console.log("Show product");
  };

  return (
    <div className="store-background">
      <h1>Store page</h1>
      <div className="product-list-container">
        <ProductList
          products={DUMMY_PRODUCTS}
          showProductHandler={showProductHandler}
        />
      </div>
    </div>
  );
};

export default Store;
