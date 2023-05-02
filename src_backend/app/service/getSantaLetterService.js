const _CONSTANTS = require("../utility/constants");
const response = require("../utility/responseHandler");

const { nodeCache } = require("../service/putSantaLetterService");

/**
 * getSantaLetters
 *
 * @param {any} req http request
 * @return {any} all santa letters
 */
const getSantaLetter = async (req) => {
  try {
    // get santa's letters from cache
    const santaLetterList = nodeCache.get(_CONSTANTS.SANTA_LETTER_KEY);

    if (santaLetterList && santaLetterList.length > 0) {
      return response.success("", santaLetterList.reverse());
    }
    return response.success("", []);
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  getSantaLetter,
};
