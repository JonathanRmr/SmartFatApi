const express = require('express');
const router = express.Router();
const serieController = require('../controllers/serieController');
const { authenticateToken } = require('../middleware/auth');

// Todas las rutas requieren autenticación
router.use(authenticateToken);

// POST /api/series - Agregar serie a una rutina
router.post('/', serieController.crear);

// PUT /api/series/:id - Actualizar serie
router.put('/:id', serieController.actualizar);

// DELETE /api/series/:id - Eliminar serie
router.delete('/:id', serieController.eliminar);

module.exports = router;