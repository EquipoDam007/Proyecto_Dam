const express = require('express');
const cors = require('cors');
const knex = require('knex');
const { body, validationResult } = require('express-validator');

const app = express();
app.use(cors());
app.use(express.json());


const db = knex({
    client: 'mysql2',
    connection: {
        host: 'bbddproyectoequipo7.c3hokm7pd7o7.us-east-1.rds.amazonaws.com', 
        user: 'admin', // Tu usuario de MySQL
        password: 'equipo07', // Tu contraseña de MySQL
        database: 'ecommerce' // Nombre de tu base de datos en MySQL
    },
    useNullAsDefault: true
});


app.get('/products', async (req, res) => {
    const product = await db('products').select('*');
    res.status(200).json(product);
});

app.get('/products/:productsId', async (req, res) => {
    const obra = await db('products').select('*').where({ id: req.params.productsId }).first();
    res.status(200).json(obra);
});



app.post('/products', [
    body('nombre').isString().isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres'),
    body('autor').isString().withMessage('El autor debe ser una cadena de texto'),
    body('año').isInt({ min: 1000, max: new Date().getFullYear() }).withMessage('El año debe ser un número válido'),
    body('estilo').optional().isString().withMessage('El estilo debe ser una cadena de texto'),
], async (req, res) => {
    // Validar errores
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
        // Insertar datos si pasan la validación
        await db('obras').insert({
            nombre: req.body.nombre,
            autor: req.body.autor,
            año: req.body.año,
            estilo: req.body.estilo
        });
    
    
        res.status(201).json({ message: 'Obra registrada correctamente' });
});
    
app.listen(8080, () => {
    console.log('El backend ha iniciado en el puerto 8080');
});