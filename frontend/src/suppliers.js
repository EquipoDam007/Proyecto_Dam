import axios from 'axios'; 
import { notifyOk, notifyError } from './dialogUtils'; 


//muestra la tabla de clientes
window.readSuppliers = function () {
    axios.get('http://localhost:8080/suppliers')
        .then((response) => {
            const suppliersList = response.data;
            const suppliersTable = document.getElementById('tableBody');
            suppliersTable.innerHTML='';
            suppliersList.forEach(supplier => {
            const row = document.createElement('tr');
            row.id = 'suppliers-' + supplier.id;
            row.innerHTML = '<td>' + supplier.name + '</td>' +
                            '<td>' + supplier.contact + '</td>' +
                            '<td>' + supplier.phone + '</td>' +
                            '<td>' + supplier.address + '</td>'+
                            '<td class="text-center"><button type="button" class="btn" onclick="datosSupplier('+ '\'' + supplier.id + '\'' + ', ' + '\'' + supplier.name + '\'' + ', ' + '\'' + supplier.contact +'\''+ ', ' + '\''+ supplier.phone + '\'' + ', ' + '\'' + supplier.address + '\'' +')">Update</button><span> </span>' +
                            '<button type="button" class="btn" onclick="removeSuppliers(' + supplier.id + ')">Delete</button><span> </span>';
            suppliersTable.appendChild(row);
        })       
    });
};

//introduce nuevo proveedor
window.insertSuppliers = function () {
    const name = document.getElementById('name').value;
    const contact = document.getElementById('contact').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    
    if (name === '' || contact === '' || phone ==='' || address ===''){
        notifyError ('One or more fields are empty');
        return;
    }   
    axios.post('http://localhost:8080/suppliers', {
        name: name,
        contact: contact,
        phone: phone,
        address: address
    })
        .then((response) => {
            if (response.status == 201) {
                notifyOk('Saved supplier');  
                readSuppliers(); 
            }
        })
        .catch ((error) =>{
            notifyError ('Error when adding supplier');
        });      
}

//elimina proveedor
window.removeSuppliers = function (id) { 
    axios.delete('http://localhost:8080/suppliers/' + id)
        .then((response) => {
            if (response.status == 204) {
                document.getElementById('suppliers-' + id).remove();
                notifyOk('Supplier deleted');
            }
        })
        .catch ((error) =>{
            notifyError ('Error deleting supplier');
        });
};

//actualiza proveedor
window.updateSupplier = function (){
    const id = document.getElementById('idNew').value;
    const name = document.getElementById('nameNew').value;
    const contact = document.getElementById('contactNew').value;
    const phone = document.getElementById('phoneNew').value;
    const address = document.getElementById('addressNew').value;

    if (name === '' || contact === '' || phone ==='' || address ==='') { 
        notifyError('One or more fields are empty'); 
        return; 
    }
    axios.put('http://localhost:8080/suppliers/' + id,{
        name: name,
        contact: contact,
        phone: phone,
        address: address
    })
        .then((response) => {
            if (response.status == 204) {
                notifyOk( 'Supplier updated');           
                readSuppliers();
            }
        })
        .catch ((error) => {
            notifyError ('Error updating supplier');
        });
};

//muestra datos del provedor para poder actualizar
window.datosSupplier = function (id, name, contact, phone, address) { 
    document.getElementById('idNew').value = id;
    document.getElementById('nameNew').value = name;
    document.getElementById('contactNew').value = contact;
    document.getElementById('phoneNew').value = phone;
    document.getElementById('addressNew').value = address;

    document.getElementById('formularioSupplier').style.display = 'block';
}

//muestra formulario vacio para introducir datos

window.showFormulario = function () {
    
    document.getElementById('name').value = '';
    document.getElementById('contact').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('address').value = '';

    document.getElementById('formularioNewSupplier').style.display = 'block';
};