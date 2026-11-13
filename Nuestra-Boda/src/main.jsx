import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Portada from "./componentes-encabezado/portada"
import PaginaPrincipal from "./PaginaPrincipal"

ReactDOM.createRoot(document.getElementById('root')).render(
  <main>
    <div >
      <Portada/>
      <PaginaPrincipal/>
    </div>
  </main>
)