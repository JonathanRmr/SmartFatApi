const express = require('express');
const serieController = require('../controllers/serieController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// ⭐ ESTO ES IMPORTANTE: Aplicar autenticación a TODOS los requests
router.use(authenticateToken);

// POST /api/series - Agregar serie a una rutina
router.post('/', serieController.crear);

// PUT /api/series/:id - Actualizar serie
router.put('/:id', serieController.actualizar);

// DELETE /api/series/:id - Eliminar serie
router.delete('/:id', serieController.eliminar);

module.exports = router;