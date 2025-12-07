module.exports = function errorHandler(err, req, res, next) {
  // Konsola kısa bir hata özeti bırak
  console.error(`[${req.method}] ${req.originalUrl}`, err);

  const status = err.statusCode || err.status || 500;
  const message = err.message || 'Beklenmeyen bir hata oluştu.';

  res.status(status).json({ message });
};
