const path = require("path");

/**
 * asyncCatch
 * - use to catch error in common [handle to error handler below]
 *
 * @param {any} asyncfn Function
 * @return {any}
 */
function asyncCatch(asyncfn) {
  return (req, res, next) => {
    asyncfn(req, res, next).catch(next);
  };
}

/**
 * errorHandler
 *
 * @param {any} error error
 * @param {any} req http request
 * @param {any} res http response
 * @param {any} next pass control to the next middleware
 * @return {any} response error
 */
function errorHandler(error, req, res, next) {
  console.error("## ERROR OCCURED...");
  console.error(error);
}

module.exports = {
  asyncCatch,
  errorHandler
};
