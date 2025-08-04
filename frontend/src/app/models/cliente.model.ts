export interface Cliente {
  primerNombre: string;
  segundoNombre: string;
  primerApellido: string;
  segundoApellido: string;
  telefono: string;
  direccion: string;
  ciudadResidencia: string;
}

export interface ConsultaClienteRequest {
  tipoDocumento: string;
  numeroDocumento: string;
}