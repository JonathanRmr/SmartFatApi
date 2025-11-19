const pool = require('../config/database');

class Serie {
    static async crear(id_rutina, id_ejercicio, numero_serie, repeticiones, peso_usado, descanso_segundos) {
        try {
            const [result] = await pool.execute(
                'INSERT INTO series (id_rutina, id_ejercicio, numero_serie, repeticiones, peso_usado, descanso_segundos) VALUES (?, ?, ?, ?, ?, ?)',
                [id_rutina, id_ejercicio, numero_serie, repeticiones, peso_usado, descanso_segundos]
            );
            return result;
        } catch (error) {
            throw error;
        }
    }

    static async buscarPorId(id_serie) {
        try {
            const [series] = await pool.execute(
                'SELECT * FROM series WHERE id_serie = ?',
                [id_serie]
            );
            return series[0];
        } catch (error) {
            throw error;
        }
    }

    static async actualizar(id_serie, numero_serie, repeticiones, peso_usado, descanso_segundos) {
        try {
            const [result] = await pool.execute(
                'UPDATE series SET numero_serie = ?, repeticiones = ?, peso_usado = ?, descanso_segundos = ? WHERE id_serie = ?',
                [numero_serie, repeticiones, peso_usado, descanso_segundos, id_serie]
            );
            return result;
        } catch (error) {
            throw error;
        }
    }

    static async eliminar(id_serie) {
        try {
            const [result] = await pool.execute(
                'DELETE FROM series WHERE id_serie = ?',
                [id_serie]
            );
            return result;
        } catch (error) {
            throw error;
        }
    }

    static async obtenerConRutina(id_serie) {
        try {
            const [series] = await pool.execute(
                `SELECT s.*, r.id_usuario 
                FROM series s 
                JOIN rutinas r ON s.id_rutina = r.id_rutina 
                WHERE s.id_serie = ?`,
                [id_serie]
            );
            return series[0];
        } catch (error) {
            throw error;
        }
    }

    static async perteneceAUsuario(id_serie, id_usuario) {
        try {
            const [series] = await pool.execute(
                `SELECT s.* FROM series s 
                JOIN rutinas r ON s.id_rutina = r.id_rutina 
                WHERE s.id_serie = ? AND r.id_usuario = ?`,
                [id_serie, id_usuario]
            );
            return series.length > 0;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Serie;