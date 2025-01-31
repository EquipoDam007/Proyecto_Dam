import axios from 'axios'; 
import { notifyOk, notifyError } from './dialogUtils'; 


//muestra la tabla de clientes
window.readCustomers = function () {
    axios.get('http://localhost:8080/customers')
        .then((response) => {
            const customersList = response.data;
            const customersTable = document.getElementById('tableBody');
            customersTable.innerHTML='';
            customersList.forEach(customer => {
            const row = document.createElement('tr');
            row.id = 'customers -' + customer.id;
            row.innerHTML = '<td>' + customer.name + '</td>' +
                            '<td>' + customer.email + '</td>' +
                            '<td>' + customer.phone + '</td>' +
                            '<td>' + customer.address + '</td>'+
                            '<td class="text-center"><button type="button" class="btn" onclick="datosCustomer('+ '\'' + customer.id + '\'' + ', ' + '\'' + customer.name + '\'' + ', ' + '\'' + customer.email +'\''+ ', ' + '\''+ customer.phone + '\'' + ', ' + '\'' + customer.address + '\'' +')">Update</button><span> </span>' +
                            '<button type="button" class="btn" onclick="removeCustomers(' + customer.id + ')">Delete</button><span> </span>';
            customersTable.appendChild(row);
        })       
    });
};

//introduce nuevo cliente
window.insertCustomers = function () {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    
    if (name === '' || email === '' || phone ==='' || address ===''){
        notifyError ('One or more fields are empty');
        return;
    }   
    axios.post('http://localhost:8080/customers', {
        name: name,
        email: email,
        phone: phone,
        address: address
    })
        .then((response) => {
            if (response.status == 201) {
                notifyOk('Saved customer');  
                readCustomers(); 
            }
        })
        .catch ((error) =>{
            notifyError ('Error when adding customer');
        });      
}

//elimina cliente
window.removeProducts = function (id) { 
    axios.delete('http://localhost:8080/customers/' + id)
        .then((response) => {
            if (response.status == 204) {
                document.getElementById('customers -' + id).remove();
                notifyOk('Customer deleted');
            }
        })
        .catch ((error) =>{
            notifyError ('Error deleting customer');
        });
};

//actualiza cliente
window.updateCustomer = function (){
    const id = document.getElementById('idNew').value;
    const name = document.getElementById('nameNew').value;
    const email = document.getElementById('emailNew').value;
    const phone = document.getElementById('phoneNew').value;
    const address = document.getElementById('addressNew').value;

    if (name === '' || email === '' || phone ==='' || address ==='') { 
        notifyError('One or more fields are empty'); 
        return; 
    }
    axios.put('http://localhost:8080/products/' + id,{
        name: name,
        email: email,
        phone: phone,
        address: address
    })
        .then((response) => {
            if (response.status == 204) {
                notifyOk( 'Customer updated');           
                readCustomers();
            }
        })
        .catch ((error) => {
            notifyError ('Error updating customer');
        });
};

//muestra datos del producto para poder actualizar
window.datosProduct = function (id, name, email, phone, address) { 
    document.getElementById('idNew').value = id;
    document.getElementById('nameNew').value = name;
    document.getElementById('emailNew').value = email;
    document.getElementById('phoneNew').value = phone;
    document.getElementById('addressNew').value = address;

    document.getElementById('formularioCustomer').style.display = 'block';
}