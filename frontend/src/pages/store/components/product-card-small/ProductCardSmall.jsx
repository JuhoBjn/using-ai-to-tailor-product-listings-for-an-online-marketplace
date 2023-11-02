import "./ProductCardSmall.css";

const ProductCardSmall = ({ id, name, price, image, showProductHandler }) => {
  return (
    <div
      className="product-card-background"
      onClick={() => showProductHandler(id)}
    >
      <img src={image} alt={`Product picture of ${name}`} />
      <h3 className="product-name">{name}</h3>
      <p className="product-price">{price} €</p>
    </div>
  );
};

export default ProductCardSmall;
