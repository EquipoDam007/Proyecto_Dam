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

app.get('/products/:productId', async (req, res) => {
    const product = await db('products').select('*').where({ id_product: req.params.productId }).first();
    res.status(200).json(product);
});


app.post('/products', [
    body('name').isString().isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres'),
    body('description').isString().withMessage('Debe ser una cadena de texto'),
    body('price').isInt({ min: 0, max: 100000 }).withMessage('El precio debe ser un número válido'),
    body('stock').isInt({ min: 0, max: 100000 }).withMessage('El stock debe ser un número válido'),
], async (req, res) => {
    // Validar errores
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
        // Insertar datos si pasan la validación
        await db('products').insert({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            stock: req.body.stock
        });
    
        res.status(201).json({ message: 'Producto registrado correctamente' });
});
    

app.put('/products/:productId', [
    body('name').isString().isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres'),
    body('description').isString().withMessage('Debe ser una cadena de texto'),
    body('price').isInt({ min: 0, max: 100000 }).withMessage('El precio debe ser un número válido'),
    body('stock').isInt({ min: 0, max: 100000 }).withMessage('El stock debe ser un número válido'),
], async (req, res) => {
    // Validar errores
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Actualizar el producto si pasa la validación
    await db('products').update({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            stock: req.body.stock
    }).where({ id_product: req.params.productId });

    res.status(204).json({});
});

app.delete('/products/:productId', async (req, res) => {
    await db('products').del().where({ id_product: req.params.productId });
    res.status(204).json({});
});



app.get('/suppliers', async (req, res) => {
    const product = await db('suppliers').select('*');
    res.status(200).json(product);
});

app.get('/suppliers/:supplierId', async (req, res) => {
    const product = await db('suppliers').select('*').where({ id_supplier: req.params.supplierId }).first();
    res.status(200).json(product);
});


app.post('/supliers', [
    body('name').isString().isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres'),
    body('contact').isString().withMessage('Debe ser una cadena de texto'),
    body('phone').isString().isLength({min:9}).withMessage('El número debe ser un número válido'),
    body('address').isString().withMessage('Debe ser una cadena de texto'),
], async (req, res) => {
    // Validar errores
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
        // Insertar datos si pasan la validación
        await db('supliers').insert({
            name: req.body.name,
            contact: req.body.contact,
            phone: req.body.phone,
            address: req.body.address
        });
    
        res.status(201).json({ message: 'Proovedor registrado correctamente' });
});
    

app.put('/suppliers/:supplierId', [
    body('name').isString().isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres'),
    body('contact').isString().withMessage('Debe ser una cadena de texto'),
    body('phone').isString().isLength({min:9}).withMessage('El número debe ser un número válido'),
    body('address').isString().withMessage('Debe ser una cadena de texto'),
], async (req, res) => {
    // Validar errores
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Actualizar el producto si pasa la validación
    await db('suppliers').update({
        name: req.body.name,
        contact: req.body.contact,
        phone: req.body.phone,
        address: req.body.address
    }).where({ id_supplier: req.params.suplierId });

    res.status(204).json({});
});

app.delete('/suppliers/:supplierId', async (req, res) => {
    await db('suppliers').del().where({ id_supplier: req.params.productId });
    res.status(204).json({});
});


app.listen(8080, () => {
    console.log('El backend ha iniciado en el puerto 8080');
});