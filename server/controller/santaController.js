// @ts-ignore
const { asyncCatch } = require("../utility/appUtils");
const getService = require("../service/getSantaLetterService");
const putService = require("../service/putSantaLetterService");
const mailService = require("../service/santaMailService");

/**
 * getSantaLetterCtrl
 *
 * @param {any} req http request
 * @param {any} res http response
 * @param {any} next pass control to the next middleware
 * @return {any} response to api gateway
 */
const getSantaLetterCtrl = asyncCatch(async (req, res, next) => {
  const result = await getService.getSantaLetter(req, next);

  // return response
  return res.status(200).json(result);
});

/**
 * putSantaLetterCtrl
 *
 * @param {any} req http request
 * @param {any} res http response
 * @param {any} next pass control to the next middleware
 * @return {any} response to api gateway
 */
const putSantaLetterCtrl = asyncCatch(async (req, res, next) => {
  const result = await putService.putSantaLetter(req, next);

  // return response
  return res.status(200).json(result);
});

/**
 * mailSantaLetterCtrl
 *
 * @param {any} req http request
 * @param {any} res http response
 * @param {any} next pass control to the next middleware
 * @return {any} response to api gateway
 */
const mailSantaLetterCtrl = asyncCatch(async (req, next) => {
  const result = await mailService.putSantaMail(req, next);

  console.log(result + new Date());
});

module.exports = {
  getSantaLetterCtrl,
  putSantaLetterCtrl,
  mailSantaLetterCtrl,
};
