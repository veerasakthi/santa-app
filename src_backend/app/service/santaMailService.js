const fs = require("fs");
const path = require("path");
const _CONSTANTS = require("../utility/constants");

const { nodeCache } = require("./putSantaLetterService");
const { mailSender } = require("../utility/mailSender");

const apiProvider = require("../data/apiProvider");

/**
 * putSantaMail
 *
 * @param {any} req http request
 * @return {any} santa gift response
 */
const putSantaMail = async (req) => {
  try {
    console.log(" ----------- CRON mail started -----------");

    // get all santa letters
    let santaLetterList = nodeCache.get(_CONSTANTS.SANTA_LETTER_KEY);

    if (!santaLetterList) {
      console.log(_CONSTANTS.NO_EMAILS_TO_PROCESS);
      return "----------- SKIP... -----------";
    }

    // filter the unsent letters to santa
    let unsentLetters = santaLetterList.filter(function (letter) {
      return letter.emailFlag == 0;
    });

    if (!unsentLetters) {
      console.log(_CONSTANTS.NO_EMAILS_TO_PROCESS);
      return "----------- SKIP... -----------";
    }

    // MAIL SENDING CODE
    unsentLetters.forEach(async (letter) => {
      // find user name from user list
      const usersList = await apiProvider.getUserList();
      const userInfo = usersList.find(
        (user) => user.username == letter.userName
      );
      // find profile info using uid
      const profileList = await apiProvider.getProfileList();
      const profileInfo = profileList.find(
        (profile) => profile.userUid == userInfo.uid
      );

      const emailSubject = `wish from child ${userInfo.username}`;
      const emailBody = `
            Dear Santa
    
            wish from child ${userInfo.username} 
            child's address ${profileInfo.address} 
    
            child's wish is
            ${letter.wish} 
    
            Thank you...
            -----------------------
            `;

      // send email
      await mailSender(emailSubject, emailBody);
    });

    // update email sent flag process
    let latestSantaLetterList = nodeCache.get(_CONSTANTS.SANTA_LETTER_KEY);

    unsentLetters.forEach(async (letter) => {
      //Find index of specific object using findIndex method.
      let objIndex = latestSantaLetterList.findIndex(
        (obj) => obj.letterId == letter.letterId
      );

      //Update object's emailFlag property.
      latestSantaLetterList[objIndex].emailFlag = 1;
    });

    // update the cache
    nodeCache.set(_CONSTANTS.SANTA_LETTER_KEY, latestSantaLetterList);

    return "----------- SUCCESS... ----------- ";
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  putSantaMail,
};
