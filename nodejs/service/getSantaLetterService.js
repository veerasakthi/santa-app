const response = require("../utility/responseModel");
const apiProvider = require("../data/apiProvider");

/**
 * getSantaLetters
 *
 * @param {any} req http request
 * @return {any} all santa letters
 */
const getSantaLetter = async (req) => {
  try {
    // get santa's letters from cache
    const santaLetterList = await apiProvider.getAllSantaLetters();

    return response.success("", santaLetterList.reverse());
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  getSantaLetter,
};
