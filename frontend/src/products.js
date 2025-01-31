import axios from 'axios';  //importamos librería axios que nos permite comunicar con el backend
//import { notifyOk, notifyError } from './dialogUtils'; //importamos libreria que nos permite lanzar mensajes de error


//muestra la tabla productos

window.readProducts = function () {
    axios.get('http://localhost:8080/products')
        .then((response) => {
            const productsList = response.data;
            const productTable = document.getElementById('tableBody');
            productTable.innerHTML='';
            productsList.forEach(product => {
            const row = document.createElement('tr');
            row.id = 'product-' + product.id;
            row.innerHTML = '<td>' + product.name + '</td>' +
                            '<td>' + product.description + '</td>' +
                            '<td>' + product.price + '</td>' +
                            '<td>' + product.stock + '</td>'+
                            '<td class="text-center"><button type="button" class="btn btn-success btn-sm ' + '" onclick="datosProduct('+ '\'' + product.id + '\'' + ', ' + '\'' + product.name + '\'' + ', ' + '\'' + product.description +'\''+ ', ' + '\''+ product.price + '\'' + ', ' + '\'' + product.stock + '\'' +')">Modificar</button><span> </span>' +
                            '<button type="button" class="btn btn-danger btn-sm ' + '" onclick="removeProducts(' + product.id + ')">Eliminar</button><span> </span>'
                            +'<button type="button" class="btn btn-primary btn-sm" onclick="detalleObras(' + product.id + ')">Detalles</button></td>';
            productTable.appendChild(row);
        })       
    });
};
