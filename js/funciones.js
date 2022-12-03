import Citas from './classes/Citas.js';
import UI from './classes/UI.js';
import {nombreInput, 
    telefonoInput, 
    fechaInput, 
    horaInput, 
    sintomasInput, 
    tratamientoInput, 
    feedbackInput, 
    formulario} from './selectores.js';

//instancias q se pueden usar en !== lugares
const administrarCitas = new Citas();
const ui = new UI();


let editando;

//OBJETO PRINCIPAL                        // esta tecnica funciona si los input tiene el name = propiedades del objeto 
const citaObj = {
    nombre: '',
    telefono: '', 
    fecha: '',
    hora: '',
    sintomas: '',
    tratamiento: '',
    feedback: '',
}


//agrega datos al objeto citas
export function datosCita(e) {
    citaObj[e.target.name] = e.target.value;
}

//valida y agrega una nuvea cita a la classe de citas
export function nuevaCita(e) {                                          // e.preventDefault() xq el evento es submit
    e.preventDefault();
    const { nombre, telefono, fecha, hora, sintomas, tratamiento, feedback} = citaObj;

    if(nombre === '' || telefono === '' || fecha === '' || hora === ''||sintomas === '') {
        ui.imprimirAlerta('campos obligatorios: Nombre, Teléfono, Fecha, Hora y Síntomas', 'error')
        return;
    }

    if(editando) {
        ui.imprimirAlerta('Editado Correctamente');
        //pasar el obj de cita a edicion
        administrarCitas.editarCita({...citaObj})
        
        // regresar el txt del boton a su estado original
        formulario.querySelector('button[type="submit"]').textContent = 'Crear Cita';
        editando = false;
    }else {
        // agrego id y creo cita nueva 
    citaObj.id = Date.now();
    administrarCitas.agregarCita({...citaObj});
    ui.imprimirAlerta('Se Agregó Correctamente')
    // <- un objeto copia {}...citaObj} ya q el obj citaObj al ser global se reescribe en cada nueva cita y pierde la info anterior
    }
    ui.imprimirCitas(administrarCitas)
    reiniciarObjeto();
    formulario.reset();
}

//reiniciar objeto para q no se repita

export function reiniciarObjeto() {
    citaObj.nombre = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.sintomas = '';
    citaObj.tratamiento = '';
    citaObj.feedback = '';
}

export function eliminarCita(id) {
    // eliminar cita
    administrarCitas.eliminarCita(id);
    // muestra msj
    ui.imprimirAlerta('La Cita se Eliminó Correctamente')
    //refresca citas
    ui.imprimirCitas(administrarCitas);
}

export function cargarEdicion(cita) {
    const { nombre, telefono, fecha, hora, sintomas, tratamiento, feedback, id} = cita;
    
    // llenando el objeto global
    citaObj.nombre = nombre;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha;
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
    citaObj.tratamiento = tratamiento;
    citaObj.feedback = feedback;
    citaObj.id = id;
    
    //llenar inputs
    nombreInput.value = nombre;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;
    tratamientoInput.value = tratamiento;
    feedbackInput.value = feedback;

    //cambiar el texto del boton principal
    formulario.querySelector('button[type="submit"]').textContent = 'Guardar Cambios';
    editando = true;
}