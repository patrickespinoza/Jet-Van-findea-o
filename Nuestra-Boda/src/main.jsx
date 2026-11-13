
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

// COMPONENTES DE LA INVITACIÓN
import Portada from "./componentes-encabezado/portada";
import PaginaPrincipal from "./PaginaPrincipal";

// GENERADOR DE INVITACIONES
import Generador from "./pages/Generador";

// ==========================================
// RUTAS - WEDLY / JET VAN
// ==========================================

function App() {
  const ruta = window.location.pathname.replace(/\/+$/, "") || "/";

  // ==========================================
  // GENERADOR
  // ==========================================

  if (ruta === "/generador") {
    return <Generador />;
  }

  // ==========================================
  // INVITACIÓN PRINCIPAL
  // ==========================================

  return (
    <main className="w-full min-h-screen">
      <Portada />
      <PaginaPrincipal />
    </main>
  );
}

// ==========================================
// RENDERIZAR APLICACIÓN
// ==========================================

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
