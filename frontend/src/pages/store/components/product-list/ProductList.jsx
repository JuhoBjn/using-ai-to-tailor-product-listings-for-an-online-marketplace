import ProductCardSmall from "../product-card-small/ProductCardSmall";

import "./ProductList.css";

const ProductList = ({ products, showProductHandler }) => {
  if (products.length === 0) {
    return <h3>No products found</h3>;
  }

  return (
    <ul className="product-list">
      {products.map((product) => (
        <ProductCardSmall
          key={product.id}
          id={product.id}
          image={product.image}
          name={product.name}
          price={product.price}
          showProduct={showProductHandler}
        />
      ))}
    </ul>
  );
};

export default ProductList;
