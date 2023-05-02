
const path = require('path');

/**
 * asyncCatch
 * - Use to catch error in common, to avoid try and catch 
 *
 * @param {any} asyncfn Function
 * @return {any} 
 */
function asyncCatch(asyncfn) {
    return (req, res, next) => {
        asyncfn(req, res, next).catch(next);
    }
}

module.exports = {
    asyncCatch,
};

