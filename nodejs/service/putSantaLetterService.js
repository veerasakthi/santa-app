const apiProvider = require("../data/apiProvider");

const { RES_MSG } = require("../common/constants");
const response = require("../utility/responseModel");

/**
 * putSantaLetter
 *
 */
const putSantaLetter = async (req) => {
  try {
    // assign request body to a variable
    const reqBody = req.body;

    // input validation
    const inputValidationResult = inputValidationCheck(reqBody);
    if (inputValidationResult?.isError) {
      return inputValidationResult;
    }

    // child validation
    const userResult = await userValidationCheck(reqBody);
    if (userResult?.isError) {
      return userResult;
    }

    // store letter
    await apiProvider.storeChildMail(reqBody);

    // return success
    return response.success(RES_MSG.DREAM_SENT_TO_SANTA, []);
  } catch (err) {
    throw new Error(err);
  }
};

/**
 * inputValidationCheck
 *
 */
function inputValidationCheck(reqBody) {
  const userName = reqBody.userName;
  const wish = reqBody.wish;

  if (userName && wish) {
    return response.success("", {});
  }
  return response.error(RES_MSG.USERNAME_OR_WISH_CANNOT_EMPTY, {});
}

/**
 * userValidationCheck
 *
 */
async function userValidationCheck(reqBody) {
  // get child full info
  const childInfo = await apiProvider.getChildByUserName(reqBody.userName);

  // child exist
  if (!childInfo) {
    return response.error(RES_MSG.USER_DOESNOT_EXIST, {});
  }

  // is child check
  if (childInfo.isChild) {
    return response.success("", {});
  }

  return response.error(RES_MSG.CHILD_LESS_THAN_10_YEARS, {});
}

module.exports = {
  putSantaLetter,
};
