// @ts-ignore
const { asyncCatch } = require("../utility/appUtils");
const getService = require("../service/getSantaLetterService");
const putService = require("../service/putSantaLetterService");
const cronService = require("../service/cronMailService");

/**
 * get list of all santa's letters.
 *
 */
const getSantaLetterCtrl = asyncCatch(async (req, res, next) => {
  const result = await getService.getSantaLetter(req, next);

  // return response
  return res.status(200).json(result);
});

/**
 * save the santa letter to cache.
 *
 */
const putSantaLetterCtrl = asyncCatch(async (req, res, next) => {
  const result = await putService.putSantaLetter(req, next);

  // return response
  return res.status(200).json(result);
});

/**
 * sends the letter to santa.
 *
 */
const cronSantaLetterCtrl = asyncCatch(async (req, next) => {
  const result = await cronService.putSantaMail(req, next);

  // log the result
  console.log(result + new Date());
});

module.exports = {
  getSantaLetterCtrl,
  putSantaLetterCtrl,
  cronSantaLetterCtrl,
};
