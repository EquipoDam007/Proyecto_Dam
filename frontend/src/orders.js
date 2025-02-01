import axios from 'axios'; 
import { notifyOk, notifyError } from './dialogUtils'; 


//muestra la tabla de pedidos
window.readOrders = function () {
    axios.get('http://localhost:8080/orders')
        .then((response) => {
            const ordersList = response.data;
            const ordersTable = document.getElementById('tableBody');
            ordersTable.innerHTML='';
            ordersList.forEach(order => {
            const row = document.createElement('tr');
            row.id = 'orders -' + order.id;
            row.innerHTML = '<td>' + order.customer_id + '</td>' +
                            
                            '<td>' + order.order_date + '</td>' +
                            '<td>' + order.total + '</td>';
            ordersTable.appendChild(row);
        })       
    });
};


