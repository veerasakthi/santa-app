const fs = require("fs");
const axios = require("axios");

/**
 * getUserList
 *
 * @return {any} user list
 */
const getUserList = async () => {
  // get user list from local
  let usersList = JSON.parse(
    fs.readFileSync("server/data/local_resource/users.json", "utf8")
  );

  return usersList;

  //   // get from api
  //   const USER_LIST_API =
  //     "https://raw.githubusercontent.com/alj-devops/santa-data/master/users.json";

  //   const response = await axios.get(USER_LIST_API);
  //   return response.data;
};

/**
 * getProfileList
 *
 * @return {any} profile list
 */
const getProfileList = async () => {
  // get user list from local

  let profileList = JSON.parse(
    fs.readFileSync("server/data/local_resource/userProfiles.json", "utf8")
  );

  return profileList;

  //   // get from api
  //   const PROFILE_LIST_API =
  //     "https://raw.githubusercontent.com/alj-devops/santa-data/master/userProfiles.json";

  //   const response = await axios.get(PROFILE_LIST_API);
  //   return response.data;
};

module.exports = {
  getUserList,
  getProfileList,
};
