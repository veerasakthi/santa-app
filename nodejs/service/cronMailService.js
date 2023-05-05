const apiProvider = require("../data/apiProvider");
const { LOGGER } = require("../common/constants");

const { mailSender } = require("./mailSenderService");

/**
 * putSantaMail
 *
 * @param {any} req http request
 * @return {any} santa gift response
 */
const putSantaMail = async (req) => {
  try {
    console.log(" ----------- CRON start -----------");

    // get all yet to send letters
    const unsentLetters = await apiProvider.getAllPendingLetters();

    if (unsentLetters.length === 0) {
      console.log(LOGGER.NO_EMAILS_TO_PROCESS);
      console.log("----------- SKIP end... -----------");
      return true;
    }

    // MAIL SEND By Loop
    unsentLetters.forEach(async (letter) => {
      const emailSubject = getMailSubject(letter);
      const emailBody = getMailBody(letter);
      // send email
      await mailSender(emailSubject, emailBody);

      // mark as email sent flag [DONE]
      await apiProvider.markMailSentFlag(letter);
    });

    console.log(`mail sent count = ${unsentLetters.length}`);
    console.log("----------- CRON end -----------");
    return true;
  } catch (err) {
    throw new Error(err);
  }
};

function getMailSubject (letter) {
  return `wish from child ${letter.username}`;
}

function getMailBody (letter) {
  return `
            Dear Santa!
    
            wish from child ${letter.username} 
            child's address - ${letter.address} 
    
            child's wish is
            ${letter.wish} 
    
            Thank you...
            -----------------------
    `;
}

module.exports = {
  putSantaMail
};
