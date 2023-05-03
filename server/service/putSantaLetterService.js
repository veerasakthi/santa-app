const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const apiProvider = require("../data/apiProvider");

const _CONSTANTS = require("../utility/constants");
const response = require("../utility/responseHandler");

const NodeCache = require("node-cache");
const nodeCache = new NodeCache();

/**
 * putSantaLetter
 *
 * @param {any} req http request
 * @return {any} santa gift response
 */
const putSantaLetter = async (req) => {
  try {
    // assign request body to a variable
    const reqBody = req.body;

    // email process flag set to 0
    reqBody.emailFlag = 0;
    // set a unique id to a letter
    reqBody.letterId = uuidv4();
    // set a datetime to the letter
    reqBody.insertTime = new Date();

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

    // get the existing stored letters and append the new letter and store it in-memory
    let toBeStored = [];
    let santaLetterList = nodeCache.get(_CONSTANTS.SANTA_LETTER_KEY);

    if (santaLetterList && santaLetterList.length) {
      santaLetterList.push(reqBody);
      toBeStored = santaLetterList;
    } else {
      toBeStored = [reqBody];
    }

    // store it in local cache
    let insertResult = nodeCache.set(_CONSTANTS.SANTA_LETTER_KEY, toBeStored);

    if (insertResult) {
      return response.success(_CONSTANTS.DREAM_SENT_TO_SANTA, []);
    }
    return response.error(_CONSTANTS.ERROR_OCCURED, []);
  } catch (err) {
    throw new Error(err);
  }
};

/**
 * inputValidationCheck
 *
 * @param {Object} reqBody request body from user
 * @return {Object} validation response
 */
function inputValidationCheck(reqBody) {
  const userName = reqBody.userName;
  const wish = reqBody.wish;

  if (userName && wish) {
    return response.success("", {});
  }
  return response.error(_CONSTANTS.USERNAME_OR_WISH_CANNOT_EMPTY, {});
}

/**
 * userValidationCheck
 *
 * @param {Object} reqBody request body from user
 * @return {Object} validation response
 */
async function userValidationCheck(reqBody) {
  const usersList = await apiProvider.getUserList();
  const userInfo = usersList.find((user) => user.username == reqBody.userName);

  // user exist check
  if (userInfo) {
    const profileList = await apiProvider.getProfileList();
    const profileInfo = profileList.find(
      (profile) => profile.userUid == userInfo.uid
    );

    // age validation
    if (getAge(profileInfo.birthdate) <= 10) {
      return response.success("", {});
    }
    return response.error(_CONSTANTS.CHILD_LESS_THAN_10_YEARS, {});
  }
  return response.error(_CONSTANTS.USER_DOESNOT_EXIST, {});
}

/**
 * getAge
 *
 * @param {String} birthDateString user birthday
 * @return {number} age of the user
 */
function getAge(birthDateString) {
  var today = new Date();
  var birthDate = new Date(birthDateString);
  // calc age based on year
  var ageInYear = today.getFullYear() - birthDate.getFullYear();
  // decide age based on month
  var diffMonth = today.getMonth() - birthDate.getMonth();
  // further breakdown with dates
  if (
    diffMonth < 0 ||
    (diffMonth == 0 && today.getDate() < birthDate.getDate())
  ) {
    ageInYear--;
  }
  return ageInYear;
}

module.exports = {
  putSantaLetter,
  nodeCache,
};
