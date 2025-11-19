const Serie = require('../models/Serie');
const Rutina = require('../models/Rutina');

const serieController = {
    async crear(req, res) {
        try {
            const { 
                id_rutina, 
                id_ejercicio, 
                numero_serie, 
                repeticiones, 
                peso_usado, 
                descanso_segundos 
            } = req.body;

            // Validaciones
            if (!id_rutina || !id_ejercicio || !numero_serie || !repeticiones) {
                return res.status(400).json({ 
                    error: 'Faltan datos obligatorios: id_rutina, id_ejercicio, numero_serie, repeticiones' 
                });
            }

            // Verificar que la rutina pertenece al usuario
            const perteneceAlUsuario = await Rutina.perteneceAUsuario(
                id_rutina, 
                req.user.id_usuario
            );

            if (!perteneceAlUsuario) {
                return res.status(403).json({ 
                    error: 'No tienes permiso para modificar esta rutina' 
                });
            }

            const result = await Serie.crear(
                id_rutina, 
                id_ejercicio, 
                numero_serie, 
                repeticiones, 
                peso_usado, 
                descanso_segundos || 60
            );

            res.status(201).json({
                message: 'Serie agregada exitosamente',
                id_serie: result.insertId
            });
        } catch (error) {
            console.error('Error en crear:', error);
            res.status(500).json({ 
                error: 'Error al agregar serie' 
            });
        }
    },

    async actualizar(req, res) {
        try {
            const { numero_serie, repeticiones, peso_usado, descanso_segundos } = req.body;

            // Validaciones
            if (!numero_serie || !repeticiones) {
                return res.status(400).json({ 
                    error: 'numero_serie y repeticiones son obligatorios' 
                });
            }

            // Verificar que la serie pertenece a una rutina del usuario
            const perteneceAlUsuario = await Serie.perteneceAUsuario(
                req.params.id, 
                req.user.id_usuario
            );

            if (!perteneceAlUsuario) {
                return res.status(403).json({ 
                    error: 'No tienes permiso para modificar esta serie' 
                });
            }

            await Serie.actualizar(
                req.params.id, 
                numero_serie, 
                repeticiones, 
                peso_usado, 
                descanso_segundos
            );

            res.json({ 
                message: 'Serie actualizada exitosamente' 
            });
        } catch (error) {
            console.error('Error en actualizar:', error);
            res.status(500).json({ 
                error: 'Error al actualizar serie' 
            });
        }
    },

    async eliminar(req, res) {
        try {
            // Verificar que la serie pertenece a una rutina del usuario
            const perteneceAlUsuario = await Serie.perteneceAUsuario(
                req.params.id, 
                req.user.id_usuario
            );

            if (!perteneceAlUsuario) {
                return res.status(403).json({ 
                    error: 'No tienes permiso para eliminar esta serie' 
                });
            }

            await Serie.eliminar(req.params.id);
            
            res.json({ 
                message: 'Serie eliminada exitosamente' 
            });
        } catch (error) {
            console.error('Error en eliminar:', error);
            res.status(500).json({ 
                error: 'Error al eliminar serie' 
            });
        }
    }
};

module.exports = serieController;