const Ejercicio = require('../models/Ejercicio');

const ejercicioController = {
    async obtenerTodos(req, res) {
        try {
            const { grupo_muscular } = req.query;
            const ejercicios = await Ejercicio.obtenerTodos(grupo_muscular);
            res.json(ejercicios);
        } catch (error) {
            console.error('Error en obtenerTodos:', error);
            res.status(500).json({ 
                error: 'Error al obtener ejercicios' 
            });
        }
    },

    async obtenerPorId(req, res) {
        try {
            const ejercicio = await Ejercicio.buscarPorId(req.params.id);

            if (!ejercicio) {
                return res.status(404).json({ 
                    error: 'Ejercicio no encontrado' 
                });
            }

            res.json(ejercicio);
        } catch (error) {
            console.error('Error en obtenerPorId:', error);
            res.status(500).json({ 
                error: 'Error al obtener ejercicio' 
            });
        }
    },

    async crear(req, res) {
        try {
            const { nombre, grupo_muscular, descripcion, imagen_url } = req.body;

            if (!nombre) {
                return res.status(400).json({ 
                    error: 'El nombre es obligatorio' 
                });
            }

            const result = await Ejercicio.crear(
                nombre, 
                grupo_muscular, 
                descripcion, 
                imagen_url
            );

            res.status(201).json({
                message: 'Ejercicio creado exitosamente',
                id_ejercicio: result.insertId
            });
        } catch (error) {
            console.error('Error en crear:', error);
            res.status(500).json({ 
                error: 'Error al crear ejercicio' 
            });
        }
    },

    async actualizar(req, res) {
        try {
            const { nombre, grupo_muscular, descripcion, imagen_url } = req.body;

            if (!nombre) {
                return res.status(400).json({ 
                    error: 'El nombre es obligatorio' 
                });
            }

            // Verificar que el ejercicio existe
            const ejercicioExiste = await Ejercicio.buscarPorId(req.params.id);
            if (!ejercicioExiste) {
                return res.status(404).json({ 
                    error: 'Ejercicio no encontrado' 
                });
            }

            await Ejercicio.actualizar(
                req.params.id, 
                nombre, 
                grupo_muscular, 
                descripcion, 
                imagen_url
            );

            res.json({ 
                message: 'Ejercicio actualizado exitosamente' 
            });
        } catch (error) {
            console.error('Error en actualizar:', error);
            res.status(500).json({ 
                error: 'Error al actualizar ejercicio' 
            });
        }
    },

    async eliminar(req, res) {
        try {
            // Verificar que el ejercicio existe
            const ejercicioExiste = await Ejercicio.buscarPorId(req.params.id);
            if (!ejercicioExiste) {
                return res.status(404).json({ 
                    error: 'Ejercicio no encontrado' 
                });
            }

            await Ejercicio.eliminar(req.params.id);
            
            res.json({ 
                message: 'Ejercicio eliminado exitosamente' 
            });
        } catch (error) {
            console.error('Error en eliminar:', error);
            res.status(500).json({ 
                error: 'Error al eliminar ejercicio' 
            });
        }
    }
};

module.exports = ejercicioController;