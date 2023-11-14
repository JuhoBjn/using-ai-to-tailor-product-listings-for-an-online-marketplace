import ReactDOM from "react-dom";

import "./ProductCardLarge.css";

const ProductCardLarge = ({
  product,
  addToWishlistHandler,
  addToCartHandler,
  closeHandler,
}) => {
  const content = (
    <div className="product-card-large_container">
      <div className="product-card-large_header">
        <div
          className="product-card-large_close-button-container"
          onClick={closeHandler}
        >
          <div id="cross-1" />
          <div id="cross-2" />
        </div>
      </div>
      <div className="product-card-large_body">
        <div className="product-card-large_image-container">
          <img src={product.image} alt="Product picture" />
        </div>
        <div className="product-card-large_content">
          <h1>{product.name}</h1>
          <p>{product.price} €</p>
          <p>{product.description}</p>
          <div className="product-card-large_content-actions">
            <button id="add-to-wishlist-button" onClick={addToWishlistHandler}>
              Add to wishlist
            </button>
            <button id="add-to-cart-button" onClick={addToCartHandler}>
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  return ReactDOM.createPortal(
    content,
    document.getElementById("product-card-large-hook")
  );
};

export default ProductCardLarge;
