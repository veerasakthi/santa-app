const API_ENDPOINT = {
  USER_LIST_API:
    "https://raw.githubusercontent.com/alj-devops/santa-data/master/users.json",
  PROFILE_LIST_API:
    "https://raw.githubusercontent.com/alj-devops/santa-data/master/userProfiles.json"
};

const CACHE_CONST = {
  // santa storage keyword
  SANTA_LETTER_KEY: "santaLetters"
};

const RES_MSG = {
  // response messages to user
  DREAM_SENT_TO_SANTA: "Dream sent to Santa Successfully!",
  ERROR_OCCURED: "Error Occurred Sorry!",
  USERNAME_OR_WISH_CANNOT_EMPTY: "username or wish cannot be Empty!",
  CHILD_LESS_THAN_10_YEARS: "child is more than 10 years old ",
  USER_DOESNOT_EXIST: "user doesn't exist !"
};

const LOGGER = {
  // logger messages
  NO_EMAILS_TO_PROCESS: "NO EMAILS TO PROCESS!",
  ENVIRONMENT_VARIABLES_NOT_SET: "environment variable doesnot exist!"
};

module.exports = {
  API_ENDPOINT,
  CACHE_CONST,
  RES_MSG,
  LOGGER
};
