// Wraps async route handlers to catch errors and forward to error middleware
// This prevents try-catch blocks in every controller and route definition
module.exports = function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
