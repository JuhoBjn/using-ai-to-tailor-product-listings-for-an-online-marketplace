import { useState, useEffect, useMemo } from "react";
import { useLoaderData, useLocation, useSearchParams } from "react-router-dom";

import ProductList from "./components/product-list/ProductList";
import ProductCardLarge from "./components/product-card-large/ProductCardLarge";
import Backdrop from "./components/backdrop/Backdrop";

import "./Store.css";
import { getTailoredProduct } from "../../utils/ProductsAPI";

function useQuery() {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}

const Store = () => {
  const [products] = useState(useLoaderData());
  const [showLargeProductCard, setShowLargeProductCard] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const query = useQuery();

  useEffect(() => {
    // get the user details from the query parameters
    const age = query.get("age");
    const sex = query.get("sex");
    const height = query.get("height");
    const weight = query.get("weight");
    const mobilePlatform = query.get("mobilePlatform");
    const activityLevel = query.get("activityLevel");

    setUserDetails({
      age: age,
      sex: sex,
      height: height,
      weight: weight,
      mobile_platform: mobilePlatform,
      activity_level: activityLevel,
    });
  }, [query]);

  const showProductHandler = async (productId) => {
    console.log("Show product: ", productId);
    const product = products.find((p) => p.id === productId);
    const product = await getTailoredProduct(userDetails, productId);
    console.log(product);
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
          products={products}
          showProductHandler={showProductHandler}
        />
      </div>
    </div>
  );
};

export default Store;
