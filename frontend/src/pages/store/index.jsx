import { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";

import ProductList from "./components/product-list/ProductList";
import ProductCardLarge from "./components/product-card-large/ProductCardLarge";
import Backdrop from "./components/backdrop/Backdrop";

import testImage from "/home/juho/kurssit/using-ai-to-tailor-product-listings-for-an-online-marketplace/frontend/src/assets/shark-in-a-glass.png";

import "./Store.css";

const DUMMY_PRODUCTS = [
  {
    id: 1,
    name: "Shark in a glass of water",
    description:
      "Exactly as it says on the box. This is a miniature shark inside a glass of water.",
    price: 100,
    image: testImage,
  },
  {
    id: 2,
    name: "Water",
    description: "A simple glass of water. Shark not included.",
    price: 5,
    image: testImage,
  },
  {
    id: 3,
    name: "Water glass",
    description:
      "A drinking glass. Perfect for any beverage. Image is a serving recommendation. Shark and water not included.",
    price: 8.5,
    image: testImage,
  },
  {
    id: 4,
    name: "Small shark",
    description:
      "A miniature shark. A pico white shark. This cute little swimmer makes for a perfect pet. Fits in a drinking glass.",
    price: 86.5,
    image: testImage,
  },
  {
    id: 5,
    name: "White table",
    description:
      "A white dinner table for six people. Legs are maple and the tabletop is Red Oak.",
    price: 50,
    image: testImage,
  },
];

const Store = () => {
  const [products] = useState(DUMMY_PRODUCTS);
  const [showLargeProductCard, setShowLargeProductCard] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    console.log(products);
  }, [products]);

  const showProductHandler = (productId) => {
    console.log("Show product: ", productId);
    const product = products.find((p) => p.id === productId);
    if (product) {
      setSelectedProduct(product);
      setShowLargeProductCard(true);
    } else {
      console.log("Could not find product with id ", productId);
    }
  };

  const addToWishlistHandler = () => {
    console.log("Add product to wishlist: ", selectedProduct.name);
  };

  const addToCartHandler = () => {
    console.log("Add product to cart: ", selectedProduct.name);
  };

  const closeLargeProductCardHandler = () => {
    setShowLargeProductCard(false);
  };

  return (
    <div className="store-background">
      <h1>Store page</h1>
      {showLargeProductCard && (
        <>
          <ProductCardLarge
            product={selectedProduct}
            addToWishlistHandler={addToWishlistHandler}
            addToCartHandler={addToCartHandler}
            closeHandler={closeLargeProductCardHandler}
          />
          <Backdrop onClick={closeLargeProductCardHandler} />
        </>
      )}
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
