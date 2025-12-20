module.exports = function errorHandler(err, req, res, next) {
  const timestamp = new Date().toISOString();
  const status = err.statusCode || err.status || 500;
  const message = err.message || 'Beklenmeyen bir hata oluştu.';
  
  // Log error with context for debugging
  console.error(`[${timestamp}] ❌ ERROR: ${req.method} ${req.originalUrl}`);
  console.error(`   Status: ${status}`);
  console.error(`   Message: ${message}`);
  if (err.stack && process.env.NODE_ENV !== 'production') {
    console.error(`   Stack: ${err.stack}`);
  }

  res.status(status).json({ message });
};
