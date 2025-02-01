# Ecommerce Equipo7 ENERO

![Badge en Desarollo](https://img.shields.io/badge/STATUS-EN%20DESAROLLO-green)



# INTRODUCCIÓN

Este proyecto desarrolla un aplicativo web de una tienda. Nos mostrará 4 páginas en las que podremos visualizar productos, pedidos, proveedores y clientes . Tendremos un CRUD completo de 3 de los elementos, productos, clientes y proveedores.

* Se ha desarrollado con un backend como API que gestionará los datos y los almacenará en una base de datos MySQL que está almacenada en el servicio RDS de AWS.
* El backend se ha implementado con todas las operaciones necesarias para llevar a cabo un CRUD completo con el framework node express.
* Dispone de un frontend desarrollado con HTML y Javascript que se comunica con el backend. 
* Para la parte del diseño del frontend se ha utilizado solamente una hoja de estilos CSS sin ningún framework de diseño.
* Se ha utlizado la librería Tostify para mandar mensajes durante la validación si hay error o no.
* Para la validación de la introducción de datos en el backend se ha utilizado express-validator.
* El proyecto incluye una colección de consultas a la API en formato .JSON creada en Hoppscotch.
---     

Para la inicialización de nuestro proyecto, tanto en el backend como en el frontend debemos instalar primeramente todas las dependencias necesarias en la consola con el comando :

```npm install```

Actualizar las dependencias necesarias si fuera necesario:

```npm update```


Para inicializar nuestro backend y frontend con el script ```start``` que hemos configuarado en el fichero package.json correspondiente a frontend y backend, ejecutaremos el comando:

```npm start```   
     

Una vez inicializado nuestro backend se estará ejecutando en el puerto 8080: (http://localhost:8080/)


Una vez inicializado nuestro frontend se estará ejecutando en el puerto 1234: (http://localhost:1234/)


---

Los datos de conexión a nuestra base de datos son los siguientes: 

```
user: admin
pass: equipo07
URL_: bbddproyectoequipo7.c3hokm7pd7o7.us-east-1.rds.amazonaws.com
```
