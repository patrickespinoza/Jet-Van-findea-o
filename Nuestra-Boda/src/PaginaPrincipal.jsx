import React from "react";
import Celebracion from "./componentes-encabezado/ubicacion";
import Vestimenta from "./componentes-encabezado/vestimenta";
import ConfirmacionAsistencia from "./componentes-encabezado/confirmacion";

export default function PaginaPrincipal() {

  return (
    <div>

      <Celebracion/>

      <Vestimenta />

      <ConfirmacionAsistencia/>
    </div>
  );
}