const fs = require("fs");
const axios = require("axios");
const { v4: uuidv4 } = require("uuid");
const { API_ENDPOINT, CACHE_CONST } = require("../common/constants");

const NodeCache = require("node-cache");
const nodeCache = new NodeCache();

/**
 * get the users list.
 *
 */
const getUserList = async () => {
  const response = await axios.get(API_ENDPOINT.USER_LIST_API);
  return response.data;
};

/**
 * get the profile list.
 *
 */
const getProfileList = async () => {
  const response = await axios.get(API_ENDPOINT.PROFILE_LIST_API);
  return response.data;
};

/**
 * get child full info.
 *
 */
const getChildByUserName = async (userName) => {
  let childInfo;

  // get user info
  const usersList = await getUserList();
  const userInfo = usersList.find((user) => user.username == userName);

  // user exist check
  if (userInfo) {
    // get profile info
    const profileList = await getProfileList();
    const profileInfo = profileList.find(
      (profile) => profile.userUid == userInfo.uid
    );

    // generate all child info
    childInfo = {
      userUid: profileInfo.userUid,
      address: profileInfo.address,
      birthdate: profileInfo.birthdate,
      username: userInfo.username,
      uid: userInfo.uid,
      age: getAge(profileInfo.birthdate),
      isChild: getAge(profileInfo.birthdate) <= 10 ? true : false,
    };
  }

  return childInfo;
};

/**
 * get new letter info
 *
 */
async function generateNewLetter(reqBody) {
  // get child info
  const childInfo = await getChildByUserName(reqBody.userName);
  // generate new letter
  const newLetter = {
    // letter info
    userName: reqBody.userName,
    wish: reqBody.wish,
    emailFlag: 0, // pending email to be sent by cron later
    letterId: uuidv4(),
    insertTime: new Date(),

    // child info
    userUid: childInfo.userUid,
    address: childInfo.address,
    birthdate: childInfo.birthdate,
    username: childInfo.username,
    uid: childInfo.uid,
    age: childInfo.age,
    isChild: childInfo.isChild,
  };

  return newLetter;
}

/**
 * store the child into cache.
 *
 */
const storeChildMail = async (requestBody) => {
  try {
    // get the existing stored letters and append the new letter and store it in-memory
    let santaLetters = [];
    const newLetter = await generateNewLetter(requestBody);
    let cacheList = await nodeCache.get(CACHE_CONST.SANTA_LETTER_KEY);

    if (cacheList && cacheList.length) {
      cacheList.push(newLetter);
      santaLetters = cacheList;
    } else {
      santaLetters = [newLetter];
    }

    // store it in local cache
    let insertResult = await nodeCache.set(
      CACHE_CONST.SANTA_LETTER_KEY,
      santaLetters
    );

    if (!insertResult) {
      throw new Error("Cache storing error");
    }
  } catch (err) {
    throw new Error("Cache storing error");
  }
};

/**
 * make mail sent flag as DONE.
 *
 */
const markMailSentFlag = async (mailSentList) => {
  try {
    // update email sent flag process
    let allCacheLetterList = await nodeCache.get(CACHE_CONST.SANTA_LETTER_KEY);

    // loop through all list and mark only sent letters as DONE
    mailSentList.forEach(async (unsent) => {
      //Find index of specific object using findIndex method.
      let index = allCacheLetterList.findIndex(
        (allLtr) => allLtr.letterId == unsent.letterId
      );

      // update letter's emailFlag property.
      allCacheLetterList[index].emailFlag = 1;
    });

    // update the cache
    await nodeCache.set(CACHE_CONST.SANTA_LETTER_KEY, allCacheLetterList);
  } catch (err) {
    throw new Error("cache email update flag error");
  }
};

/**
 * get all santa letters from cache.
 *
 */
const getAllSantaLetters = async () => {
  // get the existing stored letters stored in-memory
  let santaLettersList = await nodeCache.get(CACHE_CONST.SANTA_LETTER_KEY);

  if (santaLettersList && santaLettersList.length) {
    return santaLettersList;
  }
  return [];
};

/**
 * get all yet to send santa letters from cache.
 *
 */
const getAllPendingLetters = async () => {
  let santaLetterList = await nodeCache.get(CACHE_CONST.SANTA_LETTER_KEY);

  if (!santaLetterList) {
    return [];
  }

  // filter the unsent letters to santa
  let unsentLetters = santaLetterList.filter(function (letter) {
    return letter.emailFlag == 0;
  });

  if (unsentLetters && unsentLetters.length) {
    return unsentLetters;
  }
  return [];
};

/**
 * getAge
 *
 */
function getAge(birthDateStr) {
  var today = new Date();
  var birthDate = new Date(birthDateStr);

  // calc age based on year
  var ageInYear = today.getFullYear() - birthDate.getFullYear();
  // decide age based on month
  var diffMonth = today.getMonth() - birthDate.getMonth();

  // further breakdown with months
  if (
    diffMonth < 0 ||
    (diffMonth == 0 && today.getDate() < birthDate.getDate())
  ) {
    ageInYear--;
  }
  return ageInYear;
}

module.exports = {
  getUserList,
  getProfileList,
  getChildByUserName,
  storeChildMail,
  getAllSantaLetters,
  getAllPendingLetters,
  markMailSentFlag,
};

/**
 * LOCAL TESTING CODE
 */
// // get the users list [local data for testing]
// const getUserList = async () => {
//   // get user list from local
//   let usersList = JSON.parse(
//     fs.readFileSync("nodejs/data/local_resource/users.json", "utf8")
//   );
//   return usersList;
// };

// // get the profile list. [local data for testing]
// const getProfileList = async () => {
//   // get user list from local
//   let profileList = JSON.parse(
//     fs.readFileSync("nodejs/data/local_resource/userProfiles.json", "utf8")
//   );
//   return profileList;
// };
