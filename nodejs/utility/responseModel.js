/**
 * success response
 *
 * @param {String} msg the message code that is to be returned
 * @param {Object} dataResult that contains the response data
 * @return {any} response object
 */
function success (msg, dataResult) {
  // result object contains statuscode, status, message, result obj
  const result = {
    statusCode: 200,
    status: "success",
    isError: false,
    message: msg,
    data: dataResult
  };

  // return common result
  return result;
}

/**
 * error response
 *
 * @param {String} msg the message code that is to be returned
 * @param {Object} dataResult that contains the response data
 * @return {any} response object
 */
function error (msg, dataResult) {
  // result object contains statuscode, status, message, result obj
  const result = {
    statusCode: 200,
    status: "error",
    isError: true,
    message: msg,
    data: dataResult
  };

  // return common result
  return result;
}

module.exports = {
  success,
  error
};
