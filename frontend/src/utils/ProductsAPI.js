/**
 * @typedef {object} UserProfile
 * @property {number} age
 * @property {string} sex
 * @property {number} height
 * @property {number} weight
 * @property {string} android_or_ios
 * @property {string} activity_level
 */

/**
 * Get products tailored for the given user.
 * @param {UserProfile} userProfile Object containing the user's details
 * @returns {Array<Object>} Array of objects containing product details
 */
export const getTailoredProducts = async (userProfile) => {
  try {
    console.log(JSON.stringify(userProfile));
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/personalize_products`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(userProfile),
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
