import axios from 'axios'; 

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
                            '<td class="text-center"><button type="button" class="btn" onclick="datosCustomer('+ '\'' + customer.id + '\'' + ', ' + '\'' + customer.name + '\'' + ', ' + '\'' + customer.email +'\''+ ', ' + '\''+ customer.phone + '\'' + ', ' + '\'' + customer.address + '\'' +')">Modificar</button><span> </span>' +
                            '<button type="button" class="btn" onclick="removeCustomers(' + customer.id + ')">Eliminar</button><span> </span>'
                            +'<button type="button" class="btn" onclick="detalleCustomers(' + customer.id + ')">Detalles</button></td>';
            customersTable.appendChild(row);
        })       
    });
};

