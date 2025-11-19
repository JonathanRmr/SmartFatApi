const pool = require('../config/database');

class Rutina {
    static async obtenerPorUsuario(id_usuario) {
        try {
            const [rutinas] = await pool.execute(
                'SELECT * FROM rutinas WHERE id_usuario = ? ORDER BY fecha DESC',
                [id_usuario]
            );
            return rutinas;
        } catch (error) {
            throw error;
        }
    }

    static async buscarPorId(id_rutina) {
        try {
            const [rutinas] = await pool.execute(
                'SELECT * FROM rutinas WHERE id_rutina = ?',
                [id_rutina]
            );
            return rutinas[0];
        } catch (error) {
            throw error;
        }
    }

    static async buscarConSeries(id_rutina) {
        try {
            // Obtener la rutina
            const [rutinas] = await pool.execute(
                'SELECT * FROM rutinas WHERE id_rutina = ?',
                [id_rutina]
            );

            if (rutinas.length === 0) {
                return null;
            }

            // Obtener las series de la rutina
            const [series] = await pool.execute(
                `SELECT s.*, e.nombre as ejercicio_nombre, e.grupo_muscular 
                FROM series s 
                JOIN ejercicios e ON s.id_ejercicio = e.id_ejercicio 
                WHERE s.id_rutina = ? 
                ORDER BY s.fecha, s.numero_serie`,
                [id_rutina]
            );

            return {
                rutina: rutinas[0],
                series: series
            };
        } catch (error) {
            throw error;
        }
    }

    static async crear(id_usuario, nombre, fecha) {
        try {
            const [result] = await pool.execute(
                'INSERT INTO rutinas (id_usuario, nombre, fecha) VALUES (?, ?, ?)',
                [id_usuario, nombre, fecha]
            );
            return result;
        } catch (error) {
            throw error;
        }
    }

    static async actualizar(id_rutina, nombre, fecha) {
        try {
            const [result] = await pool.execute(
                'UPDATE rutinas SET nombre = ?, fecha = ? WHERE id_rutina = ?',
                [nombre, fecha, id_rutina]
            );
            return result;
        } catch (error) {
            throw error;
        }
    }

    static async eliminar(id_rutina) {
        try {
            const [result] = await pool.execute(
                'DELETE FROM rutinas WHERE id_rutina = ?',
                [id_rutina]
            );
            return result;
        } catch (error) {
            throw error;
        }
    }

    static async perteneceAUsuario(id_rutina, id_usuario) {
        try {
            const [rutinas] = await pool.execute(
                'SELECT * FROM rutinas WHERE id_rutina = ? AND id_usuario = ?',
                [id_rutina, id_usuario]
            );
            return rutinas.length > 0;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Rutina;