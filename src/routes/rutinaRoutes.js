const express = require('express');
const router = express.Router();
const rutinaController = require('../controllers/rutinaController');
const { authenticateToken } = require('../middleware/auth');

// Todas las rutas requieren autenticación
router.use(authenticateToken);

// GET /api/rutinas - Obtener todas las rutinas del usuario
router.get('/', rutinaController.obtenerTodas);

// GET /api/rutinas/:id - Obtener una rutina específica con sus series
router.get('/:id', rutinaController.obtenerPorId);

// POST /api/rutinas - Crear nueva rutina
router.post('/', rutinaController.crear);

// PUT /api/rutinas/:id - Actualizar rutina
router.put('/:id', rutinaController.actualizar);

// DELETE /api/rutinas/:id - Eliminar rutina
router.delete('/:id', rutinaController.eliminar);

module.exports = router;