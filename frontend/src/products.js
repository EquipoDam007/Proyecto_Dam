import axios from 'axios';  
import { notifyOk, notifyError } from './dialogUtils'; 


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
                            '<td class="text-center"><button type="button" class="btn btn-success btn-sm ' + '" onclick="datosProduct('+ '\'' + product.id + '\'' + ', ' + '\'' + product.name + '\'' + ', ' + '\'' + product.description +'\''+ ', ' + '\''+ product.price + '\'' + ', ' + '\'' + product.stock + '\'' +')">Update</button><span> </span>' +
                            '<button type="button" class="btn btn-danger btn-sm ' + '" onclick="removeProducts(' + product.id + ')">Delete</button><span> </span>';
            productTable.appendChild(row);
        })       
    });
};


//introduce nuevo producto
window.insertProducts = function () {
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const stock = document.getElementById('stock').value;
    
    if (name === '' || description === '' || price ==='' || stock ===''){
        notifyError ('One or more fields are empty');
        return;
    }   
    axios.post('http://localhost:8080/products', {
        name: name,
        description: description,
        price: price,
        stock: stock
    })
        .then((response) => {
            if (response.status == 201) {
                notifyOk('Saved product');  
                readProducts(); 
            }
        })
        .catch ((error) =>{
            notifyError ('Error when adding product');
        });      
}

//elimina producto
window.removeProducts = function (id) { 
    axios.delete('http://localhost:8080/products/' + id)
        .then((response) => {
            if (response.status == 204) {
                document.getElementById('product-' + id).remove();
                notifyOk('Product deleted');
            }
        })
        .catch ((error) =>{
            notifyError ('Error deleting product');
        });
};

//actualiza producto
window.updateProduct = function (){
    const id = document.getElementById('idNew').value;
    const name = document.getElementById('nameNew').value;
    const description = document.getElementById('descriptionNew').value;
    const price = document.getElementById('priceNew').value;
    const stock = document.getElementById('stockNew').value;

    if (name === '' || description === '' || price ==='' || stock ==='') { 
        notifyError('One or more fields are empty'); 
        return; 
    }
    axios.put('http://localhost:8080/products/' + id,{
        name: name,
        description: description,
        price: price,
        stock: stock
    })
        .then((response) => {
            if (response.status == 204) {
                notifyOk( 'Product updated');           
                readProducts();
            }
        })
        .catch ((error) => {
            notifyError ('Error updating product');
        });
};

//muestra datos del producto para poder actualizar
window.datosProduct = function (id, name, description, price, stock) { 
    document.getElementById('idNew').value = id;
    document.getElementById('nameNew').value = name;
    document.getElementById('descriptionNew').value = description;
    document.getElementById('priceNew').value = price;
    document.getElementById('stockNew').value = stock;

    document.getElementById('formularioProduct').style.display = 'block';
}

//muestra formulario vacio para introducir datos

window.showFormulario = function () {
    
        document.getElementById('name').value = '';
        document.getElementById('description').value = '';
        document.getElementById('price').value = '';
        document.getElementById('stock').value = '';

        document.getElementById('formularioNewProduct').style.display = 'block';
    };

    