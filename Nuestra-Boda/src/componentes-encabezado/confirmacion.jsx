
import React, { useState } from "react";

// ==========================================
// INFORMACIÓN EDITABLE - WEDLY
// ==========================================

// Número de WhatsApp de los novios.
// Formato: código de país + número, sin espacios ni signos.
// Número ficticio para demostración.
const NUMERO_WHATSAPP = "5210000000000";

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================

export default function ConfirmacionAsistencia() {
  const [nombre, setNombre] = useState("");
  const [asistencia, setAsistencia] = useState("");
  const [invitados, setInvitados] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [confirmacion, setConfirmacion] = useState("");

  // ==========================================
  // ENVIAR CONFIRMACIÓN POR WHATSAPP
  // ==========================================

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nombre.trim() || !asistencia) {
      setConfirmacion(
        "Por favor completa tu nombre y selecciona si asistirás."
      );
      return;
    }

    setConfirmacion("");

    const textoWhatsApp = [
      "💍 *CONFIRMACIÓN DE ASISTENCIA*",
      "",
      `👤 *Nombre:* ${nombre.trim()}`,
      `💌 *Asistencia:* ${asistencia}`,
      `👥 *Número de invitados:* ${invitados || "No especificado"}`,
      "",
      "💬 *Mensaje para los novios:*",
      mensaje.trim() || "Sin mensaje adicional",
    ].join("\n");

    const urlWhatsApp =
      `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(textoWhatsApp)}`;

    window.open(urlWhatsApp, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="w-full bg-white text-[#5E6650] px-5 py-20">
      <div className="max-w-2xl mx-auto text-center">

        {/* ENCABEZADO */}
        <p className="uppercase tracking-[0.25em] text-[#B89B5E] text-sm font-semibold mb-4">
          Nos encantaría verte
        </p>

        <h2 className="text-4xl sm:text-5xl font-playfair mb-4">
          Confirmación de Asistencia
        </h2>

        <div className="w-24 h-[2px] bg-[#B89B5E] mx-auto mb-6"></div>

        <p className="text-[#5E6650]/80 mb-10">
          Nos encantará saber si podremos contar con tu presencia.
        </p>

        {/* FORMULARIO */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* NOMBRE */}
          <input
            type="text"
            placeholder="Nombre y apellido"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            className="
              w-full px-5 py-4 rounded-xl
              bg-[#F7F4ED] text-[#5E6650]
              border border-[#D8CFBF]
              placeholder:text-[#5E6650]/60
              outline-none
              focus:border-[#B89B5E]
              transition-colors
            "
          />

          {/* ASISTENCIA */}
          <div className="grid grid-cols-2 gap-4">

            <button
              type="button"
              onClick={() => setAsistencia("Sí asistiré")}
              className={`
                py-4 rounded-xl border transition-all duration-300
                ${
                  asistencia === "Sí asistiré"
                    ? "bg-[#5E6650] text-white border-[#5E6650]"
                    : "bg-[#F7F4ED] border-[#D8CFBF] text-[#5E6650] hover:border-[#B89B5E]"
                }
              `}
            >
              Sí asistiré
            </button>

            <button
              type="button"
              onClick={() => setAsistencia("No asistiré")}
              className={`
                py-4 rounded-xl border transition-all duration-300
                ${
                  asistencia === "No asistiré"
                    ? "bg-[#5E6650] text-white border-[#5E6650]"
                    : "bg-[#F7F4ED] border-[#D8CFBF] text-[#5E6650] hover:border-[#B89B5E]"
                }
              `}
            >
              No asistiré
            </button>

          </div>

          {/* NÚMERO DE INVITADOS */}
          <input
            type="number"
            min="1"
            placeholder="Número de invitados"
            value={invitados}
            onChange={(e) => setInvitados(e.target.value)}
            className="
              w-full px-5 py-4 rounded-xl
              bg-[#F7F4ED] text-[#5E6650]
              border border-[#D8CFBF]
              placeholder:text-[#5E6650]/60
              outline-none
              focus:border-[#B89B5E]
              transition-colors
            "
          />

          {/* MENSAJE */}
          <textarea
            placeholder="Mensaje para los novios"
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            rows="4"
            className="
              w-full px-5 py-4 rounded-xl
              bg-[#F7F4ED] text-[#5E6650]
              border border-[#D8CFBF]
              placeholder:text-[#5E6650]/60
              outline-none resize-none
              focus:border-[#B89B5E]
              transition-colors
            "
          />

          {/* BOTÓN DE CONFIRMACIÓN */}
          <button
            type="submit"
            className="
              w-full py-4 rounded-xl
              bg-[#5E6650] text-white
              font-semibold tracking-wide
              transition-all duration-300
              hover:bg-[#4C5440]
              hover:scale-[1.01]
              shadow-md
            "
          >
            Confirmar por WhatsApp
          </button>

          {/* MENSAJE DE VALIDACIÓN */}
          {confirmacion && (
            <p className="mt-5 text-[#5E6650] font-medium">
              {confirmacion}
            </p>
          )}

          <p className="text-xs text-[#5E6650]/60 mt-4">
            Al confirmar, se abrirá WhatsApp con tu mensaje
            preparado para enviarlo.
          </p>

        </form>
      </div>
    </section>
  );
}
