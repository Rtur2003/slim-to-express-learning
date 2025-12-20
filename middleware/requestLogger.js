module.exports = function requestLogger(req, res, next) {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    const timestamp = new Date().toISOString();
    const statusColor = res.statusCode >= 400 ? '❌' : '✓';
    
    console.log(`[${timestamp}] ${statusColor} ${req.method} ${req.originalUrl} → ${res.statusCode} (${duration}ms)`);
  });

  next();
};
