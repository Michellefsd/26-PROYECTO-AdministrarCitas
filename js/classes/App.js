import {datosCita, nuevaCita} from '../funciones.js';
import {nombreInput, 
    telefonoInput, 
    fechaInput, 
    horaInput, 
    sintomasInput, 
    tratamientoInput, 
    feedbackInput, 
    formulario} from '../selectores.js';

 class App {
    constructor () {
        this.initApp();
    }
    initApp() {  
        nombreInput.addEventListener('input', datosCita)
        telefonoInput.addEventListener('input', datosCita)
        fechaInput.addEventListener('input', datosCita)
        horaInput.addEventListener('input', datosCita)
        sintomasInput.addEventListener('input', datosCita)
        tratamientoInput.addEventListener('input', datosCita)
        feedbackInput.addEventListener('input', datosCita)
    
        formulario.addEventListener('submit', nuevaCita) //todos los submit usan e.preventDefault
    }
}

export default App;