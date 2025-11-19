const express = require('express');
const router = express.Router();
const ejercicioController = require('../controllers/ejercicioController');
const { authenticateToken } = require('../middleware/auth');

// Todas las rutas requieren autenticación
router.use(authenticateToken);

// GET /api/ejercicios - Obtener todos los ejercicios
router.get('/', ejercicioController.obtenerTodos);

// GET /api/ejercicios/:id - Obtener un ejercicio por ID
router.get('/:id', ejercicioController.obtenerPorId);

// POST /api/ejercicios - Crear nuevo ejercicio
router.post('/', ejercicioController.crear);

// PUT /api/ejercicios/:id - Actualizar ejercicio
router.put('/:id', ejercicioController.actualizar);

// DELETE /api/ejercicios/:id - Eliminar ejercicio
router.delete('/:id', ejercicioController.eliminar);

module.exports = router;