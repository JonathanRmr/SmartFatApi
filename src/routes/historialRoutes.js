const express = require('express');
const router = express.Router();
const historialController = require('../controllers/historialController');
const { authenticateToken } = require('../middleware/auth');

// Todas las rutas requieren autenticación
router.use(authenticateToken);

// GET /api/historial/progreso - Obtener progreso general del usuario
router.get('/progreso', historialController.obtenerProgresoGeneral);

// GET /api/historial/estadisticas - Obtener estadísticas del usuario
router.get('/estadisticas', historialController.obtenerEstadisticas);

// GET /api/historial/completo - Obtener historial completo (últimos N registros)
router.get('/completo', historialController.obtenerHistorialCompleto);

// GET /api/historial/:id_ejercicio - Obtener historial de un ejercicio específico
router.get('/:id_ejercicio', historialController.obtenerPorEjercicio);

module.exports = router;