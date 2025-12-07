// Uygulamanın giriş noktası (Slim'deki public/index.php benzeri)
const express = require('express');
const { PORT } = require('./config/config');

const notesRoutes = require('./routes/notes');
const usersRoutes = require('./routes/users');
const errorHandler = require('./middleware/errorHandler');
const requestLogger = require('./middleware/requestLogger');

const app = express();

// Body parse (Slim: $request->getParsedBody())
app.use(express.json());
// Basit istek loglama; Slim'de middleware ile benzer şekilde yapılır.
app.use(requestLogger);

// Sağlık kontrolü
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Route grupları (Slim: $app->group('/notes', ...))
app.use('/notes', notesRoutes);
app.use('/users', usersRoutes);

// Bulunmayan endpoint'ler için standart cevap
app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint not found' });
});

// Merkezi hata yakalayıcı
app.use(errorHandler);

// Ana dosya olarak çalıştırıldığında sunucuyu ayağa kaldır
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
}

// Testler veya başka modüller için app'i export et
module.exports = app;
