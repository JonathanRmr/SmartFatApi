const Rutina = require('../models/Rutina');

const rutinaController = {
    async obtenerTodas(req, res) {
        try {
            const rutinas = await Rutina.obtenerPorUsuario(req.user.id_usuario);
            res.json(rutinas);
        } catch (error) {
            console.error('Error en obtenerTodas:', error);
            res.status(500).json({ 
                error: 'Error al obtener rutinas' 
            });
        }
    },

    async obtenerPorId(req, res) {
        try {
            const perteneceAlUsuario = await Rutina.perteneceAUsuario(
                req.params.id, 
                req.user.id_usuario
            );

            if (!perteneceAlUsuario) {
                return res.status(404).json({ 
                    error: 'Rutina no encontrada' 
                });
            }

            const data = await Rutina.buscarConSeries(req.params.id);

            if (!data) {
                return res.status(404).json({ 
                    error: 'Rutina no encontrada' 
                });
            }

            res.json(data);
        } catch (error) {
            console.error('Error en obtenerPorId:', error);
            res.status(500).json({ 
                error: 'Error al obtener rutina' 
            });
        }
    },

    async crear(req, res) {
        try {
            const { nombre, fecha } = req.body;

            if (!nombre) {
                return res.status(400).json({ 
                    error: 'El nombre es obligatorio' 
                });
            }

            const result = await Rutina.crear(
                req.user.id_usuario, 
                nombre, 
                fecha || null
            );

            res.status(201).json({
                message: 'Rutina creada exitosamente',
                id_rutina: result.insertId
            });
        } catch (error) {
            console.error('Error en crear:', error);
            res.status(500).json({ 
                error: 'Error al crear rutina' 
            });
        }
    },

    async actualizar(req, res) {
        try {
            const { nombre, fecha } = req.body;

            if (!nombre) {
                return res.status(400).json({ 
                    error: 'El nombre es obligatorio' 
                });
            }

            const perteneceAlUsuario = await Rutina.perteneceAUsuario(
                req.params.id, 
                req.user.id_usuario
            );

            if (!perteneceAlUsuario) {
                return res.status(404).json({ 
                    error: 'Rutina no encontrada' 
                });
            }

            await Rutina.actualizar(req.params.id, nombre, fecha);

            res.json({ 
                message: 'Rutina actualizada exitosamente' 
            });
        } catch (error) {
            console.error('Error en actualizar:', error);
            res.status(500).json({ 
                error: 'Error al actualizar rutina' 
            });
        }
    },

    async eliminar(req, res) {
        try {
            const perteneceAlUsuario = await Rutina.perteneceAUsuario(
                req.params.id, 
                req.user.id_usuario
            );

            if (!perteneceAlUsuario) {
                return res.status(404).json({ 
                    error: 'Rutina no encontrada' 
                });
            }

            await Rutina.eliminar(req.params.id);
            
            res.json({ 
                message: 'Rutina eliminada exitosamente' 
            });
        } catch (error) {
            console.error('Error en eliminar:', error);
            res.status(500).json({ 
                error: 'Error al eliminar rutina' 
            });
        }
    }
};

module.exports = rutinaController;