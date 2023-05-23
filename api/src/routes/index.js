const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const videogamesRoutes = require('./videogamesRoutes');
const genresRoutes = require('./genresRoutes');

const router = Router();

// Configurar los routers

router.use('/videogames', videogamesRoutes);
router.use('/genres', genresRoutes);

module.exports = router;
