const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
const { JWT_SECRET } = require('../middleware/auth');

const authController = {
    async register(req, res) {
        try {
            const { nombre, correo, contraseña, edad, peso_actual, altura } = req.body;

            // Validaciones
            if (!nombre || !correo || !contraseña) {
                return res.status(400).json({ 
                    error: 'Nombre, correo y contraseña son obligatorios' 
                });
            }

            // Validar formato de correo
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(correo)) {
                return res.status(400).json({ 
                    error: 'Formato de correo inválido' 
                });
            }

            // Validar longitud de contraseña
            if (contraseña.length < 6) {
                return res.status(400).json({ 
                    error: 'La contraseña debe tener al menos 6 caracteres' 
                });
            }

            // Encriptar contraseña
            const hashedPassword = await bcrypt.hash(contraseña, 10);

            // Crear usuario
            const result = await Usuario.crear(
                nombre, 
                correo, 
                hashedPassword, 
                edad, 
                peso_actual, 
                altura
            );

            res.status(201).json({ 
                message: 'Usuario registrado exitosamente',
                id_usuario: result.insertId 
            });
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ 
                    error: 'El correo ya está registrado' 
                });
            }
            console.error('Error en register:', error);
            res.status(500).json({ 
                error: 'Error al registrar usuario' 
            });
        }
    },

    async login(req, res) {
        try {
            const { correo, contraseña } = req.body;

            // Validaciones
            if (!correo || !contraseña) {
                return res.status(400).json({ 
                    error: 'Correo y contraseña son obligatorios' 
                });
            }

            // Buscar usuario
            const user = await Usuario.buscarPorCorreo(correo);

            if (!user) {
                return res.status(401).json({ 
                    error: 'Credenciales inválidas' 
                });
            }

            // Verificar contraseña
            const isValidPassword = await bcrypt.compare(contraseña, user.contraseña);

            if (!isValidPassword) {
                return res.status(401).json({ 
                    error: 'Credenciales inválidas' 
                });
            }

            // Generar token JWT
            const token = jwt.sign(
                { 
                    id_usuario: user.id_usuario, 
                    correo: user.correo 
                },
                JWT_SECRET,
                { expiresIn: '24h' }
            );

            res.json({
                message: 'Login exitoso',
                token,
                usuario: {
                    id_usuario: user.id_usuario,
                    nombre: user.nombre,
                    correo: user.correo,
                    edad: user.edad,
                    peso_actual: user.peso_actual,
                    altura: user.altura
                }
            });
        } catch (error) {
            console.error('Error en login:', error);
            res.status(500).json({ 
                error: 'Error en el login' 
            });
        }
    }
};

module.exports = authController;