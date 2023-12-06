/**
 * @typedef {object} UserProfile
 * @property {number} age
 * @property {string} sex
 * @property {number} height
 * @property {number} weight
 * @property {string} mobile_platform
 * @property {string} activity_level
 */

/**
 * Get product tailored for the given user.
 * @param {UserProfile} userProfile Object containing the user's details
 * @param {number} productId ID of the product to be tailored
 * @returns {Promise<object>} Object containing the tailored product
 */
export const getTailoredProduct = async (userProfile, productId) => {
  try {
    console.log(JSON.stringify(userProfile));
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/personalize_product`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ ...userProfile, product_id: productId }),
      }
    );
    if (response.status !== 200) {
      throw new Error(response.body);
    }
    return response.json();
  } catch (error) {
    console.log(error.message);
  }
};
