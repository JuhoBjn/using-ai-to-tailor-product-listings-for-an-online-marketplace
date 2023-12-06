export const storeLoader = async () => {
  console.log("Loader loading products");
  return fetch(`${import.meta.env.VITE_API_URL}/api/products`);
};
