//import { notifyOk, notifyError } from './dialogUtils'; //importamos libreria que nos permite mandar mensajes de error


window.login = function (){
     
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (username === "usuario" && password === "password") {
        window.location.href="./product.html";
    } else {
        notifyError('Datos incorrectos');
    }
}

