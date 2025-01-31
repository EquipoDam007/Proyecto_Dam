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

// Consulta de usuario 
app.get('/auth/:username', async (req, res) => {
    const user = await db('users').select('*').where({ username: req.params.username }).first();
    res.status(200).json(user);
});