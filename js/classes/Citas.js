class Citas {
    constructor(){
        this.citas = [];
    }
    agregarCita(cita) {
        this.citas = [ ...this.citas, cita];
    }
    editarCita(citaEditada) {
        this.citas = this.citas.map( cita => cita.id === citaEditada.id ? citaEditada : cita);  // ( ? ) si pasa lo anterior: esto.  //   ( : ) caso contrario: esto
    }
    eliminarCita(id) {
        this.citas = this.citas.filter( cita => cita.id !== id)
    }
}

export default Citas;